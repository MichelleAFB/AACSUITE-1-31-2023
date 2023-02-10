import React from 'react'
import {useState,useEffect}from 'react'
import axios from 'axios'

function CompanyEditListItem({eventId}) {

  const[requests,setRequests]=useState()
  const[isLoading,setIsLoading]=useState(true)

  useEffect(() => {

    const prom=new Promise((resolve,reject)=> {
      axios.get("http://localhost:3002/company/getEventRequests/"+eventId).then((response) => {
        console.log(response.data)
        setRequests(response.data)
        resolve()
      })
    })

    prom.then(()=>{
      setIsLoading(false)
    })

  },[])

  if(!isLoading){
  return (
    <div class=" flex-col p-3 m-3 bg-blue-500 rounded-md rounded-md">
     {requests.map((r) =>{
      return <div class="flex">{r.id}</div>

     })}
    </div>
    )
  }
}

export default CompanyEditListItem