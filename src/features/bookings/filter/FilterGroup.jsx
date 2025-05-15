import PropTypes from "prop-types";
import FieldSelector from "./selector/FieldSelector";
import OperatorSelector from "./selector/OperatorSelector";
import ValueSelector from "./selector/ValueSelector";
import LogicSelector from "./selector/LogicSelector";
import styled, { css } from "styled-components";
import { useBookingsFilter } from "../../../context/BookingsFilterContext";
import { FaTimes } from "react-icons/fa";
import FilterTypeSelector from "./selector/FilterTypeSelector";
import Button from "../../../ui/Button";
import { BiTrash } from "react-icons/bi";

const StyledContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${(props) =>
    props.isgroup === "true"
      ? css`
          background-color: var(--color-grey-300);
        `
      : css`
          background-color: var(--color-grey-200);
        `}
  border-radius: var(--border-radius-lg);
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  /* display: grid;
  grid-template-columns: 80px auto; */
  gap: 8px;
`;

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NestedFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default function FilterGroup({ filters, id, isGroup = false }) {
  const { dispatch } = useBookingsFilter();
  function handleDelete(isGroup, filterId) {
    if (isGroup) {
      dispatch({ type: "delete", payload: filterId });
    } else {
      dispatch({ type: "reset" });
    }
  }

  return (
    <StyledContainer isgroup={isGroup.toString()}>
      {filters?.data?.map((filter, index) => {
        if (filter.type === "group")
          return (
            <NestedFilterContainer key={filter.id}>
              {index === 1 && (
                <LogicSelector
                  id={filters.id}
                  value={filters?.logic}
                  isGroup={false}
                />
              )}
              {index > 1 && <span>{filters?.logic}</span>}
              <FilterGroup
                key={filter.id}
                filters={filter}
                id={filter.id}
                isGroup={filter.type === "group"}
              />
            </NestedFilterContainer>
          );
        return (
          <FilterContainer key={filter.id}>
            {index === 0 && <span>Where</span>}
            {index === 1 && (
              <LogicSelector
                id={filters.id}
                value={filters?.logic}
                isGroup={isGroup}
              />
            )}
            {index > 1 && <span>{filters?.logic}</span>}
            <SelectorContainer>
              <FieldSelector
                id={isGroup ? { dataId: id, filterId: filter.id } : filter.id}
                value={filter?.field}
                isGroup={isGroup}
              />
              <OperatorSelector
                id={isGroup ? { dataId: id, filterId: filter.id } : filter.id}
                field={filter.field}
                value={filter?.operator}
                isGroup={isGroup}
              />
              <ValueSelector
                field={filter.field}
                id={isGroup ? { dataId: id, filterId: filter.id } : filter.id}
                value={filter?.value}
                isGroup={isGroup}
              />
              <FaTimes
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (isGroup && filters.data.length === 1)
                    dispatch({ type: "delete", payload: id });
                  dispatch({
                    type: isGroup ? "delete/group" : "delete",
                    payload: isGroup ? { id, filterId: filter.id } : filter.id,
                  });
                }}
              />
            </SelectorContainer>
          </FilterContainer>
        );
      })}
      {isGroup && !filters.data.length ? null : (
        <div className="" style={{ display: "flex", gap: "8px", width: 300 }}>
          <FilterTypeSelector id={id} isGroup={isGroup} />
          <Button
            variation="danger"
            disabled={!filters?.data?.length}
            onClick={() => handleDelete(isGroup, id)}
          >
            <BiTrash />
            <span>Delete filter</span>
          </Button>
        </div>
      )}
    </StyledContainer>
  );
}

FilterGroup.propTypes = {
  filters: PropTypes.object,
  id: PropTypes.string,
  isGroup: PropTypes.bool,
};
