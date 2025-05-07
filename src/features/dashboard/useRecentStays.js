import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import toast from "react-hot-toast";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const dateQuery = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(dateQuery),
    onError: (err) => toast.error(err.message),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || "checked-out"
  );

  return { stays, confirmedStays, isLoading, numDays };
}
