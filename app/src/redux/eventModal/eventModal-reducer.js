import * as actionTypes from './eventModal-types'



const initialState = {
  
  event:{
    act:"",
    id:-1,
    date:"",
    time:"",
    httpId:"",
    image:"",
    access:""
  },
  publicEvent:{
    act:"",
    id:-1,
    date:"",
    time:"",
    httpId:"",
    image:"",
    access:""
  },
  companyEvent:{
    act:"",
    id:-1,
    date:"",
    time:"",
    httpId:"",
    image:"",
    access:""

  },
  occupied:[],
  updateOccuring:false,
  publicVisibility:false,
  companyVisibility:false,
  visibility:false,
  visibilityAccessModal:false,
}



  export const eventModalReducer = (state = initialState,action) => {
    switch(action.type){
      case actionTypes.SET_MODAL_OPEN:
        console.log("WORKING IN REDUCER: TOGGLE")
      return{
        ...state,
        visibility:true
      }
      case actionTypes.SET_MODAL_CLOSE:
        console.log("WORKING IN REDUCER: TOGGLE")
      return{
        ...state,
        visibility:false
      }
      case actionTypes.SET_MODAL_EVENT:
        console.log("REDUX::WORKING IN REDUCER: EVENT")
        console.log("activating")
        return{
          ...state,
          event:action.payload
        }
        /********************************/
        case actionTypes.SET_PUBLIC_MODAL_OPEN:
          console.log("WORKING IN REDUCER: TOGGLE")
        return{
          ...state,
          publicVisibility:true
        }
        case actionTypes.SET_PUBLIC_MODAL_CLOSE:
          console.log("WORKING IN REDUCER: TOGGLE")
        return{
          ...state,
          publicVisibility:false
        }
        case actionTypes.SET_PUBLIC_MODAL_EVENT:
          console.log("REDUX::WORKING IN REDUCER: EVENT")
          console.log("activating")
          return{
            ...state,
            publicEvent:action.payload
          }
          /********************************/
          case actionTypes.SET_COMPANY_MODAL_OPEN:
          console.log("WORKING IN REDUCER: TOGGLE")
        return{
          ...state,
          companyVisibility:true
        }
        case actionTypes.SET_COMPANY_MODAL_CLOSE:
          console.log("WORKING IN REDUCER: TOGGLE")
        return{
          ...state,
          companyVisibility:false
        }
        case actionTypes.SET_COMPANY_MODAL_EVENT:
          console.log("REDUX::WORKING IN REDUCER: EVENT")
          console.log("activating")
          return{
            ...state,
            companyEvent:action.payload
          }
          /******************************** */
      case actionTypes.SET_MODAL_EVENT_OCCUPIED:
        console.log("REDUX::WORKING IN REDUCER: EVENT OCCUPIED")
        return{
          ...state,
          occupied:action.payload
        }
        case actionTypes.RESET_MODAL_EVENT_OCCUPIED:
          console.log("REDUX::RESET EVENT OCCUPIED")
          return{
            ...state,
            occupied:action.payload
          }
          case actionTypes.EDIT_EVENT_ACCESS_TYPE:
            console.log("REDUX::EVENT CHANGING ACCES TYPE")
            return{
              ...state,
              ...state.event,
              access:action.payload
            }
      
      default:
        return state
    }
  }

  console.log("event Modal reducer")
 