import { FaPlus } from "react-icons/fa6";
import styled from "styled-components";
import BookingsFilterContainer from "./bookingsFilter/BookingsFilterContainer";
import { useState } from "react";
import { useBookingsFilter } from "../../../context/BookingsFilterContext";
import { IoFilter } from "react-icons/io5";

const StyledContainer = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border: none;
  background-color: transparent;
  margin-top: auto;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  border: 2px solid var(--color-brand-600);

  &:hover {
    background-color: var(--color-grey-0);
  }
`;

export default function FilterButton() {
  const [isOpened, setIsOpened] = useState(false);
  const { filters, dispatch } = useBookingsFilter();
  console.log(filters);
  return (
    <StyledContainer>
      <StyledButton onClick={() => setIsOpened((value) => !value)}>
        {filters?.data?.length > 0 ? (
          <>
            <IoFilter color="var(--color-brand-600)" />
            <span>{filters?.data?.length} rules</span>
          </>
        ) : (
          <>
            <FaPlus /> <span>Filter</span>
          </>
        )}
      </StyledButton>
      {isOpened && <BookingsFilterContainer setIsOpened={setIsOpened} />}
    </StyledContainer>
  );
}
