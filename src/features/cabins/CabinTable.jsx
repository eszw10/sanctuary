import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins?.filter((item) => item.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins?.filter((item) => item.discount > 0);
      break;
    default:
      throw new Error("There is no such params!");
  }
  const sortByValue = searchParams.get("sortBy") || "name-asc";
  const [sortField, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.toSorted(
    (a, b) => (a[sortField] - b[sortField]) * modifier
  );
  if (!cabins?.length > 0) return <Empty resourceName="cabins" />;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
