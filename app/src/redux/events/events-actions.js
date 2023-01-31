import * as actionTypes from './events-types';


export function populateEvents (eventsArray) {
  return {
    type: actionTypes.POPULATE_EVENTS,
    payload: {
      events: eventsArray
    }
  }
}

export function populatePublicEvents (eventsArray) {
  return {
    type: actionTypes.POPULATE_PUBLIC_EVENTS,
    payload: {
      publicEvents: eventsArray
    }
  }
}

export function loadSelectEvent (event) {
  return {
    type: actionTypes.LOAD_CURRENT_EVENT,
    payload: {
      event: event
    }
  }
}

export function setOccupiedSeats(seats) {
  return {
    type: actionTypes.ADJUST_OCC_SEATS,
    payload: {
      occupied: seats
    }
  }
}



