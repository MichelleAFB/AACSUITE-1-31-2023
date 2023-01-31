
import * as actionTypes from './reload-types'

const initialState = {
    reload:false
}
console.log(" reload reducer:")
console.log(actionTypes)

export const reloadReducer = (state = initialState,action) => {
  switch(action.type){
    case actionTypes.RELOAD_PAGE:
      console.log("*********RELOADING PAGE TO UPDATE EVENT INFO")
    
    return{
      ...state,
      reload: !state.reload
    }
    default:
      return{
        ...state
      }
  }}

  console.log(reloadReducer)