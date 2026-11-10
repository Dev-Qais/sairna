import { useAuthStore } from "../../store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isAuthLoading } = useAuthStore();
  if (isAuthLoading) {
    return <div className="text-3xl">Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
