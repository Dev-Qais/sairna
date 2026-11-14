import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMyBooking } from "../../api/bookings/bookingsApi";

export default function useCancelBooking() {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: cancelMyBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings"],
      });
    },
  });

  return {
    cancelBooking: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
  };
}
