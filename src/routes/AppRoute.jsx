import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/Register/RegisterPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ResultsPage from "../pages/results/ResultsPage";
import BookingSuccess from "../pages/results/components/booking/BookingSuccess";
import TripsPage from "../pages/trips/TripsPage";
import TrackingPage from "../pages/tracking/TrackingPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import GuestRoute from "../components/auth/GuestRoute";
import CompaniesPage from "../pages/companies/CompaniesPage";
import AboutPage from "../pages/about/AboutPage";
import SupportPage from "../pages/support/SupportPage";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="results" element={<ResultsPage />} />

        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="tracking" element={<TrackingPage />} />
        </Route>

        <Route path="booking-success" element={<BookingSuccess />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="help" element={<SupportPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
