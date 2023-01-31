import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffect,useState} from'react'
import axios from 'axios'
import { populatePublicEvents } from '../../redux/events/events-actions'
import {useDispatch, useSelector} from 'react-redux'

function ClientPreHome() {

      const[events,setEvents]=useState()
      const[isLoading,setIsLoading] =useState(true)

      const dispatch= useDispatch()
      useEffect(() => {
        const eve=[]
        const prom = new Promise((resolve,reject) => {

            axios.get("https://accserverheroku.herokuapp.com/publicEvents").then((response) => {
              console.log(events)
              dispatch(populatePublicEvents(response.data))
        })
            
          resolve()
        })

        prom.then(() => {
          console.log(events)
          setIsLoading(false)

        })
         
      },[])

      const c=useSelector((state) => state)
      console.log("\n\n\n")
      console.log(c)

  const navigate= useNavigate()
  return (
    <body>
      <div class="page">
      <div className="w-3/4  items-center justify-center mt-40 justify-self-center p-10 ml-20">
        <div class="flex flex-nowrap ">
          <div class="w-full flex-none p-2">
    <div class="text-white text-center bg-blue-600 p-10 rounded-lg" onClick={()=> { navigate('/client-full-suite')}}>Full Suite Experience</div>
  </div>
  </div>
</div>
    </div>
    </body>
  )
}

export default ClientPreHome