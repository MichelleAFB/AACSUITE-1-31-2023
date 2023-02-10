import * as actionTypes from './reload-types'


export function reloadPage (reload) {
  
  
  return {
    type: actionTypes.RELOAD_PAGE,
    payload: {
      reload:!reload
    }
    
  }
}