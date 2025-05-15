import { v4 as uuid } from "uuid";

export const initialState = {
  id: uuid(),
  logic: "and",
  data: [],
};

const initialAddValue = {
  field: "",
  operator: "eq",
  logic: "and",
};

export function bookingsFilterReducer(state, action) {
  switch (action.type) {
    case "add":
      if (action.payload === "rule")
        return {
          ...state,
          data: [
            ...state.data,
            { id: uuid(), ...initialAddValue, type: "rule" },
          ],
        };
      if (action.payload === "group")
        return {
          ...state,
          data: [
            ...state.data,
            {
              id: uuid(),
              logic: "and",
              type: "group",
              data: [{ id: uuid(), ...initialAddValue, type: "rule" }],
            },
          ],
        };
      break;
    case "add/group":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              data: [
                ...item.data,
                {
                  id: uuid(),
                  ...initialAddValue,
                  type: "rule",
                },
              ],
            };
          }
          return item;
        }),
      };
    case "change":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              [action.payload.field]: action.payload.value,
            };
          }
          return item;
        }),
      };
    case "change/logic":
      return {
        ...state,
        logic: action.payload.value,
      };
    case "change/logic/group":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              logic: action.payload.value,
            };
          }
          return item;
        }),
      };
    case "change/group":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              data: item.data.map((element) => {
                if (element.id === action.payload.filterId) {
                  return {
                    ...element,
                    [action.payload.field]: action.payload.value,
                  };
                }
                return element;
              }),
            };
          }
          return item;
        }),
      };
    case "delete":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case "delete/group":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              data: item.data.filter(
                (data) => data.id !== action.payload.filterId
              ),
            };
          }
          return item;
        }),
      };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}
