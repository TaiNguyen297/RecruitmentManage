import { useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";
import { IconButton, Tooltip } from "@mui/material";
import { IMember } from "@/@types/member";
import { ModalConfirm } from "@/components/shared/modals";
import { ACTIONS } from "@/utils/constants";
import { useDisclosure } from "@/libs/hooks/useDisclosure";
import { ActionType } from "@/@types/common";
import { useRecruitment } from "../hooks/useRecuitment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ClearIcon from "@mui/icons-material/Clear";
import ToastSuccess from "@/components/shared/toasts/ToastSuccess";
import { InterviewDetail } from "./InterviewDetail";
import { EllipsisCell } from "@/components/shared/table";
import { MemberRegistrationWithPosition } from "@/@types/membershipRegistration";
import { MemberRegistrationStatus } from "@prisma/client";

export interface PersonInterview extends IMember {
  date_time: string;
  test_id: number;
  link_gg_met: string;
}

export type ActionTypeAdd = ActionType | "accept_interview";

const TEXT_TOAST = {
  [ACTIONS["ACCEPT"]]: "Xác nhận thành viên chính thức thành công!",
  [ACTIONS["REJECT"]]: "Xác nhận loại đơn tuyển thành công",
};

const TEXT_CONFIRM = {
  [ACTIONS["ACCEPT"]]: "Xác nhận chuyển đơn tuyển sang THÀNH VIÊN CHÍNH THỨC",
  [ACTIONS["REJECT"]]: "Xác nhận LOẠI đơn tuyển",
};

// const data: PersonInterview[] = [
//   {
//     full_name: "123",
//     email: "Kentucky_dai_dai_dai_ktcb@gmail.com",
//     birthday: "27/02/2001",
//     phone_number: "0334455667",
//     address: "144 Xuan Thuy",
//     work_place: "144 Xuan Thuy",
//     has_social_activities: "Đã từng",
//     memories: "Làm việc nhóm tốt",
//     position: "Thành viên",
//     hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
//     date_time: "2022-10-10 10:10:10",
//     test_id: 1,
//     link_gg_met: "https://meet.google.com/lookup/abc",
//   },
//   {
//     full_name: "123",
//     email: "Ohio@gmail.com",
//     birthday: "27/02/2001",
//     phone_number: "0334455667",
//     address: "144 Xuan Thuy",
//     work_place: "144 Xuan Thuy",
//     has_social_activities: "Chưa từng",
//     memories: "Làm việc nhóm tốt",
//     position: "Thành viên",
//     hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
//     date_time: "2022-10-10 10:10:10",
//     test_id: 1,
//     link_gg_met: "https://meet.google.com/lookup/abc",
//   },
//   {
//     full_name: "123",
//     email: "West Virginia@gmail.com",
//     birthday: "27/02/2001",
//     phone_number: "0334455667",
//     address: "144 Xuan Thuy",
//     work_place: "144 Xuan Thuy",
//     has_social_activities: "Đã từng",
//     memories:
//       "Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốtLàm việc nhóm tốtLàm việc nhóm tốt Làm việc nhóm tốt Làm việc nhóm tốt ",
//     position: "Thành viên",
//     hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
//     date_time: "2022-10-10 10:10:10",
//     test_id: 1,
//     link_gg_met: "https://meet.google.com/lookup/abc",
//   },
//   {
//     full_name: "123",
//     email: "Nebraska@gmail.com",
//     birthday: "27/02/2001",
//     phone_number: "0334455667",
//     address: "144 Xuan Thuy",
//     work_place: "144 Xuan Thuy",
//     has_social_activities: "Chưa từng",
//     memories: "Làm việc nhóm tốt",
//     position: "Thành viên",
//     hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
//     date_time: "2022-10-10 10:10:10",
//     test_id: 1,
//     link_gg_met: "https://meet.google.com/lookup/abc",
//   },
 
// ];

const InterviewTable = (props: {data: MemberRegistrationWithPosition[] }) => {
  const {data} = props;
  const recruitment = useRecruitment();

  const columns = useMemo<MRT_ColumnDef<MemberRegistrationWithPosition>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Họ và tên",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
      {
        accessorFn: (rowData: any) =>
          new Date(rowData.birthday).toLocaleDateString("vi"),
        id: "birthday",
        header: "Ngày sinh",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
      {
        accessorKey: "link_gg_met",
        header: "Link Google Meet",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
      {
        accessorKey: "date_time",
        header: "Ngày giờ phỏng vấn",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
      {
        accessorKey: "test_id",
        header: "Bài test",
        size: 200,
        Cell: (props) => <EllipsisCell {...props} />,
      },
    ],
    []
  );

  const [opened, { open, close }] = useDisclosure();
  const [openToast, setOpenToast] = useState(false);
  const [openedDetail, { open: openDetail, close: closeDetail }] =
    useDisclosure();

  const [rowSelected, setRowSelected] = useState<MemberRegistrationWithPosition>();
  const [action, setAction] = useState<ActionTypeAdd>();

  const handleOpenModal = (
    person: MemberRegistrationWithPosition, 
    action?: ActionTypeAdd
  ) => {
    action ? open() : openDetail();

    setRowSelected(person);
    setAction(action);
  };

  const handleConfirm = () => {
    if (action) {
      recruitment.mutateAsync({
        id: rowSelected!.id,
        status: renderStatusByAction(action),
        email: rowSelected!.email,
        type: action === "accept" ? "FORM" : "INTERVIEW",
      });
    }

    setOpenToast(true);
    closeDetail();
    close();
  };

  const table = useTable({
    columns,
    data,
    enableRowActions: true,
    renderTopToolbar: () => <div />,
    renderBottomToolbar: () => <div />,
    renderRowActions: ({ row }) => (
      <div className="flex items-center justify-center min-w-">
        <Tooltip title="Xem hồ sơ của đơn tuyển">
          <IconButton onClick={() => handleOpenModal(row.original)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chuyển đơn tuyển sang thành viên chính thức">
          <IconButton
            onClick={() =>
              handleOpenModal(row.original, ACTIONS["ACCEPT"] as ActionType)
            }
          >
            <PeopleAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Loại đơn tuyển">
          <IconButton
            onClick={() =>
              handleOpenModal(row.original, ACTIONS["REJECT"] as ActionType)
            }
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
    positionActionsColumn: "last",
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <ToastSuccess
        open={openToast}
        onClose={() => setOpenToast(false)}
        heading="Xác nhận thành công"
        content={`${TEXT_TOAST[action as ActionType]}`}
      />
      <ModalConfirm
        title={`Thông báo xác nhận`}
        open={opened}
        onClose={close}
        content={`${TEXT_CONFIRM[action as ActionType]}`}
        onConfirm={handleConfirm}
      />

      {rowSelected && (
        <InterviewDetail
          open={openedDetail}
          onClose={closeDetail}
          data={rowSelected!}
          handleOpenModal={handleOpenModal}
        />
      )}
    </>
  );
};

export { InterviewTable };

export const renderStatusByAction = (action: ActionTypeAdd) => {
  switch (action) {
    case "accept":
      return MemberRegistrationStatus.PASSED;
    case "reject":
      return MemberRegistrationStatus.FAILED;
    case "accept_interview":
      return MemberRegistrationStatus.INTERVIEW;
    default:
      return MemberRegistrationStatus.REVIEWING;
  }
};