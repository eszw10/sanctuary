import { useState } from "react";
import { useBookingsFilter } from "../../../../context/BookingsFilterContext";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { FaPlus, FaRegSquarePlus } from "react-icons/fa6";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;
`;

const SelectorContainer = styled.div`
  width: 140%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: var(--color-grey-200);
  position: absolute;
  top: 60px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-400);
  z-index: 20;
`;

const Item = styled.p`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 4px;
  border-radius: var(--border-radius-sm);
  &:hover {
    background-color: var(--color-grey-300);
  }
  cursor: pointer;
`;

export default function FilterTypeSelector({ id = null, isGroup = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useBookingsFilter();
  function handleClick(type) {
    if (isGroup) {
      dispatch({ type: "add/group", payload: { id, type } });
    } else {
      dispatch({ type: "add", payload: type });
    }
    setIsOpen(false);
  }
  return (
    <Container>
      <Button
        variation="secondary"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        Add filter rule
      </Button>
      {isOpen && (
        <SelectorContainer className="">
          <Item onClick={() => handleClick("rule")}>
            <FaPlus /> <span>Add filter rule</span>
          </Item>
          {!isGroup && (
            <Item onClick={() => handleClick("group")}>
              <FaRegSquarePlus />
              <span>Add filter group</span>
            </Item>
          )}
        </SelectorContainer>
      )}
    </Container>
  );
}

FilterTypeSelector.propTypes = {
  id: PropTypes.string,
  isGroup: PropTypes.bool,
};
