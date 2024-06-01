import { MemberRegistrationStatus } from "@prisma/client";

interface Props {
  status?: MemberRegistrationStatus;
}

export const getMemberRegistration = async ({ status }: Props) => {
  const registrations = await fetch(
    `/api/member_registration${status ? `?status=${status}` : ""}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
  );

  return registrations.json();
};
