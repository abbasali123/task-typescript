import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import { fetchWrapper } from "../services/restApi";
import { toast } from "react-toastify";

type MutationValue = {
  ids: string[];
};

async function deleteTask(values: MutationValue): Promise<unknown> {
  let url = "api/taskData/bulk-delete";
  return await fetchWrapper<unknown, MutationValue>({
    method: "DELETE",
    url,
    body: values,
  });
}

export function useDeleteTask(): UseMutationResult<
  unknown,
  unknown,
  MutationValue,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationValue>(
    (values) => deleteTask(values),
    {
      onSuccess: () => {
        toast.success(`successfully deleted Tasks`);
      },
      onError: () => {
        toast.error(`Unable to delete tasks`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );
}
