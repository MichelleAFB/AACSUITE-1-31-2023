import * as actionTypes from './employeeModal-types';

export function setEmployeeModalOpen () {
  console.log("****FROM REDUX SETTING EMPLOYEE MODAL OPEN *******")
  
  return {
    type: actionTypes.SET_EMPLOYEE_MODAL_OPEN,
    payload:{
      visibility:true
    }
    
  }
}


export function setGraphVisible() {
  console.log("****FROM REDUX SETTING EMPLOYEE MODAL OPEN *******")
  
  return {
    type: actionTypes.SET_GRAPH_VISIBLE,
    payload:{
      graphVisibility:true
    }
    
  }
}

export function setGraphHidden() {
  console.log("****FROM REDUX SETTING EMPLOYEE MODAL OPEN *******")
  
  return {
    type: actionTypes.SET_GRAPH_HIDDEN,
    payload:{
      graphVisibility:false
    }
    
  }
}
export function setEmployeeModalClose () {
  console.log("****FROM REDUX SETTING EMPLOYEE MODAL CLOSE*******")
 
  return {
    type: actionTypes.SET_EMPLOYEE_MODAL_CLOSE,
    payload:{
      visibility:false
    }
    
  }
}

export function setEmployeeModalEvent (event) {
  console.log("****FROM REDUX SETTING CLIENT MODAL EVENTE*******")
 
  return {
    type: actionTypes.SET_EMPLOYEE_MODAL_EVENT,
    payload:{
      event:event
    }
    
  }
}



export function setMenuVisible () {
  console.log("****FROM REDUX SETTING CLIENT MODAL EVENTE*******")
 
  return {
    type: actionTypes.SET_MENU_VISIBLE,
    payload:{
      showMenu:true
    }
    
  }
}

export function setEmployee(emp) {
  console.log("****FROM REDUX SETTING EMPLOYEE*******")
 
  return {
    type: actionTypes.SET_EMPLOYEE,
    payload:{
      employee:emp
    }
    
  }
}