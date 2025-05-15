import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useReducer } from "react";
import {
  bookingsFilterReducer,
  initialState,
} from "../features/bookings/filter/bookingsFilter/BookingsFilterReducer";
const BookingsFilterContext = createContext();

// PAYLOAD

// {
// logic: "and",
// data : [
//   {
//   id: "blablaba",
//   field: "cabin-name",
//   operator: "eq",
//   logic: "and",
//   type: "rule",
// },
// {
//   id: "blablabla",
//   logic: "and",
//   type: "group",
//   data: [{
//     field: "cabin-name",
//     operator: "eq",
//     logic: "and",
//     type: "rule",}
//   ]
// }]}

function BookingsFilterProvider({ children }) {
  const [filters, dispatch] = useReducer(bookingsFilterReducer, initialState);
  const value = useMemo(() => ({ filters, dispatch }), [filters, dispatch]);
  return (
    <BookingsFilterContext.Provider value={value}>
      {children}
    </BookingsFilterContext.Provider>
  );
}

function useBookingsFilter() {
  const context = useContext(BookingsFilterContext);
  if (context === undefined)
    throw new Error(
      "BookingsFilterContext was used outside of BookingsFilterProvider"
    );
  return context;
}

export { BookingsFilterProvider, useBookingsFilter };

BookingsFilterProvider.propTypes = {
  children: PropTypes.node,
};
