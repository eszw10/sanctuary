import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  const discountFilterOpt = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No Discount" },
    { value: "with-discount", label: "With Discount" },
  ];
  const sortByOpt = [
    { value: "name-asc", label: "Sort by Name (A-Z)" },
    { value: "name-desc", label: "Sort by Name (Z-A)" },
    { value: "maxCapacity-asc", label: "Sort by Max Capacity (low first)" },
    { value: "maxCapacity-desc", label: "Sort by Max Capacity (high first)" },
    { value: "regularPrice-asc", label: "Sort by Price (low first)" },
    { value: "regularPrice-desc", label: "Sort by Price (high first)" },
  ];
  return (
    <TableOperations>
      <Filter filterField="discount" options={discountFilterOpt} />
      <SortBy options={sortByOpt} />
    </TableOperations>
  );
}

export default CabinTableOperations;
