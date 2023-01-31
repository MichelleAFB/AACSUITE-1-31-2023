import * as actionTypes from './topNavbar-types'

export function showTopNavbar () {
  console.log("SHOW TOP NAVBAR")
  return {
    type: actionTypes.SHOW_TOPNAVBAR,
    payload: {
      visibility: true
    }
  }
}

export function hideTopNavbar () {
  return {
    type: actionTypes.HIDE_TOPNAVBAR,
    payload: {
      visibility: false
    }
  }
}