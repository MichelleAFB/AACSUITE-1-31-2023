import * as actionTypes from './user-types';
import { useSelector } from 'react-redux';


export function setUser (info) {
  console.log("****FROM REDUX SETTING MODAL OPEN OR CLOSE*******")
  console.log("INFOOO")
  console.log(info)
  console.log("\n\n\n\n\n")
  return {
    type: actionTypes.SET_USER,
    payload:{
      user:info.user,
      type:info.type
    }
    
  }
}



