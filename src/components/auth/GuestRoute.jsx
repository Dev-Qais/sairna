import { useAuthStore } from "../../store/authStore";
import { Navigate, Outlet } from "react-router-dom";
function GuestRoute() {
  const { isAuthenticated, isAuthLoading } = useAuthStore();
  if (isAuthLoading) {
    return <div className="text-3xl">Loading...</div>;
  }
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
}

export default GuestRoute;
