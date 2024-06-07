import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMemberList } from "../MemberListTable";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (member: IMemberList) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newMemberInfo: IMemberList) => {
      queryClient.setQueryData(["members"], (prevUsers: any) =>
        prevUsers?.map((prevUser: IMemberList) =>
          prevUser.full_name === newMemberInfo.full_name
            ? newMemberInfo
            : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['members'] }), //refetch users after mutation, disabled for demo
  });
};
