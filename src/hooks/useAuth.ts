import { useMutation, UseMutationResult } from "react-query";
import { fetchWrapper } from "../services/restApi";
import { toast } from "react-toastify";

type MutationValue = {
  email: string;
  password: string;
};

async function authUser(
  values: MutationValue,
  isRegister?: boolean
): Promise<unknown> {
  let url = "";
  if (isRegister) {
    url = "api/userAuth/register";
  } else {
    url = "api/userAuth/login";
  }

  return await fetchWrapper<unknown, MutationValue>({
    method: "POST",
    url,
    body: values,
  });
}

export function useAuth(
  isRegister = true
): UseMutationResult<unknown, unknown, MutationValue, unknown> {
  return useMutation<unknown, unknown, MutationValue>(
    (values) => authUser(values, isRegister),
    {
      onSuccess: () => {
        toast.success(
          `successfully ${isRegister ? "created account" : "able to login"}`
        );
      },
      onError: () => {
        toast.error(`Unable to ${isRegister ? "create account" : "login"}`);
      },
    }
  );
}
