import { useEffect } from "react";
import useCurrentUser from "../../hooks/auth/useCurrentUser";
import { useAuthStore } from "../../store/authStore";

function AuthInitializer({ children }) {
  const { data, isSuccess, isError, error } = useCurrentUser();

  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      logout();
      return;
    }

    if (isSuccess) {
      setUser(data);
      setAuthLoading(false);
    }

    if (isError) {
      if (error?.response?.status === 401) {
        logout();
      } else {
        setAuthLoading(false);
      }
    }
  }, [
    accessToken,
    isSuccess,
    isError,
    data,
    error,
    setUser,
    logout,
    setAuthLoading,
  ]);

  return children;
}

export default AuthInitializer;
