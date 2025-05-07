import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has successfully checked in!`);
      queryClient.invalidateQueries({ active: true }); // invalidate all active queries
      navigate("/");
    },
    onError: () => toast.error("There is a problem while checking in!"),
  });

  return { checkin, isCheckingIn };
}
