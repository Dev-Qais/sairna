import { getCities } from "../../api/cities/citiesApi";
import { useQuery } from "@tanstack/react-query";

const useCities = () => {
  return useQuery({
    queryFn: getCities,
    queryKey: ["cities"],
  });
};

export default useCities;
