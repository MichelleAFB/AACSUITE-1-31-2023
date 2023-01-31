import * as actionTypes from "./user-types";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
  },
  type: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log("REDUX::WORKING IN REDUCER: EVENT");
      console.log("activating");
      return {
        ...state,
        user: action.payload.user,
        type: action.payload.type,
      };

    default:
      return state;
  }
};

console.log("event Modal reducer");
