import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import prisma from "@/libs/prisma";
import {
  InterviewTable,
  SubmissionTable,
} from "@/components/features/recruitment-management";
import { ContainerXL } from "@/components/layouts/ContainerXL";
import ToastSuccess from "@/components/shared/toasts/ToastSuccess";
import { SEO } from "@/configs/seo.config";
import { Box, Button, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getMemberRegistration } from "@/components/features/recruitment-management/services";
import { MemberRegistration } from "@/components/features/member-registration";
import type { MemberRegistrationWithPosition } from "@/@types/membershipRegistration";

interface Props {
  registrations: MemberRegistrationWithPosition[];
}

const RecruitmentManagementPage: NextPage<Props> = ({ registrations }) => {
  const [open, setOpen] = useState(false);
  const interviews = registrations.filter(registration => registration.status === 'INTERVIEW' || registration.status === 'PASSED');
  
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push("/login");
  //   },
  // });
  const router = useRouter();

  const { watch, setValue } = useForm<{ tabIndex: number }>({
    defaultValues: {
      tabIndex: 0,
    },
  });

  // // This useQuery could just as well happen in some deeper child to
  // // the "Posts"-page, data will be available immediately either way
  // const { data } = useQuery({
  //   queryKey: ["memberRegistration"],
  //   queryFn: () => getMemberRegistration({}),
  // });

  // // This query was not prefetched on the server and will not start
  // // fetching until on the client, both patterns are fine to mix
  // const { data: otherData } = useQuery({
  //   queryKey: ["posts-2"],
  //   queryFn: () => getMemberRegistration({}),
  // });

  // console.log({
  //   data,
  //   otherData,
  // });

  const tabElement = [
    {
      element: <SubmissionTable data ={registrations}/>,
    },
    {
      element: <InterviewTable data ={interviews}/>,
    },
  ];

  // if (!session) {
  //   return (
  //     <div>
  //       {/* TODO: Them icon loading */}
  //       Đang tải...
  //     </div>
  //   );
  // }

  return (
    <ContainerXL>
      <div className="flex flex-col mt-9 gap-4">
        <DefaultSeo {...SEO} title="Quản lý đơn tuyển" />
        <ToastSuccess
          open={open}
          onClose={() => setOpen(false)}
          heading="Xác nhận thành công"
          content="Cảm ơn đã gửi thông tin"
        />
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              textWrap: "nowrap",
            }}
            color="secondary"
            disabled={watch("tabIndex") === 0}
            onClick={() => setValue("tabIndex", 0)}
          >
            Vòng nộp đơn
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              textWrap: "nowrap",
            }}
            disabled={watch("tabIndex") === 1}
            color="secondary"
            onClick={() => setValue("tabIndex", 1)}
          >
            Vòng phỏng vấn
          </Button>
        </div>

        <Typography fontSize={28} fontWeight={"bold"}>
          {watch("tabIndex") === 0
            ? "Danh sách đơn tuyển"
            : "Danh sách phỏng vấn"}
        </Typography>

        {tabElement.map((e, index) => {
          return (
            <div hidden={watch("tabIndex") !== index} key={index}>
              {watch("tabIndex") === index && <Box>{e.element}</Box>}
            </div>
          );
        })}
      </div>
    </ContainerXL>
  );
};

export const getServerSideProps = async () => {
  const registrations = await prisma.memberRegistration.findMany({
    include: {
      position: {
        select: {
          name: true,
        },
      }
      
    }
  });
  return {
    props: {
      registrations: JSON.parse(JSON.stringify(registrations))
    },
  };

  
};
export default RecruitmentManagementPage;
