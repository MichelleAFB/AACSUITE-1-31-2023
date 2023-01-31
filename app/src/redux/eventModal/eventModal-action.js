import * as actionTypes from './eventModal-types';
import { useSelector } from 'react-redux';


export function setModalOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
  
  return {
    type: actionTypes.SET_MODAL_OPEN,
    payload:{
      visibility:true
    }
    
  }
}

export function setModalClose () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
 
  return {
    type: actionTypes.SET_MODAL_CLOSE,
    payload:{
      visibility:false
    }
    
  }
}

export function setModalEvent (event) {
  console.log("set modal EVENT in action types")
  return {
    type: actionTypes.SET_MODAL_EVENT,
    payload: {
      event: event
    }
  }
}

export function setModalEventOccupied (occupied) {
  console.log("set modal EVENT OCCUPIED in action types")
  return {
    type: actionTypes.SET_MODAL_EVENT_OCCUPIED,
    payload: {
      occupied: occupied
    }
  }
}

export function setAccessTypeModalOpen (display) {
  console.log("set modal open in action types. display value")
  console.log(display)
  return {
    type: actionTypes.EDIT_EVENT_ACCESS_MODAL,
    payload:{
      visibilityAccessModal:display
    }
    
  }
}

export function editEventAccessType (access) {
  console.log("set modal UPDATE OCCURING in action types")
 
  return {
    type: actionTypes.EDIT_EVENT_ACCESS_TYPE,
    payload:access
  }
}

