
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
          
          setIsReserved(reserved)
          setIsLoading(false)
        })

      },[])

      const cldInstance = new Cloudinary({cloud: {cloudName: 'michelle-badu'}});



// Fetch images from the web without uploading them


const im={url:event.images}
const myImage = new CloudinaryImage("v1674517181/665-36a61726a0.t_pixyfz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
      console.log(typeof(event.act))
  
  
      function getImage(){
    const act=event.act
    if(act.toUpperCase().includes("SZA")){
      return new CloudinaryImage("v1674517181/665-36a61726a0.t_pixyfz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.toUpperCase().includes("ADAM SANDLER")){
      return new CloudinaryImage("v1675375546/AAC/Adam_Sandler_g8yicm.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.includes("Stars")){
      if(act.toUpperCase().contains("LIGHTENING")){
        return new CloudinaryImage("v1674517186/Tampa-Bay-Lightning-2e7b1b3175_ezdf4n.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
      }
      if(act.toUpperCase().includes("GOLDEN")){
         return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));

      }
      if(act.upperCase().includes("SUNS")){
        return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));

      }
    }
    if(act.toUpperCase().includes("MADONNA")){
      
      return new CloudinaryImage("v1674517182/MADONNA-320-8d93579a45_ehsi3e.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.toUpperCase().includes("TROUBADOUR")){
      
      return new CloudinaryImage("v1674517181/665-c11668b958.t_xrrmek.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.toUpperCase().includes("NCAA")){
      
      return new CloudinaryImage("v1674517181/Instagram-ed37f234a9_qqbi6n.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.toUpperCase().includes("DISNEY")){
      
      return new CloudinaryImage("v1674517180/320x320-dba36c2e3a_l7wbhr.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(200));
    }
  }
  
if(!isLoading && typeModal==null){
 
  const myImage=getImage()
 
   
  return (
    <div class="max-h-sm rounded-md">
      <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time} |</h3>
        </a>
        <h3>{event.access}</h3>
        <div class="justify-center m-3">
          <AdvancedImage cldImg={myImage}/>
        </div>
        {
          individual ? <button class="bg-orange-300 p-2 rounded-md"><p class="text-sm">Individual Seats</p></button>:<h3></h3>
        }
        {
          event.reserved == true? <p class="font-bold text-red-500">RESERVED</p>:<p></p>
        }
        <div class="flex justify-center m-3 ">
          
        </div>
        
        <button class="bg-gray-400 p-2 rounded-md" onClick={()=> {
          console.log("CLICK")
           
          
         const occ=[]
          const prom = new Promise((resolve,reject) => {
            resolve()
          })

          prom.then(() => {  
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
