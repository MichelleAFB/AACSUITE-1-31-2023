import * as actionTypes from './clientModal-types';

export function setClientModalOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN *******")
  
  return {
    type: actionTypes.SET_CLIENT_MODAL_OPEN,
    payload:{
      visibility:true
    }
    
  }
}

export function setClientModalClose () {
  console.log("****FROM REDUX SETTING MODAL CLOSE*******")
 
  return {
    type: actionTypes.SET_CLIENT_MODAL_CLOSE,
    payload:{
      visibility:false
    }
    
  }
}

export function setModalEvent (event) {
  console.log("****FROM REDUX SETTING CLIENT MODAL EVENTE*******")
 
  return {
    type: actionTypes.SET_CLIENT_MODAL_EVENT,
    payload:{
      event:event
    }
    
  }
}

export function setClientRequestModalOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN *******")
  
  return {
    type: actionTypes.SET_CLIENT_REQUEST_MODAL_OPEN,
    payload:{
      visibility:true
    }
    
  }
}

export function setClientRequestModalClose () {
  console.log("****FROM REDUX SETTING MODAL CLOSE*******")
 
  return {
    type: actionTypes.SET_CLIENT_REQUEST_MODAL_CLOSE,
    payload:{
      visibility:false
    }
    
  }
}

export function setClientRequestModalEvent (event) {
  console.log("****FROM REDUX SETTING CLIENT MODAL EVENTE*******")
 
  return {
    type: actionTypes.SET_CLIENT_REQUEST_MODAL_EVENT,
    payload:{
      event:event
    }
    
  }
}