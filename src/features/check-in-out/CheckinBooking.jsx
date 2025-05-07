import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking = {}, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const {
    id: bookingId,
    guests,
    isPaid,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const [paidConfirm, setPaidConfirm] = useState(isPaid || false);
  const [hasOptBreakfast, setHasOptBreakfast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  const totalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;

  useEffect(() => {
    setPaidConfirm(isPaid ?? false);
  }, [isPaid]);

  function handleCheckin() {
    if (!paidConfirm) return;
    if (hasOptBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          totalPrice: totalPrice + totalBreakfastPrice,
          extrasPrice: totalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={hasOptBreakfast}
            onChange={() => {
              setHasOptBreakfast((optBreakfast) => !optBreakfast);
              setPaidConfirm(false);
            }}
          >
            Want to add breakfast for {formatCurrency(totalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={paidConfirm}
          onChange={() => setPaidConfirm((confirm) => !confirm)}
          disabled={paidConfirm || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {hasOptBreakfast
            ? `${formatCurrency(
                totalPrice + totalBreakfastPrice
              )} (${formatCurrency(totalPrice)}+${formatCurrency(
                totalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!paidConfirm || isCheckingIn}>
          {isCheckingIn ? "Checking in..." : `Check in booking #${bookingId}`}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
