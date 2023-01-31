import React, { useEffect,useRef,useMemo } from 'react'
import {useState} from 'react'
import EventModal from './EventModal'
import * as actionTypes from '../redux/eventModal/eventModal-action'

import {useDispatch,useSelector,connect} from 'react-redux'
import {setModalEvent,setModalOpen,setModalEventOccupied} from '../redux/eventModal/eventModal-action'
import { setEmployeeModalOpen,setEmployeeModalEvent} from '../redux/employee/employeeModal-actions'



import ReactDOM from 'react-dom'
import axios from 'axios'


 function EventListItem({modalType,event}){

    const visible= useSelector(state => state.showModal.visibilty)
    const [visibility,setVisibility]=useState(visible)
   
    console.log("**************************EVENTLIST ITEM RERENDER**********")
    const dispatch= useDispatch()
    const [ourEvent,setOurEvent]=useState(event)
    const [individual,setIndividual]=useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const[isReserved,setIsReserved] =useState(false)
    const [typeModal,setTypeModal] =useState()
    
    const eve=useRef(event)
      //console.log(eve)
      useEffect(() => {
        
        var reserved=false
        const prom = new Promise((resolve,reject) => {
          setTypeModal(modalType)
          if(event.access=="company"){
            setIndividual(true)
            
          }
          axios.get("http://localhost:3002/reservations/approvedReservations").then((response) => {
          var reserved= response.data
          console.log(response.data)
            reserved.map((r) => {
      if(r.eventId == event.id && r.approved==1){
        console.log(r)
        reserved=true
        console.log(isReserved)

        }
     })
    resolve()
    })
    
   resolve()
         
        })

        prom.then(() => {
          console.log("reserved: " + reserved)
          setIsReserved(reserved)
          setIsLoading(false)
        })

      },[ourEvent])

  
  
    if(!isLoading && typeModal==null){
     
  return (
    <div class="max-h-sm rounded-md">
      <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time} |</h3>
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
            /*axios.get("http://localhost:3002/sendOccupiedToFront").then((resp) => {
              const res=resp.data

              res.map((e) => {
                if(e.actID==event.id){
                  occ.push(e)
                }
              })
              console.log("NEWWW IN EVENTMODAL")
              dispatch(setModalEventOccupied(occ))
              dispatch(setModalEvent(event))
               
              resolve()
            })
            */

            dispatch(setModalEventOccupied(occ))
            dispatch(setModalEvent(event))
             
            resolve()
          })

          prom.then(() => {
            
          
            dispatch(setModalOpen(true))
            
            
          }).catch(
            console.log("SET OCC FAILED")
          )
          
        }}>
         Update Access
        </button>
        
      </li>
      </div>
    
  )
}if(!isLoading && modalType=="employee"){
  {
     console.log("EMPLOYEEEE LIST TYPE")
    return (
      <div class="max-h-sm rounded-md">
        <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
          <a href="#" class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time} |</h3>
          </a>
          <h3>{event.access}</h3>
         
          {
            event.reserved == true? <p class="font-bold text-red-500">RESERVED</p>:<p></p>
          }
          
          
          <button class="bg-gray-400 p-2 rounded-md" onClick={()=> {
            console.log("CLICK")
             
            
           const occ=[]
            const prom = new Promise((resolve,reject) => {
              axios.get("https://accserverheroku.herokuapp.com/sendOccupiedToFront").then((resp) => {
                const res=resp.data
  
                res.map((e) => {
                  if(e.actID==event.id){
                    occ.push(e)
                  }
                })
                console.log("NEWWW IN EVENTMODAL")
                dispatch(setModalEventOccupied(occ))
                dispatch(setEmployeeModalEvent(event))
                 
                resolve()
              })
            })
  
            prom.then(() => {
              
              console.log("Setting MODAL")
              dispatch(setEmployeeModalOpen(true))
              
              
            }).catch(
              console.log("SET OCC FAILED")
            )
            
          }}>
           view
          </button>
          
        </li>
        </div>
      
    )
  }
}

 }

export default EventListItem
