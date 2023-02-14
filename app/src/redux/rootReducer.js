import {combineReducers} from 'redux'
import {eventReducer} from './events/events-reducer'

import { topNavbarReducer } from './topNavbar/topNavbar-reducer'
import { eventModalReducer } from './eventModal/eventModal-reducer'
import { todaysEventReducer } from './todaysEventModal/todaysEvent-reducer'
import { accessEventsReducer } from './access/accessEvents-reducer'
import { clientEventModalReducer } from './client/clientModal-reducer'
import { reloadReducer } from './reload/reload-reducer'
import {requestModalReducer} from './reservations/requestModal-reducer'
import {employeeEventModalReducer} from './employee/employeeModal-reducer'
import { userReducer } from './user/user-reducer'
import { companyRequestsReducer } from './companyReservations/companyRequests-reducer'

export const rootReducer = combineReducers({
  storeEvent:eventReducer,
  showModal:eventModalReducer,
  showTodaysEvent:todaysEventReducer,
  accessEvents:accessEventsReducer,
  showClientModal:clientEventModalReducer,
  reloadPage:reloadReducer,
  requestModal:requestModalReducer,
  employeeModal:employeeEventModalReducer,
  topNavbar:topNavbarReducer,
  user:userReducer,
  companyRequests:companyRequestsReducer
})

console.log(rootReducer)
console.log("client Modal")
console.log(rootReducer.showClientModal)

//export default rootReducer