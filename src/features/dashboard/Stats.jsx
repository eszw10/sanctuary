import {
  HiBriefcase,
  HiCalendarDays,
  HiChartBar,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1. total bookings
  const numBookings = bookings?.length;
  // 2. total price of bookings i.e sales
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);
  // 3. total of checkins
  const checkins = confirmedStays?.length;
  // 4. occupancy rate ( numBookings / (numDays * total cabin used) * 100 )
  const occupancyRate = numBookings / (numDays * cabinsCount);
  return (
    <>
      <Stat
        title={"Bookings"}
        value={numBookings}
        color={"blue"}
        icon={<HiBriefcase />}
      />
      <Stat
        title={"Sales"}
        value={formatCurrency(sales)}
        color={"green"}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title={"Checkins"}
        value={checkins}
        color={"indigo"}
        icon={<HiCalendarDays />}
      />
      <Stat
        title={"Occupancy Rate"}
        value={`${Math.round(occupancyRate * 100)}%`}
        color={"yellow"}
        icon={<HiChartBar />}
      />
    </>
  );
}

export default Stats;
