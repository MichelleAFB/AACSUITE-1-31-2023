
import * as actionTypes from './companyRequests-types';
console.log(actionTypes)
const initialState = {
  
 
  
  requests:[]
}

export const companyRequestsReducer = (state = initialState,action) => {
  switch(action.type){
    case actionTypes.SET_COMPANY_REQUESTS:
      console.log("COMPANY REQUEST REDUCER")
    return{
      ...state,
      requests:[...state.requests,action.payload]
    }
   
    default:
      return state
  }
}
