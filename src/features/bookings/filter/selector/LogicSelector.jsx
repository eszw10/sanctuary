import PropTypes from "prop-types";
import Select from "../../../../ui/Select";
import { useBookingsFilter } from "../../../../context/BookingsFilterContext";

const logics = [
  { label: "And", value: "and" },
  { label: "Or", value: "or" },
];

export default function LogicSelector({ id, value = "and", isGroup = false }) {
  const { dispatch } = useBookingsFilter();
  function handleFilterChange(e) {
    dispatch({
      type: isGroup ? "change/logic/group" : "change/logic",
      payload: { id, value: e.target.value },
    });
  }
  return (
    <Select
      options={logics}
      type="white"
      handleChange={handleFilterChange}
      value={value}
    />
  );
}

LogicSelector.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  isGroup: PropTypes.bool,
};
