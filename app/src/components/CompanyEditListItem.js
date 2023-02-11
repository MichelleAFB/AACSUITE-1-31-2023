import React from 'react'
import {useState,useEffect}from 'react'
import axios from 'axios'

function CompanyEditListItem({eventId}) {

  const[requests,setRequests]=useState()
  const[isLoading,setIsLoading]=useState(true)

  console.log(eventId)

  useEffect(() => {

    console.log(eventId)
    const prom=new Promise((resolve,reject)=> {
      console.log(eventId)
      axios.get("http://localhost:3002/company/getEventRequests/"+eventId).then((response) => {
        
        console.log(response.data)
        const r=response.data.results
        setRequests(r)
        
        setTimeout(() =>{
          resolve()
        },2300)
       
        
      })
    })

    prom.then(()=>{
      console.log(requests)
        setIsLoading(false)
      
     
    })

  },[eventId])

  console.log(requests)

  const[seeMore,setSeeMore]=useState(false)
  
  if(!isLoading && requests!=null){
    console.log(requests)
  return (
    <div class=" flex-col p-3 m-3 bg-blue-500 rounded-md rounded-md">
      <p>{requests[0].act}</p>
      <button class="p-3 rounded-md bg-green-300" onClick={()=>{
          setSeeMore(!seeMore)
      }}>
        See
      </button>
      {
        seeMore?
         <div>
          <p>event</p>
             {
            requests.map((r) =>{
              return 
              <div class="m-3 flex ">
                hi
                <p>
                  ho
                </p>
              </div>
            })
          }

        </div>:<div></div>
      }
      {
        requests.map((r) => {
          console.log(r)
        })
      }
       {
            requests.map((r) =>{
              return 
              <div class="m-3 flex ">
                hi
                <p>
                  ho
                </p>
              </div>
            })
          }

        </div>
        )
  }
}

export default CompanyEditListItem