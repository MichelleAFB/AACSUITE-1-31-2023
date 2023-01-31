
import * as actionTypes from './employeeModal-types';
console.log(actionTypes)
const initialState = {
  
  event:{
    act:"",
    id:-1,
    date:"",
    time:"",
    httpId:"",
    image:"",
  },
  visibility:false,
  showMenu:false,
  employee:{

  }
}

export const employeeEventModalReducer = (state = initialState,action) => {
  switch(action.type){
    case actionTypes.SET_EMPLOYEE_MODAL_OPEN:
      console.log("WORKING IN REDUCER: *****CEMPLOYEE MODAL OPEN**********")
    return{
      ...state,
      visibility:true
    }
    case actionTypes.SET_EMPLOYEE_MODAL_CLOSE:
      console.log("WORKING IN REDUCER: TOGGLE")
    return{
      ...state,
      visibility:false
    }
    case actionTypes.SET_EMPLOYEE_MODAL_EVENT:
      console.log("REDUX::WORKING IN REDUCER:EMPLOYEE  EVENT")
      return{
        ...state,
        event:action.payload
      }
      case actionTypes.SET_MENU_VISIBLE:
        console.log("REDUX::WORKING IN REDUCER:SHOW MENU")
        return{
          ...state,
          showMenu:action.payload
        }
        case actionTypes.SET_EMPLOYEE:
        console.log("REDUX::WORKING IN REDUCER:SHOW MENU")
        return{
          ...state,
          employee:action.payload
        }
    
    
    default:
      return state
  }
}
console.log("EMPLOYEE REDUCER")
console.log(employeeEventModalReducer)