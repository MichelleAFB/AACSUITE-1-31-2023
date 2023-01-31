import React, { useEffect,useState } from 'react'
import axios from 'axios'

export default function TodayEventBox() {

  const [event,setEvent] = useState()
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {

    const prom = new Promise((resolve,reject) => {

      axios.get("https://accserverheroku.herokuapp.com/todaysEvent").then((response) => {
       
        if(response.data.exists==false){
          reject()
        }else{
            setEvent(response.data.event)
            resolve()
        }
        
      })
    })

    prom.then(() => {
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)

    })
  })

  
if(!isLoading && event!=null){
  return (
    
    <div class="w-full bg-green-300 p-10 rounded-md border-dashed border-2 border-indigo-500/100 ">
      <div class="flex">
        <p class="font-bold text-3xl">Today's Event</p>
      </div>
      <div class="flex m-3">
        <p>{event.act} | {event.date} | {event.time}</p>
      </div>
    </div>

  )}else{
    return(
      <div class="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md ">
        <h3>No Event Today</h3>
      </div>
    )
  }
}
