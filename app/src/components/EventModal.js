import axios from 'axios'
import React, { useEffect,useState, forceUpdate} from 'react'
import {useSelector,useDispatch,connect } from 'react-redux'

import {setModalEvent,setModalOpen,setModalClose,setModalEventOccupied,setAccessTypeModalOpen,editEventAccessType} from '../redux/eventModal/eventModal-action'
import { setOccupiedSeats } from '../redux/events/events-actions'
import { useNavigate } from 'react-router-dom'
import { addPublicEvent } from '../redux/access/accessEvents-actions'
import {reloadPage} from '../redux/reload/reload-actions'
import { seats } from '../data/Seats'


const EventModal = ({ourEvent,visibility}) => {

  
  const editEvent=useSelector((state) =>state.showModal.event)
  const editEventOccupied=useSelector((state) =>state.showModal.occupied)
  console.log(editEvent)
  
  //const visibility= useSelector((state => state.showModal.visibility))
  const [isLoading,setIsLoading]=useState(true)
  const [event,setEvent] =useState({})
  const [occupied,setOccupied] =useState()
  const [updateSeats,setUpdateSeats]=useState(false)
  const [selectedSeats,setSelectedSeats] = useState([])
  const selectArray=[]
  
  

  //editing variables
  const [editAccess,setEditAccess]=useState("")
  const [editReservations,setReservations]=useState()
  const[allSeats,setAllSeats] = useState([])
  const [changedAccess,setChangedAccess] =useState()
  const[hasChanged,setHasChanged] =useState(false)
  const[isReserved,setIsReserved] =useState(false)  //reserved for client exist

  const [isClientRequested,setIsClientRequested]=useState(false)
  const [clientRequests,setClientRequests]=useState()

  const[isCompanyRequested,setIsCompanyRequested]=useState(false) //company requests
  const[companyRequests,setCompanyRequests]=useState() //company requests exist
  
 
 

 
  
 useEffect(()=>{
  console.log("************************************ADMIN HOME RELOAD*********************")


  
  var reservedExists
    const prom = new Promise((resolve,reject) => {

      console.log("edit Event")
      console.log(ourEvent.event)
      const id=ourEvent.event.id
      console.log(id)
          axios.post("https://accserverheroku.herokuapp.com/getEventInfo/"+id).then(async(response) => {
            
            console.log(response)
            setEvent(await response.data[0])
            //setIsLoading(false)
          })
    
    
    /*
    if(event.access=="company" && editEventOccupied.length>0){
    editEventOccupied.occupied.map((o) => {
      o.selected=true
    })
    setOccupied(editEventOccupied.occupied)
    
    let i=0
   
    if(occupied.length!=0 && seats.length<41){
    while(i<40 && seats.length<41){
    occupied.map((o) => {
      occupied.some((r) => r.seat==i) ?  seats.push({seat:i,selected:true}):seats.push({seat:i,selected:false})
      
      i++
    }) 
    
  }}

  let j=0
  
  if(occupied.length==0 && seats.length<41){
    console.log("occupied==0")
    while(j<40 && seats.length<41){
    seats.push({seat:j,selected:false})
    j++
    }
  }
}
*/


    resolve()
  })
  


        prom.then(()=> {
         
          const occClient=[]
          var clientReqs=false
         
          const companyrequests=[] //if there are pending company request 
          var requested=false  
          if(event.access=="private"){
            setIsLoading(false)
          }
          const prom1= new Promise((resolve1,reject1) => {
            if(event.access=="company"){
              console.log("*********COMPANY OPTION")

                 //do pending request existing

           
                axios.get("http://localhost:3002/reservations/reservationsandrequests/"+event.access+"/"+event.id).then((responseCompany) => {
                  if(responseCompany.data.success==true){
                    console.log('**********ComPANY MODAL:GETTING OCCUPIEND')
                    const data=responseCompany.data.requests
                    console.log(responseCompany.data)
                    console.log("request from api")
                    console.log(responseCompany.data.requests)
                    const r=responseCompany.data.requests
                    if(r.length==1){
                      requested=true
                      companyrequests.push(r)
                      console.log("SINGLE REQ")
                      console.log(r)
                       
                      
                      
                    }if(data.length>1){
                      console.log("MULTIPLE REQ")
                      requested=true
                     r.map((rr) => {
                      console.log(rr)
                      console.log(event)
                      companyrequests.push(rr)
                      console.log(companyrequests)
                     })
                    }

                  var answer={exist:requested,occupied:companyrequests}
                  resolve1(answer)

                  }
                })
                //
                 
    
               
              }
              if(event.access=="public"){
                console.log("**********CLIENT REEQUEST")

                axios.get("http://localhost:3002/reservations/reservationsandrequests/"+event.access+"/"+event.id).then((responseClient) => {
                console.log("company requests")
                if(responseClient.data.success==true){
                  console.log('**********PUBLIC MODAL:GETTING OCCUPIEND')
                  const r=responseClient.data.requests
                  
                  console.log(r.length)
                  if(r.length==1){
                    clientReqs=true
                    occClient.push(r)
                      if(r.approved==1){
                        reservedExists=true
                      }
                  }if(r.length>1){
                    r.map((rr) => {
                      clientReqs=true
                      occClient.push(rr)
                       
                    })
                  }

                }

                var answer={exist:clientReqs,occ:occClient}
                resolve1(answer)

              })
             
              }   
        })

        prom1.then((answer) => {
          console.log("order work!!!!!")
          console.log(answer)

          const prom2=new Promise((resolve2,reject3) => {
            //console.log("reservedExists:"+reservedExists)
           // console.log("clent requests array:")
           // console.log(clientReqs)
            //console.log("company request array: ")
            //console.log(companyrequests)
            setIsReserved(reservedExists)
            setIsClientRequested(clientReqs)
            //console.log(occClient)
            setClientRequests(occClient)
            setIsCompanyRequested(requested)
            setCompanyRequests(companyrequests)
            setTimeout(() => {
              resolve2()
            },1000)
          
          })

          prom2.then(() => {
            //console.log('MADE IT HERE________')
            //console.log("company rested?"+isCompanyRequested)
            
            setIsLoading(false)
            /******************************** */
            
            /******************************** */
          })
        })


      })
         // let reserved=false
         // const requests=[]
         /* 

             prom1.then(()=> {
              setRequest(requests)
              setIsRequested(requested)
              setIsReserved(reserved)
              setIsLoading(false)
              setEditAccess(event.access)
               setAllSeats(seats)
               console.log(allSeats)
              
      
        */
       
      },[visibility,event])

      /**
       * if(event.access=="public"){

                   
                    axios.get("http://localhost:3002/reservations/reservationsandrequests/"+event.access+"/"+event.id).then((responseClient) => {
                      
                    if(responseClient.data.success==true){
                      console.log('**********PUBLIC MODAL:GETTING OCCUPIEND')
                      const r=responseClient.data.requests
                      clientReqs=true
                      console.log(r.length)
                      if(r.length==1){
                        occClient.push(r)
                      }if(r.length>1){
                        r.map((rr) => {
                          occClient.push(rr)
                        })
                      }

                    }

        

                    })


                    

                  }
       */

      console.log(event)
      
      console.log(isReserved)

    const dispatch=useDispatch()
    const navigate=useNavigate()
      console.log("visibility: " + visibility)

    function displaySeats(){
        if(event.access=='public'){
          console.log("true")
          return true
        }else{
          console.log("false")
          return false
        }
    }
   

 
  
  

  const reload= useSelector((state) => state.reloadPage.reload)
 

  
 

  if( visibility==true && !isLoading){
    console.log("companyrequests")
    console.log(companyRequests)
    console.log(isCompanyRequested)
    console.log("clientRequets")
    console.log(clientRequests)
    console.log(isClientRequested)
  return (

   
  <div class="bg-gray-200">
    <div class="h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50">
        <main id="content" role="main" class="w-full max-w-md mx-auto ">
    <div class=" bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-5">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <p class="mt-2 text-sm text-gray-600 font-bold dark:text-gray-400">Edit </p>
          <p class="block text-xl font-bold text-gray-800 dark:text-white">{event.act} </p>
          <p class="block text-lg font-bold text-gray-800 dark:text-white">{event.date} </p>
          <p class="block text-lg font-bold text-gray-800 dark:text-white">{event.time} </p>
         {isCompanyRequested? <div class="flex flex-col p-10">
              <div>
                  <p class="block text-2xl font-bold text-gray-800 dark:text-red-500">RESERVED
                  </p>
                  <p class="text-white text-small">
                    employees have active requests or reservations for this event
                  </p>
              </div>
              <div class={`flex  row-span-${companyRequests.length}`}>
                <ul class="justify-center">
                {companyRequests.map((m) => {
                  
                  return<li class="justify-self-center ">
                            <p class="text-xs text-white text-center">
                              Seat {m.seat}
                            </p>
                         </li>
                })}
                </ul>
              </div>
            </div>:
          <p></p>} 
          
         
        </div>

        <div class="mt-5">
          <div class="flex flex-wrap p-5 justify-center">
            {
              isReserved && (
                <p> HAS reservation</p>
              )
            }
          </div>
        
          <form>
          <button onClick ={(e) => {
                e.preventDefault()
                console.log("setting occupied confirm")
                const select=allSeats.filter((s) => 
                  s.selected==true
                )
                const prom = new Promise((resolve,reject) => {
                  select.map((s) => {
                    s.actID=event.id
                    s.act=event.act
                  })
                  console.log("changed Access?")
                  console.log(changedAccess)
                  if(hasChanged==true){
                    axios.post("https://accserverheroku.herokuapp.com/setAccessType",{event:event, access:changedAccess}).then((response) => {
                    
                      console.log("response")
                     console.log(response)
                     console.log("changed Access?")
                      console.log(changedAccess)
                    })
                }
                  
                 
                  resolve()
                })

                prom.then(() => {
                  console.log("setting occupied then")

                 
                    console.log("CLOSING MODAL")
                    dispatch(addPublicEvent(event))
                    setIsLoading(true)
                     dispatch(setModalClose(false))
                    console.log("isloading")
                    console.log(isLoading)
                   console.log("has access changed:"+ hasChanged)
                   console.log(changedAccess)

                 
                  
                  
                  
                })
                

              
              }}class="py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">confirm</button>
            <div class="grid gap-y-4">
              <div>
               
                <div class="relative">
                <p class="text-bold text-gray-200">
                  Current: {event.access}
                </p>
                
                  <select id="states" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=> {
                    setHasChanged(true)
                    
                    const prom= new Promise((resolve,reject) => {
                      setChangedAccess(e.target.value)
                      resolve()
                    })

                    prom.then(() => {

                      console.log("editaccess " + editAccess+ " is changed to "+changedAccess)
                    })
                    
                  }}>
                      <option selected>Choose access</option>
                      <option value="private" >private</option>
                      <option value="public">public</option>
                      <option value="company" >company</option>
                  </select>
                
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Reservation</label>
                <div class="relative">
         
         
          <div class="seats">
          {occupied==null   ? <p class="text-bold text-gray-200">Current:No reservations</p>:
          <div class="seats">{occupied.map((o) => {
                   return  <button class="seat selected" onClick={(e) => {
                    e.preventDefault()
                   
                    
                    if(o.selected==null){
                      console.log("uninstantiates")
                      o.selected=false
                    }else{
                      if(o.selected==true){
                        o.selected=false
                       
                      }else{
                        o.selected=true
                        
                      }
                    
                    }

                   }}><p class="text-gray-200">{o.seat}</p></button>
                  })}
              </div>}
          </div>
          <div class="flex">
                  
           
            <div class="flex mt-3">
              {
              <div class="seats">
              {allSeats.map((s) => {
                if(s.selected==false){
                  console.log(s)
                   return <button onClick={(e) => {
                    e.preventDefault()
                    console.log(s.seat)
                    console.log(s.selected)
                    console.log("update Seats" + updateSeats)
                    setUpdateSeats(!updateSeats)
                    s.selected=!s.selected
                    console.log(allSeats)  
                  }} class="seat"><p>{s.seat}</p></button>
                }
                if(s.selected==true){
                  
                  return <button onClick={(e) => {
                    e.preventDefault()
                    
                    setUpdateSeats(!updateSeats)
                    console.log(s.seat)
                    console.log(s.selected)
                    console.log("update Seats" + updateSeats)
                    s.selected=!s.selected
                    console.log(allSeats)
                    
                    
                  }} class="seat selected "><p>{s.seat}</p></button>
                }
                }
              )}
              </div>
               
              }
               
                </div>
              
              </div>
            </div>
            </div>
            <div class="flex">
              </div>
       
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        View Github
      </a>
      <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
        
        Contact us!
      </a>
    </p>
  </main>
        </div>
      </div>
  
  )
  }
}

/*
*/
const mapStateToProps = (state,props) => {
  const vis=state.showModal.visibility
  const event=state.showModal.event
  console.log("vis: " + vis)
  return{
    visibility:vis,
    ourEvent:event
  }
}

export default connect(mapStateToProps)(EventModal)