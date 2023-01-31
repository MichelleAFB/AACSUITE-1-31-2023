import *  as actionTypes from './todaysEvent-types'

export function setTodaysEventModalOpen (display) {
  return {
    type: actionTypes.SET_TODAYS_EVENT_MODAL_OPEN,
    payload: {
      visibility:display
    }
  }
}

export function setTodaysEvent (event) {
  console.log("from actiontypes")
  console.log(event)
  return {
    type: actionTypes.SET_TODAYS_EVENT,
    payload: {
      todaysEvent: event
    }
  }
}