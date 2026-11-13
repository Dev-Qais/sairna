import { useQuery } from "@tanstack/react-query";
import { getTripSeats } from "../../api/trips/tripsApi";

const useTripSeats = (tripId) => {
  return useQuery({
    queryKey: ["tripSeats", tripId],
    queryFn: () => getTripSeats(tripId),
    enabled: Boolean(tripId),
    staleTime: 30 * 1000,
  });
};

export default useTripSeats;
