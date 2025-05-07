import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const sortBy = searchParams.get("sortBy") || options.at(0).value;
  return (
    <Select
      options={options}
      type="white"
      handleChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
