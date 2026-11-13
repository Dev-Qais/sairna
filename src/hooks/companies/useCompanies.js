import { useQuery } from "@tanstack/react-query";
import getCompanies from "../../api/companies/companiesApi";

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};
