import * as actionTypes from './events-types'



const INITIAL_STATE = {
  
  events:[],
  selectEvent:{
    act:"",
    id:-1,
    date:"",
    time:"",
    httpId:"",
    image:""
  },
  occupied:[],
  selectSeats:[],
  publicEvents:[]

}


export const eventReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case actionTypes.POPULATE_EVENTS:
    if(state.events.length==0 || state.events==null){
      console.log("empty")
      state.events =action.payload
    }
    return{
      ...state
    }
    case actionTypes.POPULATE_PUBLIC_EVENTS:
      console.log("POPULATING PUBLIC EVENTS")
    if(state.publicEvents.length==0 || state.publicEvents==null){
      console.log("empty")
      state.publicEvents =action.payload
    }
    return{
      ...state
    }
    case actionTypes.LOAD_CURRENT_EVENT:
      return{
        ...state,
        selectEvent:action.payload
      }
    case actionTypes.ADJUST_SELECT_SEATS:
      return{
        ...state
      }
    case actionTypes.ADJUST_OCC_SEATS:
      return {
        ...state,
        occupied:action.payload
      }
    default:
      return state
  }
}

