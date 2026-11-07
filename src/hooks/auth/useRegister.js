import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["registerUser"],
  });
};
