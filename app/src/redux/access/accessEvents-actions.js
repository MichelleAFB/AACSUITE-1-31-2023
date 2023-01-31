import * as actionTypes from './accessEvents-types';
import { useSelector } from 'react-redux';


export function addPublicEvent (event) {
  console.log("****ADD Public EVENTS*******")
  
  return {
    type: actionTypes.ADD_PUBLIC_EVENT,
    payload:event
    
  }
}

export function addCompanyEvent (event) {
  console.log("****ADD Public EVENTS*******")
  
  return {
    type: actionTypes.ADD_COMPANY_EVENT,
    payload:event
  }
}

export function changeAccessType (event,accessType) {
  console.log("****ADD Public EVENTS*******")
  
  return {
    type: actionTypes.ADD_PUBLIC_EVENT,
    payload:{event:event,accessType:accessType}
    
  }
}