import PropTypes from "prop-types";
import Select from "../../../../ui/Select";
import { useBookingsFilter } from "../../../../context/BookingsFilterContext";

const fields = [
  { label: "Choose Field", value: "" },
  { label: "Cabin Name", value: "cabin-name" },
  { label: "Guest Name", value: "guest-name" },
  { label: "Start Date", value: "startDate" },
  { label: "End Date", value: "endDate" },
  { label: "Status", value: "status" },
  { label: "Price", value: "totalPrice" },
  { label: "Observations", value: "observations" },
];

export default function FieldSelector({ id, value, isGroup = false }) {
  const { dispatch } = useBookingsFilter();
  function handleFilterChange(e) {
    if (isGroup) {
      dispatch({
        type: "change/group",
        payload: {
          id: id.dataId,
          filterId: id.filterId,
          field: "field",
          value: e.target.value,
        },
      });
    } else {
      dispatch({
        type: "change",
        payload: {
          id,
          field: "field",
          value: e.target.value,
        },
      });
    }
  }
  return (
    <Select
      options={fields}
      type="white"
      handleChange={handleFilterChange}
      value={value}
    />
  );
}

FieldSelector.propTypes = {
  id: PropTypes.string || PropTypes.object,
  value: PropTypes.string,
  isGroup: PropTypes.bool,
};
