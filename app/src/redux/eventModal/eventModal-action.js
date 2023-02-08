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

export function setPublicModalOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
  
  return {
    type: actionTypes.SET_PUBLIC_MODAL_OPEN,
    payload:{
      publicVisibility:true
    }
    
  }
}

export function setPublicModalClose () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
 
  return {
    type: actionTypes.SET_PUBLIC_MODAL_CLOSE,
    payload:{
      publicVisibility:false
    }
    
  }
}

export function setPublicModalEvent (event) {
  console.log("set modal EVENT in action types")
  return {
    type: actionTypes.SET_PUBLIC_MODAL_EVENT,
    payload: {
      publicEvent: event
    }
  }
}

/*********************** */

export function setPublicReservedOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
  
  return {
    type: actionTypes.SET_PUBLIC_RESERVED_OPEN,
    payload:{
      publicReservedVisibility:true
    }
    
  }
}

export function setPublicReservedClose () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
 
  return {
    type: actionTypes.SET_PUBLIC_RESERVED_CLOSE,
    payload:{
      publicReservedVisibility:false
    }
    
  }
}

export function setPublicReserved (event) {
  console.log("set modal EVENT in action types")
  return {
    type: actionTypes.SET_PUBLIC_RESERVED,
    payload: {
      publicReserved: event
    }
  }
}
/************************************************** */
export function setPublicModalOccupied (occ) {
  console.log("set modal EVENT in action types")
  return {
    type: actionTypes.SET_PUBLIC_MODAL_OCCUPIED,
    payload: {
      publicOccupied: occ
    }
  }
}

export function setCompanyModalOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
  
  return {
    type: actionTypes.SET_COMPANY_MODAL_OPEN,
    payload:{
      companyVisibility:true
    }
    
  }
}

export function setCompanyModalClose () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
 
  return {
    type: actionTypes.SET_COMPANY_MODAL_CLOSE,
    payload:{
      companyVisibility:false
    }
    
  }
}

export function setCompanyModalEvent (event) {
  console.log("set modal EVENT in action types")
  return {
    type: actionTypes.SET_COMPANY_MODAL_EVENT,
    payload: {
      companyEvent: event
    }
  }
}

export function setPrivateModalOpen () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
  
  return {
    type: actionTypes.SET_PRIVATE_MODAL_OPEN,
    payload:{
      privateVisibility:true
    }
    
  }
}

export function setPrivateModalClose () {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
 
  return {
    type: actionTypes.SET_PRIVATE_MODAL_CLOSE,
    payload:{
      privateVisibility:false
    }
    
  }
}

export function setPrivateModalEvent (event) {
  console.log("set modal EVENT in action types")
  return {
    type: actionTypes.SET_PRIVATE_MODAL_EVENT,
    payload: {
      privateEvent: event
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

