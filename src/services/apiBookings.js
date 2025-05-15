import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";

export async function getBookings(filters, sortBy, page) {
  const baseQuery = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );
  // .or(
  //   "and(status.eq.unconfirmed, totalPrice.gt.1000),and(status.eq.checked-in, totalPrice.lt.7000)"
  // );
  let query = baseQuery;
  // .eq("cabins(name)", "007");

  //FILTER PARAMS
  // if (filter) {
  //   query = query[filter.method](filter.field, filter.value);
  // }

  // FILTERS
  let isOrLogic = false;
  const orConditions = [];
  let parentOperator;

  function buildFilterQuery(filterItem, arr) {
    const { field, operator, value } = filterItem;
    if (!field || !operator || !value) return;
    if (isOrLogic) {
      if (field === "startDate" || field === "endDate") {
        arr.push(
          `${filterItem.field}.${filterItem.operator}.${new Date(
            filterItem.value
          ).toISOString()}`
        );
      }
      arr.push(
        `${filterItem.field}.${filterItem.operator}.${filterItem.value}`
      );
    } else {
      if (field === "startDate" || field === "endDate") {
        query = query[filterItem.operator](
          filterItem.field,
          new Date(filterItem.value).toISOString()
        );
      }
      query = query[filterItem.operator](filterItem.field, filterItem.value);
    }
  }

  // VERSION 1
  if (filters?.data?.length > 0) {
    if (filters.logic === "or") {
      isOrLogic = true;
    }
    parentOperator = filters.logic;

    filters?.data?.forEach((filter) => {
      // GROUP FILTERS
      if (filter.type === "group") {
        let items = [];
        if (filter.data.length > 0) {
          if (filter.logic === "or") {
            isOrLogic = true;
          }
          filter?.data?.forEach((item) => {
            console.log(item);
            buildFilterQuery(item, items);
          });
        }
        if (isOrLogic) {
          if (parentOperator === "and") {
            query = query.or(items.join(","));
          } else {
            orConditions.push(`${filter.logic}(${items.join(",")})`);
          }
        }
      }

      // RULE FILTERS
      buildFilterQuery(filter, orConditions);
    });
  }
  // If "or" logic is found, combine the conditions using .or()
  if (isOrLogic && orConditions.length > 0) {
    query = query.or(orConditions.join(","));
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
