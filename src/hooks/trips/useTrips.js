import { getTrips } from "../../api/trips/tripsApi";
import { useQuery } from "@tanstack/react-query";

const useTrips = (filters) => {
  return useQuery({
    queryKey: ["trips", filters],
    queryFn: () => getTrips(filters),
  });
};

export default useTrips;
