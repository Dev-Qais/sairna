import { api } from "../axios";
import { useAuthStore } from "../../store/authStore";

export const createBooking = async (bookingData) => {
  const { accessToken, tokenType } = useAuthStore.getState();

  if (!accessToken) {
    throw new Error("يجب تسجيل الدخول أولاً لإتمام الحجز.");
  }

  const response = await api.post("/bookings", bookingData, {
    headers: {
      Authorization: `${tokenType || "Bearer"} ${accessToken}`,
    },
  });

  return response.data;
};

export const getMyBookings = async () => {
  const { accessToken, tokenType } = useAuthStore.getState();

  if (!accessToken) {
    throw new Error("يجب تسجيل الدخول أولاً.");
  }

  const response = await api.get("/bookings/me", {
    headers: {
      Authorization: `${tokenType || "Bearer"} ${accessToken}`,
    },
  });

  return response.data;
};
