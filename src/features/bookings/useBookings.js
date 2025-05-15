import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useBookingsFilter } from "../../context/BookingsFilterContext";

export function useBookings() {
  const { filters } = useBookingsFilter();
  // const filters = [];
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // const filterValue = searchParams.get("status");
  // FILTER PARAMS
  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : { field: "status", value: filterValue, method: "eq" };
  // FILTERS
  // const filter = filters.map((filter) =>
  //   !filter.value || filter.value === "" ? null : filter
  // );
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // FETCHING
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings(filters, sortBy, page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  // PRE-FETCHING
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page + 1],
      queryFn: () => getBookings(filters, sortBy, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page - 1],
      queryFn: () => getBookings(filters, sortBy, page - 1),
    });
  }

  return { bookings, count, isLoading, error };
}
