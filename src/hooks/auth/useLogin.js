import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth/login";

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["loginUser"],
  });
};

export default useLogin;
