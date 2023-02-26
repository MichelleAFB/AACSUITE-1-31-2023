import React from 'react'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

//components
import EventListFull from '../../components/EventListFull'
import ClientBookedReservationList from '../../components/ClientBookedReservationList'
import ClientEventList from '../../components/ClientEventList'
import ClientM from './ClientM'
import ClientMessagesList from './ClientMessagesList'
//import ClientModalFix from '../../components/ClientModalFix'

function ClientHome() {

	const[seeMessages,setSeeMessages]=useState(false)
  return (
    <body>
					<ClientM/>
		<div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 p-10" >
		<div class="m-5 flex-col w-full justify-center" >
			<button class="bg-green-200 p-3 w-full rounded-sm m-2">
				<Link  to="/client-contact">Contact</Link>
			</button>
			
		</div>
		
			<div class="px-10 mt-6">
				<div class="w-full">
				<div class="flex p-5">
					<div class="flex  gap-y-5 mt-30 mr-5 w-full bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 hover:text-indigo-500">
								<div class="flex w-full p-10 rounded-md">
									<ClientEventList/>
                  <ClientBookedReservationList/>
								</div>
                
							
						</div>
					</div>
				</div>
		
			
			
		
					<div class="m-5 flex-col w-full bg-red-200 justify-center" >
						<Link class="bg-green-200 p-3 " to="/client-contact">Contact</Link>
					</div>
			
					
				</div>
			</div>
		</body>
  )
}

export default ClientHome