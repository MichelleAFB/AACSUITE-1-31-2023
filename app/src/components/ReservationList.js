import React from 'react'

import axios from 'axios'
import {useEffect,useState} from 'react'
import ErrorBoundary from './ErrorBoundary'
import ReservationListItem from './ReservationListItem'

function ReservationList() {

  console.log("RESERVATION LIST")

  const [reservations,setReservations]= useState()
  const [isLoading,setIsLoading]=useState(true)
  const [filtered,setFiltered] = useState()

  
 
  
  useEffect(() => {
    const arr=[]
    console.log("RRRRR")
    const prom  = new Promise((resolve,reject) => {

      
      axios.get("https://accserverheroku.herokuapp.com/reservations/approvedReservations").then((response) => {
        console.log("approved reservations")  
      console.log(response.data)
      const results=response.data
    
      

      if( results.length>0){

       results.map((r) => {
        arr.push(r)
       })

        console.log("here")
        
        setReservations(arr)
        console.log(reservations)
        resolve(arr)
       
      }else{
        reject()
      }
      })
    })

    prom.then((arr) => {
     
      setIsLoading(false)
      setFiltered(arr)
      console.log("success")
    }).catch(
      console.log("could not set reservations")
    )
  },[])

  console.log(filtered)
  const handleChange = (e) => {
    if(e.target.value==null || e.target.value==""){
      const fil=reservations
      setFiltered(reservations)
    }
    
    const fil=[]
    
    const prom = new Promise((resolve,reject) => {
      
    setFiltered([])
    reservations.map((ev) => {
     
      const str=e.target.value.toUpperCase()
      console.log(str)
      const evie=ev.act.toUpperCase()
      console.log(evie)
      console.log(str)
      const evieSplit=evie.split(" ")
      
      
      const eve=ev.act
      console.log("\n\n")
      console.log(eve)
      //console.log(eve)
      console.log(evie.includes(str))
      if(evie.includes(str)){
        evieSplit.map((o) => {
          if(o.includes(str)){
            //console.log(evie.includes(str))
            console.log(o)
            console.log("string:"+str)
            console.log("event:"+evie)
            console.log("\n\n")
            fil.push(ev) 
          }
        })
        
      }
    })
    console.log(fil)
      resolve(fil)
    })

    prom.then(() => {
   
      setFiltered(fil)
      console.log("filtered should be")
      console.log(filtered)
  }).catch(
    console.log("filter not working")
  )   
}



if(!isLoading){
  return (
    <div class="rounded-md object-contain bg-green-800 max-h-screen overflow-y-auto p-5 m-5 items-center">
    
      <label class="px-3">
        <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
          placeholder="Search..." onChange={handleChange}/>
      </label>
      <p class="text-white text-center text-2xl mt-3">Confirmed Reservations</p>
      <ul class="mt-6 rounded-md p-10">
      {
    
          filtered.map((e) => {
             
                 return <ReservationListItem key={e.id} reservation={e}/>
                })
                
              }
      </ul>
    </div>
  )
}
}

/*

  {
                reservations.map((e) => {
               
                  return <li><ReservationListItem key={e.id} reservation={e}/></li>
                  })
              }
*/

export default ReservationList