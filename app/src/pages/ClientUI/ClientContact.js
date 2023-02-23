import React, { useEffect } from 'react'
import { json, Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { m } from 'framer-motion'

function ClientContact() {
  
  const[phone,setPhone]=useState("")
  const[message,setMessage]=useState("")
  const[requests,setRequests]=useState()
  const[requestId,setRequestId]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[eventId,setEventId]=useState()
  useEffect(() =>{
    const newRequests=[]
    const prom=new Promise((resolve,reject) =>{
      axios.get("http://localhost:3002/reservations/reservationRequests/"+JSON.parse(sessionStorage.getItem('client')).email+"/"+JSON.parse(sessionStorage.getItem('client')).firstname+"/"+JSON.parse(sessionStorage.getItem('client')).lastname).then((response) =>{
        console.log(response.data)
        const data=response.data
        setRequests(response.data)
        data.map((m) =>{
          if(!newRequests.includes(m.eventId)){
           
            newRequests.push(m)
          }
        }) 
        setRequests(newRequests)
        resolve()
      })
    })

    prom.then(() =>{
      const uniqueRequests=[]
     
      function objMap(obj, func) {
        return Object.fromEntries(Object.entries(requests).map(([k, v]) => [k, func(v)]));
      }
      
      // To square each value you can call it like this:
     

        setIsLoading(false)
      
    })

  },[])


  function getEventId(id){
    let eventId
    const prom=new Promise((resolve,reject) =>{
      requests.map((r) =>{
        if(r.id==id){
         //console.log(r.eventId)
         eventId=r.eventId
         resolve(eventId)
        }
     })
    })
   
    prom.then((eventId) =>{
        return eventId
    })
    return eventId
  }


  if(!isLoading){
  return (
    <body class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 p-10">
  
    
  
  
    <main class=" sm:p-10 space-y-6">
      <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between ">
        <div >
          <h1 class="text-4xl font-semibold mb-2">Dashboard</h1>
          <h2 class="text-gray-600 ml-0.5 text-lg">Welcome {JSON.parse(sessionStorage.getItem('client')).firstname}!</h2>
        </div>
        <div class="flex flex-wrap items-start justify-end -mb-3">
         
        </div>
      </div>

      <div class="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div class="p-6 font-semibold border-b border-gray-100">
            <p class="text-center text-xl">Contact</p>
            <form>
              <div class="form-group">
                <p class="text-center m-3">Your Contact Details</p>
              
                  <p class="text-center">{JSON.parse(sessionStorage.getItem('client')).email}</p>
                 
                  <input type="text" class="m-3 bg-gray-200 p-3 rounded-md w-full" placeholder="Phone" onChange={(e) =>{
                      setPhone(e.target.value)
                  }}/>
                  <textarea cols="40" rows="8" type="textarea" class="m-3 bg-gray-200 rounded-md w-full p-2" placeholder="message" onChange={(e) =>{
                    setMessage(e.target.value)
                  }}/>
                  <p  class="text-sm">If message regards one of your requests or reservation please specific which event:</p>
                     <select
                            id='states'
                            class='m-3 rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white span:text-green dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          onChange={(e) =>{
                            console.log("\n\n")
                            console.log(e.target.value)
                            setRequestId(e.target.value)
                            setEventId(getEventId(e.target.value))
                          }}
                          >
                            <option  value={m} onChange={(e)=>{
                              }}>Choose an Event </option>
                            {requests.map((m) =>{
                              return <option class="flex" value={m.id}><p class="text-white "> {m.act}| {m.dateReserved} | {m.timeReserved}</p> 
                               
                               {m.approved==1?<p class="text-green-400  text-right ml-4"><span >------------reserved</span></p>:<p></p>}
                               {m.approved==-1?<p class="text-green-400  text-right ml-4">------------denied</p>:<p></p>}
                               </option>
                            })}
                           
                          </select>
                  <button class="m-3 bg-green-400 rounded-md p-3 hover:bg-green-300"  onClick={(e)=>{
                    e.preventDefault()
                      if(phone!=null && message!=null){
                        axios.post("http://localhost:3002/reservations/client-messages/",{requestId:requestId,firstname:JSON.parse(sessionStorage.getItem('client')).firstname,lastname:JSON.parse(sessionStorage.getItem('client')).lastname,email:JSON.parse(sessionStorage.getItem('client')).email,phone:phone,message:message,eventId:eventId}).then((response) => {
                          if(response.data.success){
                            alert("Message Sent!")
                            setPhone("")
                            setMessage("")
                          }else{
                            alert("we experienced an error")
                          }
                        })
                      }
                  }
                  }>Submit</button>
              </div>
              <div class="form-group">
                
              </div>
            </form>
          </div>
          <div class="p-4 flex-grow">
              
          </div>
        </div>


    
    
     
    

     
    
    </main>
 
</body>
  )
                }
}

export default ClientContact