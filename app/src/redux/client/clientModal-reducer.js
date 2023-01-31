import * as actionTypes from "./clientModal-types";
console.log(actionTypes);
const initialState = {
  event: {
    act: "",
    id: -1,
    date: "",
    time: "",
    httpId: "",
    image: "",
  },
  requestEvent: {
    act: "",
    id: -1,
    date: "",
    time: "",
    httpId: "",
    image: "",
  },
  visibility: false,
  requestVisibility: false,
};

export const clientEventModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CLIENT_MODAL_OPEN:
      console.log("WORKING IN REDUCER: *****CLIENT MODAL OPEN**********");
      return {
        ...state,
        visibility: true,
      };
    case actionTypes.SET_CLIENT_MODAL_CLOSE:
      console.log("WORKING IN REDUCER: TOGGLE");
      return {
        ...state,
        visibility: false,
      };
    case actionTypes.SET_CLIENT_MODAL_EVENT:
      console.log("REDUX::WORKING IN REDUCER: EVENT");
      return {
        ...state,
        event: action.payload,
      };
    case actionTypes.SET_CLIENT_REQUEST_MODAL_OPEN:
      console.log("WORKING IN REDUCER: *****CLIENT MODAL OPEN**********");
      return {
        ...state,
        requestVisibility: true,
      };
    case actionTypes.SET_CLIENT_REQUEST_MODAL_CLOSE:
      console.log("WORKING IN REDUCER: TOGGLE");
      return {
        ...state,
        requestVisibility: false,
      };
    case actionTypes.SET_CLIENT_REQUEST_MODAL_EVENT:
      console.log("REDUX::WORKING IN REDUCER: EVENT");
      return {
        ...state,
        requestEvent: action.payload,
      };

    default:
      return state;
  }
};
