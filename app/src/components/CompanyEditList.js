import React from 'react'
import {useState,useEffect} from 'react'
import  axios from 'axios'

//components
import CompanyEditListItem from './CompanyEditListItem'

function CompanyEditList() {

  const[events,setEvents]=useState()
  const[isLoading,setIsLoading]=useState(true)


  useEffect(() => {
    
   
    const eve=[]
    const prom=new Promise((resolve,reject) => {
      
      axios.get("http://localhost:3002/company/employee-occupied").then((response) => {
       console.log(response.data)
       const ev=response.data
        ev.map((m) => {
          if(!ev.includes(m.eventId)){
            console.log(m)
            eve.push(m.eventId) 
            
          }
        })

        
      })
      setTimeout(()=>{
        resolve()
      },500)
    

    })

    prom.then(() => {
      setEvents(eve)
      setIsLoading(false)
    })

  },[])

  const[seeMore,setSeeMore]=useState(false)
  

 
  if(!isLoading && events!=null){
  return (
    <div class="flex p-5 w-full bg-pink-400 rounded-md shadow-xl">
      

      <ul class=" flex-col m-4 p-4 rounded-md">
        {
            
            events.map((e) => {
             
             
               return (
                <CompanyEditListItem eventId={e}/>
                  
               )
            
            })
          }
          </ul>
    </div>
  )
  }
}

export default CompanyEditList