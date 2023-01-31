import React, { useEffect,useRef,useMemo } from 'react'
import {useState} from 'react'
import EventModal from './EventModal'
import * as actionTypes from '../redux/eventModal/eventModal-action'

import {useDispatch,useSelector,connect} from 'react-redux'
import {setClientRequestModalEvent,setClientRequestModalOpen} from '../redux/client/clientModal-actions'
import { setEmployeeModalOpen,setEmployeeModalEvent} from '../redux/employee/employeeModal-actions'



import ReactDOM from 'react-dom'
import axios from 'axios'


 function ClientBookedReservationItem({modalType,event}){

  console.log(event)
    const visible= useSelector(state => state.showModal.visibilty)
    const [visibility,setVisibility]=useState(visible)
   
    console.log("**************************EVENTLIST ITEM RERENDER**********")
    const dispatch= useDispatch()
    const [ourEvent,setOurEvent]=useState(event)
    const [individual,setIndividual]=useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const[isReserved,setIsReserved] =useState(false)
    const [typeModal,setTypeModal] =useState()
    const [Act,setAct]=useState(event)
    const[occupied,setOccupied]=useState()
    
    const eve=useRef(event)
      //console.log(eve)
      useEffect(() => {
        console.log(event)
        console.log(event.occupied)
        const occ=[]
        var reserved=false
        const prom = new Promise((resolve,reject) => {
          setTypeModal(modalType)
          if(event.access=="company"){
            setIndividual(true)
          }
          setOccupied(event.occupied)
          
         
   resolve()
         
        })

        prom.then(() => {
          setOccupied(event.occupied)
          //console.log("reserved: " + reserved)
          //console.log(occupied)
          setIsReserved(reserved)
          setIsLoading(false)
        })

      },[ourEvent])

  
  
    if(!isLoading && typeModal==null){
     console.log(occupied)
  return (
    <div class="max-h-sm rounded-md">
      <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{event.act} | {event.actDate} | {event.actTime} |</h3>
          <h3>status:{event.approved==1?<p class="text-lg font-bold text-green-600">Approved</p>:<p class="text-lg  font-bond font-bold  text-gray-500">Not Approved</p>}</h3>
        </a>
        <h3>{event.access}</h3>
        {
          individual ? <button class="bg-orange-300 p-2 rounded-md"><p class="text-sm">Individual Seats</p></button>:<h3></h3>
        }
        {
          event.reserved == true? <p class="font-bold text-red-500">RESERVED</p>:<p></p>
        }
        
        
        <button class="bg-gray-400 p-2 rounded-md" onClick={()=> {
          console.log("CLICK")
           
          
         const occ=[]
          const prom = new Promise((resolve,reject) => {
           dispatch(setClientRequestModalEvent(event))
           resolve()
          })

          prom.then(() => {
            
          
            dispatch(setClientRequestModalOpen(true))
          }).catch(
            console.log("SET OCC FAILED")
          )
          
        }}>
         Update 
        </button>
        
      </li>
      </div>
    
  )
}if(!isLoading && modalType=="employee"){
  occupied.map((m) => {
    console.log(m)
    console.log("\n\n")
  })
  {
     console.log("EMPLOYEEEE LIST TYPE")
    return (
      <div class="max-h-sm rounded-md">
        <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
          <a href="#" class="flex justify-between items-center">
            <h3 class="text-2xl font-semibold">{event.event} </h3>
          </a>
          <h3>{event.access}</h3>
         
          {
            event.reserved == true? <p class="font-bold text-red-500">RESERVED</p>:<p></p>
          }
          
          <div class="overflow-x-auto">
            <p class="text-lg mt-2">Seats</p>
          {
            
              occupied.map((m) => {
                return <p class="inline">{m+","}</p>
              })
            
          }
          </div>
          
         
          
        </li>
        </div>
      
    )
  }
}

 }

export default ClientBookedReservationItem
