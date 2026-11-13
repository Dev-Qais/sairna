import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../api/bookings/bookingsApi";

const useMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: getMyBookings,
    staleTime: 30 * 1000,
  });
};

export default useMyBookings;
