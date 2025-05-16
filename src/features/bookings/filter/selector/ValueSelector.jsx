import PropTypes from "prop-types";
import Input from "../../../../ui/Input";
import { useBookingsFilter } from "../../../../context/BookingsFilterContext";
import Select from "../../../../ui/Select";
import { useSearchParams } from "react-router-dom";

const statusOptions = [
  { label: "Status Type", value: "" },
  { label: "Unconfirmed", value: "unconfirmed" },
  { label: "Checked In", value: "checked-in" },
  { label: "Checked Out", value: "checked-out" },
  { label: "Confirmed", value: "confirmed" },
];

export default function ValueSelector({
  id,
  field = "cabins.name",
  value,
  isGroup = false,
}) {
  const { dispatch } = useBookingsFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  function handleFilterChange(e) {
    let formattedValue;
    if (field === "totalPrice") {
      formattedValue = Number(e.target.value);
    } else {
      formattedValue = e.target.value;
    }
    if (isGroup) {
      dispatch({
        type: "change/group",
        payload: {
          id: id.dataId,
          filterId: id.filterId,
          field: "value",
          value: formattedValue,
        },
      });
    } else {
      dispatch({
        type: "change",
        payload: {
          id,
          field: "value",
          value: formattedValue,
        },
      });
    }
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  if (field === "status")
    return (
      <Select
        options={statusOptions}
        handleChange={handleFilterChange}
        value={value}
      />
    );
  if (field === "startDate" || field === "endDate")
    return <Input type="date" onChange={handleFilterChange} value={value} />;
  if (field === "totalPrice")
    return <Input type="number" onChange={handleFilterChange} value={value} />;
  return (
    <Input
      type="text"
      onChange={handleFilterChange}
      placeholder="value.."
      value={value}
    />
  );
}

ValueSelector.propTypes = {
  id: PropTypes.object || PropTypes.string,
  field: PropTypes.string,
  value: PropTypes.any,
  isGroup: PropTypes.bool,
};
