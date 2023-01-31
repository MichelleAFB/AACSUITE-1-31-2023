import * as actionTypes from './topNavbar-types'


const initialState={
  visibility:false
  
}


export const topNavbarReducer = (state = initialState,action) => {
  switch(action.type){
    case actionTypes.SHOW_TOPNAVBAR:
      state.visibility =true
    return{
      ...state,
      visibility:true
    }
    case actionTypes.HIDE_TOPNAVBAR:
     
    return{
      ...state,
      visibility:false
    }
    default:
      return state

  }
  
}