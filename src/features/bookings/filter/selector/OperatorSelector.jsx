import PropTypes from "prop-types";
import { useBookingsFilter } from "../../../../context/BookingsFilterContext";
import Select from "../../../../ui/Select";

const stringOperators = [
  { label: "Choose Operation", value: "" },
  { label: "Equal", value: "eq" },
  { label: "Not Equal", value: "neq" },
  { label: "Contains", value: "ilike" },
];

const numberOperators = [
  { label: "Choose Operation", value: "" },
  { label: "Equal", value: "eq" },
  { label: "Not Equal", value: "neq" },
  { label: "Greater Than", value: "gt" },
  { label: "Less Than", value: "lt" },
  { label: "Greater Than or Equal", value: "gte" },
  { label: "Less Than or Equal", value: "lte" },
];

const dateOperators = [...numberOperators, { label: "Range", value: "range" }];

export default function OperatorSelector({
  id,
  field = "cabin-name",
  value = "eq",
  isGroup = false,
}) {
  const { dispatch } = useBookingsFilter();
  function handleFilterChange(e) {
    if (isGroup) {
      dispatch({
        type: "change/group",
        payload: {
          id: id.dataId,
          filterId: id.filterId,
          field: "operator",
          value: e.target.value,
        },
      });
    } else {
      dispatch({
        type: isGroup ? "change/group" : "change",
        payload: {
          id,
          field: "operator",
          value: e.target.value,
        },
      });
    }
  }
  let operators;
  if (
    field === "cabin-name" ||
    field === "guest-name" ||
    field === "observations"
  ) {
    operators = stringOperators;
  }
  if (field === "totalPrice") {
    operators = numberOperators;
  }
  if (field === "startDate" || field === "endDate") {
    operators = dateOperators;
  }
  if (!operators) return null;
  return (
    <Select
      options={operators}
      type="white"
      handleChange={handleFilterChange}
      value={value}
    />
  );
}

OperatorSelector.propTypes = {
  id: PropTypes.string || PropTypes.object,
  field: PropTypes.string,
  value: PropTypes.string,
  isGroup: PropTypes.bool,
};
