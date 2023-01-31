import * as actionTypes from './accessEvents-types'



const initialState = {
  
  publicEvents:[],
  companyEvents:[]
}

console.log(actionTypes)

  export const accessEventsReducer = (state = initialState,action) => {
    switch(action.type){
      case actionTypes.ADD_PUBLIC_EVENT:
       // console.log("WORKING IN REDUCER: ADD NEW PUBLIC EVENT")
        //console.log(state.publicEvents)
        action.payload.access="public"
      return{
        ...state,
        publicEvents: state.publicEvents.concat(action.payload)
      }
      case actionTypes.REMOVE_PUBLIC_EVENT:
        console.log("WORKING IN REDUCER: REMOVING PUBLIC EVENT: " + action.payload)
        console.log(state.publicEvents)
      return{
        ...state,
          publicEvents: state.publicEvents.filter((event) => 
          event.id!==action.payload.id
        )
      }
      case actionTypes.ADD_COMPANY_EVENT:
        console.log("WORKING IN REDUCER: ADD NEW COMPANY EVENT")
        console.log(state.companyEvents)
        action.payload.access="company"
      return{
        ...state,
        companyEvents: state.publicEvents.concat(action.payload)
      }

      case actionTypes.CHANGE_ACCESS_TYPE:
        console.log("CHANGING ACCESS TYPE FOR ")
        const event=action.payload.event
        const access= action.payload.access
        
        if(access=="public"){
          event.access="public"
          return{
            ...state,
            companyEvents: state.companyEvents.filter((event) => 
            event.id!==action.payload.id),
            publicEvents: state.publicEvents.concat(event)
          
          }
        }
          if(access=="company"){
            event.access="company"
            return{
              ...state,
              publicEvents: state.publicEvents.filter((event) => 
              event.id!==action.payload.id),
              companyEvents: state.companyEvents.concat(event)
            
            }
        }
       
    
      default:
        return state
    }
  }