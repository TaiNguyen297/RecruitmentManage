import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { sendMail } from "@/mailer/mailService";
import { MemberRegistrationStatus } from "@prisma/client";
import mailMemberInterviewPass from "@/mailer/templates/recruit-members/member-interview-pass";
import mailMemberInterviewFail from "@/mailer/templates/recruit-members/member-interview-fail";
import mailMemberFormPass from "@/mailer/templates/recruit-members/member-form-pass";
import mailMemberFormFail from "@/mailer/templates/recruit-members/member-form-fail";

export interface UpdateMemberRegistrationDto {
  id: number;
  status: MemberRegistrationStatus;
  email: string;
  type: "FORM" | "INTERVIEW";
}

const MAILS = {
  FORM: {
    PASSED: {
      subject: "MỜI PHỎNG VẤN THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberFormPass,
    },
    FAILED: {
      subject: "KẾT QUẢ VÒNG ĐƠN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberFormFail,
    },
  },
  INTERVIEW: {
    PASSED: {
      subject: "KẾT QUẢ TRÚNG TUYỂN THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberInterviewPass,
    },
    FAILED: {
      subject: "KẾT QUẢ VÒNG PHỎNG VẤN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberInterviewFail,
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PATCH":
        const data: UpdateMemberRegistrationDto = req.body;

        if (!data) {
          return res.status(400).json({ message: "Content not found" });
        }

        const member = await prisma.memberRegistration.update({
          where: {
            id: data.id,
          },
          data: {
            status: data.status,
          },
        });

        const status =
          data.status === "PASSED" || data.status === "INTERVIEW"
            ? "PASSED"
            : "FAILED";

        await sendMail(
          [data.email],
          MAILS[data.type][status].subject,
          MAILS[data.type][status].template(member)
        );

        return res.status(201).json(member);
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
