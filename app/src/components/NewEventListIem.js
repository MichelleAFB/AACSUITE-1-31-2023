
import adamSandler from './images/Adam_Sandler.jpg'
import React, { useEffect,useRef,useMemo } from 'react'
import {useState} from 'react'
import EventModal from './EventModal'
import * as actionTypes from '../redux/eventModal/eventModal-action'

import {useDispatch,useSelector,connect} from 'react-redux'
import {setModalEvent,setModalOpen,setModalEventOccupied} from '../redux/eventModal/eventModal-action'
import { setEmployeeModalOpen,setEmployeeModalEvent} from '../redux/employee/employeeModal-actions'

//outside
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import axios from 'axios'

import ReactDOM from 'react-dom'

//outside
import { images } from './images'

//assets
import { otherImages,MavsImages,StarsImages } from './imagesLinks'


 function NewEventListItem({event}){

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
    


      useEffect(() => {
        
        var reserved=false
        const prom = new Promise((resolve,reject) => {

          images.map((m) => {
            var ev=event.act.split("-")
            if(ev.includes("Stars")){
              console.log(StarsImages)
              
            }
           
          })
         
         
            //console.log("*******PUBLIC EVENT*******")
            setIndividual(true)
           
        setTimeout(()=> {
          resolve()
        },1000)
       
            
          
         /* if(event.access=="company"){
            console.log("*******COMPANY EVENT*********")
            axios.get("http://localhost:3002/reservations/employee-occupied/"+event.id).then((response) => {
              console.log(response)
              const data=response.data
            })
            setTimeout(() => {
              resolve()
            },1000)
            

          }*/
      
         
        })

        prom.then(() => {
          console.log("reserved: " + reserved)
          setIsReserved(reserved)
          setIsLoading(false)
        })

      },[])

      const cldInstance = new Cloudinary({cloud: {cloudName: 'michelle-badu'}});



// Fetch images from the web without uploading them



const myImage = new CloudinaryImage('v1674517186/Tampa-Bay-Lightning-2e7b1b3175_ezdf4n.jpg', {cloudName: 'michelle-badu'}).resize(fill().width(100).height(150));

  
  
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
        <div>
          <AdvancedImage cldImg={myImage} />
        </div>
        
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

            //dispatch(setModalEventOccupied(occ))
            //dispatch(setModalEvent(event))
             
            resolve()
          })

          prom.then(() => {
            
          
            //dispatch(setModalOpen(true))
            
            
          }).catch(
            console.log("SET OCC FAILED")
          )
          
        }}>
         Update Access
        </button>
        
      </li>
      </div>
    
  )
}if(!isLoading ){
  {
     console.log("EMPLOYEEEE LIST TYPE")
    return (
      <div class="max-h-sm rounded-md">
        <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
          <a href="#" class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time} |</h3>
          </a>
          <h3>{event.access}</h3>
          <img src={adamSandler} alt="photo"/>
          <p>hello</p>
         
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
               // dispatch(setModalEventOccupied(occ))
                //dispatch(setEmployeeModalEvent(event))
                 
                resolve()
              })
            })
  
            prom.then(() => {
              
              console.log("Setting MODAL")
              //dispatch(setEmployeeModalOpen(true))
              
              
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

export default NewEventListItem
