import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/Register/RegisterPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ProfilePage from "../pages/Profile/ProfilePage";
import GuestRoute from "../components/auth/GuestRoute";
function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoute;
