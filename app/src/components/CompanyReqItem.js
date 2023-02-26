import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'

import CompanyReq from './CompanyReq'


function CompanyReqItem({eventId,event,requests}) {


    const[isLoading,setIsLoading]=useState()



        useEffect(()=>{
         
        },[])


        console.log(requests)
  return (
    <div class="w-300 bg-purple-500 m-4  overflow-y-scroll bg-blue-500 p-1 h-80  rounded-sm overflow-hidden  justify-center">
 
      
        <div class="flex p-3">
            <p class=" text-lg text-white text-center">{event.act} | {event.date} | {event.time}</p>
        </div>
        {requests.map((r) =>{
            return (
              <CompanyReq request={r}/>
             )
        })}
    
  
  </div>
  )
}

export default CompanyReqItem