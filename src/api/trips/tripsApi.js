import { api } from "../axios";

const today = new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Damascus",
});

export const getTrips = async (filters = {}) => {
  const params = {
    originId: filters.fromCity,
    destinationId: filters.toCity,
    date: filters.date || today,
    ...(filters.companyId && { companyId: filters.companyId }),
  };

  const response = await api.get("/trips", { params });

  return response.data;
};

// جلب المقاعد الخاصة برحلة محددة
export const getTripSeats = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/seats`);

  return response.data;
};
