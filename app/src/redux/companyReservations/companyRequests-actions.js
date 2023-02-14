import * as actionTypes from './companyRequests-types'

export function setCompanyRequests (request) {
  console.log("****FROM REDUX SETTING EMPLOYEE MODAL OPEN *******")
  console.log(request)
  
  return {
    type: actionTypes.SET_COMPANY_REQUESTS,
    payload:{
      request:request 
    }
    
  }
}