import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import toast from "react-hot-toast";

export function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const dateQuery = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(dateQuery),
    onError: (err) => toast.error(err.message),
  });

  return { bookings, isLoading };
}
