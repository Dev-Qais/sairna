import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../api/bookings/bookingsApi";

const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};

export default useCreateBooking;
