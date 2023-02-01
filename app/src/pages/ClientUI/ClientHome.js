import React from 'react'
import {useState,useEffect} from 'react'


//components
import EventListFull from '../../components/EventListFull'
import ClientBookedReservationList from '../../components/ClientBookedReservationList'
//import ClientModalFix from '../../components/ClientModalFix'

function ClientHome() {
  return (
    <body>
					
		<div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 p-10" >
		<p>words</p>
			<div class="px-10 mt-6">
				<div class="w-full">
				<div class="flex p-5">
					<div class="flex  gap-y-5 mt-30 mr-5 w-full bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 hover:text-indigo-500">
								<div class="flex w-full p-10 rounded-md">
									<EventListFull listType="public"/>
                  <ClientBookedReservationList/>
								</div>
                
							
						</div>
					</div>
				</div>
		
			
			
					<div class="m-5" >
					<p>ClientBookedReservationList</p>
				
					</div>
				</div>
			</div>
		</body>
  )
}

export default ClientHome