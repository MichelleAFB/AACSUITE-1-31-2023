import React from 'react'
import {useState,useEffect} from 'react'
import  axios from 'axios'

function CompanyEditList() {

  const[events,setEvents]=useState()
  const[isLoading,setIsLoading]=useState(true)

  useEffect(() => {
   

    const prom=new Promise((resolve,reject) => {
      
      axios.get("http://localhost:3002/company/employee-occupied").then((response) => {
       console.log(response.data)
        setEvents(response.data)
      })

    })

    prom.then(() => {
      setIsLoading(false)
    })

  },[])

  if(!isLoading){
  return (
    <div class="flex p-5 w-full bg-gray-300 rounded-md shadow-xl">
      <ul>
        {
          events.map((e) => {
            return<p>{e}</p>
          })
        }

      </ul>
    </div>
  )
  }
}

export default CompanyEditList