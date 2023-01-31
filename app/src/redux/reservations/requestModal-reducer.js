
import * as actionTypes from './requestModal-types';
console.log(actionTypes)
const initialState = {
  
  request:{
  
  },
  visibility:false,
}

export const requestModalReducer = (state = initialState,action) => {
  switch(action.type){
    case actionTypes.SET_REQUEST_MODAL_OPEN:
      console.log("WORKING IN REDUCER: *****CLIENT MODAL OPEN**********")
    return{
      ...state,
      visibility:true
    }
    case actionTypes.SET_REQUEST_MODAL_CLOSE:
      console.log("WORKING IN REDUCER: TOGGLE")
    return{
      ...state,
      visibility:false
    }
    case actionTypes.SET_MODAL_REQUEST:
      console.log("REDUX::WORKING IN REDUCER: EVENT")
      return{
        ...state,
        request:action.payload
      }
    
    
    default:
      return state
  }
}