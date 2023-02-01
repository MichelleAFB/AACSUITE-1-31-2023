import React from 'react'
import axios from 'axios'


import {useEffect,useState} from 'react'
import EventList from '../../components/EventList'
import ClientEventListItem from '../../components/ClientEventListItem'
import ClientEventList from '../../components/ClientEventList'
import EmptyEventListItem from '../../components/EmptyEventListItem'
import TodayEventBox from '../../components/TodayEventBox'
import EventModal from '../../components/EventModal'
import EventAccesstypeModal from '../../components/EventAccesstypeModal'
import {useSelector,useDispatch} from 'react-redux'
import {setTodaysEventModalOpen,setTodaysEvent} from '../../redux/todaysEventModal/todaysEvent-actions'
//import TodaysEventModal from '../../components/TodaysEventModal'
import {setModalClose,setModalOpen} from '../../redux/eventModal/eventModal-action'
import ClientModal from '../../components/ClientModal'
import ClientBookedReservationList from '../../components/ClientBookedReservationList'
import { connect } from 'react-redux'
import ClientRequestModal from '../../components/ClientRequestModal'
import {toast,ToastContainer} from 'react-toastify'
import ClientModalFix from '../../components/ClientModalFix'

function ClientFullSuite({modalOpen}) {

		const[events,setEvents] =useState()
	
		const[event,setEvent] = useState()
		const [isLoading,setIsLoading] = useState(true)
		
		
		useEffect(() => {

			setIsLoading(false)

		},[])
		
	

		console.log("RAHH")

	if(!isLoading ){
		console.log("sqeakkk2")
		console.log("modalOpen:"+modalOpen)
		return (
			<body>
				
		
				
		<div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 p-10" onMouseEnter={()=> {
			console.log("modalOpen from fullsuite:"+modalOpen)
		}}>
			<ToastContainer/>
			<ClientModalFix/>
			<div class="px-10 mt-6">
				<div class="w-full">
				<div class="flex p-5">
					<div class="flex  gap-y-5 mt-30 mr-5 w-full bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 hover:text-indigo-500">
								<div class=" w-full bg-gray-400 p-20 rounded-md">
									<ClientEventList/>
								</div>
							
						</div>
					</div>
				</div>
		
			
			
					<div class="m-5" >
					{/*<ClientBookedReservationList/>
					<ClientBookedReservationList/>*/}
					</div>
				</div>
			</div>
		</body>
			)
	}
}


export default ClientFullSuite