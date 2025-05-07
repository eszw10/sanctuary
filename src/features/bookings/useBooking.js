import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // need to add the bookingId to the queryKey so that refetch happen everytime the bookingId changes
    queryFn: () => getBooking(bookingId),
    retry: false, // look the comment below for more info about this property
  });

  /*
  retry will let react-query to try refetch the data three times if there is an error, 
  but in this case we don't want that because sometimes the data of the booking detail page is not available
  */

  return { booking, isLoading, error };
}
