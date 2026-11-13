import { getCurrentUser } from "../../api/auth/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";

const useCurrentUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(accessToken),
    enabled: !!accessToken,
  });
};

export default useCurrentUser;
