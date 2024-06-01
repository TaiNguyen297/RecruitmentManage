import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { sendMail } from "@mailer/mailService";
import mailData from "@mailer/templates/recruit-members/member-registration-complete";
import { MemberRegistrationStatus } from "@prisma/client";

interface getMemberRegistrationDto {
  status: MemberRegistrationStatus;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Content not found" });
    }

    switch (req.method) {
      case "POST":
        const data = req.body;
        const hasSocialActivities = data.has_social_activities === "1";

        const member = await prisma.memberRegistration.create({
          data: {
            fullName: data.full_name,
            birthday: new Date(data.birthday),
            phoneNumber: data.phone_number,
            email: data.email,
            address: data.address,
            workPlace: data.work_place,
            hasSocialActivities: hasSocialActivities,
            memories: data.memories,
            positionId: parseInt(data.position),
            hopeToReceive: data.hope_to_receive,
          },
          include: {
            position: {
              select: {
                name: true,
              },
            },
          },
        });

        await new Promise(async (resolve, reject) => {
          try {
            const result = await sendMail(
              [data.email],
              "CẢM ƠN BẠN ĐÃ ĐĂNG KÝ THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
              mailData(member)
            );
            resolve(result);
            res.status(200).json({ message: "Mail sent!" });
          } catch (err: any) {
            reject(err);
            return res.status(500).json({
              error: err.message || "Something went wrong",
            });
          }
        });

      case "GET":
        const params = req.query as unknown as getMemberRegistrationDto;

        const registrations = await prisma.memberRegistration.findMany({
          where: {
            status: params.status,
          },
          include: {
            position: {
              select: {
                name: true,
              },
            },
          },
        });

        return res.status(200).json(registrations);

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
