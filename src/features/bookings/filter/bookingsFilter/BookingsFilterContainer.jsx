import PropTypes from "prop-types";
import styled from "styled-components";
import { useBookingsFilter } from "../../../../context/BookingsFilterContext";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import FilterGroup from "../FilterGroup";

const StyledContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-grey-200);
  position: absolute;
  top: 30px;
  right: 0px;
  z-index: 10;
  border-radius: var(--border-radius-lg);
`;

export default function BookingsFilterContainer({ setIsOpened }) {
  const { filters } = useBookingsFilter();
  const ref = useOutsideClick((e) => {
    setIsOpened(false);
    e.stopPropagation();
  });

  return (
    <StyledContainer ref={ref}>
      {!filters?.data?.length > 0 && <span>No filter detected.</span>}
      <FilterGroup filters={filters} />
    </StyledContainer>
  );
}

BookingsFilterContainer.propTypes = {
  setIsOpened: PropTypes.func,
};
