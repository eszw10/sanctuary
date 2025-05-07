import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (user) => {
      const name = user.user?.user_metadata?.fullName;
      queryClient.setQueryData(["user"], user.user);
      if (name) toast.success(`Welcome back, ${name}!`);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password is incorrect!");
    },
  });

  return { login, isLoading };
}
