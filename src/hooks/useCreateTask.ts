import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import { fetchWrapper } from "../services/restApi";
import { toast } from "react-toastify";

type MutationValue = {
  name: string;
};

async function createTask(values: MutationValue): Promise<unknown> {
  let url = "api/taskData/create-task";
  return await fetchWrapper<unknown, MutationValue>({
    method: "POST",
    url,
    body: values,
  });
}

export function useCreateTask(): UseMutationResult<
  unknown,
  unknown,
  MutationValue,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationValue>(
    (values) => createTask(values),
    {
      onSuccess: () => {
        toast.success(`successfully created Task`);
      },
      onError: () => {
        toast.error(`Unable to create task`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );
}
