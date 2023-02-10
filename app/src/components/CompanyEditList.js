import React from 'react'
import {useState,useEffect} from 'react'
import  axios from 'axios'

//components
import CompanyEditListItem from './CompanyEditListItem'

function CompanyEditList() {

  const[events,setEvents]=useState()
  const[isLoading,setIsLoading]=useState(true)


  useEffect(() => {
   
const ev=[]
    const prom=new Promise((resolve,reject) => {
      
      axios.get("http://localhost:3002/company/employee-occupied").then((response) => {
       console.log(response.data)
        response.data.map((m) => {
          if(!ev.includes(m.eventId)){
            ev.push(m.eventId)
          }
        })

        
      })
      resolve()

    })

    prom.then(() => {
      setEvents(ev)
      setIsLoading(false)
    })

  },[])

  if(!isLoading){
  return (
    <div class="flex p-5 w-full bg-gray-300 rounded-md shadow-xl">
      <ul>
        {
          events.map((e) => {
            return <CompanyEditList eventId={e.id}/>
          })
        }

      </ul>
    </div>
  )
  }
}

export default CompanyEditList