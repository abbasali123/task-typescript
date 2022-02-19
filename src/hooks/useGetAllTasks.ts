import { useQuery, UseQueryResult } from "react-query";
import { toast } from "react-toastify";
import { fetchWrapper } from "../services/restApi";

export function getTasks<TTask>(): Promise<TTask> {
  return fetchWrapper<TTask, undefined>({
    url: `api/taskData/list-tasks`,
  });
}

export function useGetAllTasks<TTask>(): UseQueryResult<TTask | undefined> {
  return useQuery<TTask, Error>("tasks", getTasks, {
    onError: () => {
      toast.error("Error getting Tasks");
    },
  });
}
