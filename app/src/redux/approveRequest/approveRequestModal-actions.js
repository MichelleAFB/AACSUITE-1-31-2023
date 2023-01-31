import * as actionTypes from "./approveRequestModal-types";

export function setRequestModalOpen() {
  console.log("****FROM REDUX SETTING MODAL OPEN *******");

  return {
    type: actionTypes.SET_REQUEST_MODAL_OPEN,
    payload: {
      visibility: true,
    },
  };
}

export function setRequestModalClose() {
  console.log("****FROM REDUX SETTING MODAL CLOSE*******");

  return {
    type: actionTypes.SET_REQUEST_MODAL_CLOSE,
    payload: {
      visibility: false,
    },
  };
}

export function setModalRequest(request) {
  console.log("****FROM REDUX SETTING CLIENT MODAL EVENTE*******");

  return {
    type: actionTypes.SET_MODAL_REQUEST,
    payload: {
      request: request,
    },
  };
}
