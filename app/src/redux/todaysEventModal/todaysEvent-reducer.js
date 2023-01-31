import * as actionTypes from './todaysEvent-types'

const INITIAL_STATE={
  todaysEvent:{
    
      act:"",
      id:-1,
      date:"",
      time:"",
      httpId:"",
      image:"",
      access:""
  },
  visibility:false
}



export const todaysEventReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case actionTypes.SET_TODAYS_EVENT_MODAL_OPEN:
    
    console.log("REDUCING SET TODAYS EVENT MODAL OPEN")
    return{
      ...state,
      visibility:action.payload
    }
    case actionTypes.SET_TODAYS_EVENT:
      console.log("REDUCING SET TODAYS EVENT")
      console.log(action.payload)
      return{
        ...state,
        todaysEvent:action.payload
      }
    
    default:
      return state
    }
  }