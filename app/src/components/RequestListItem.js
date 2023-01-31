import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import {useState,useEffect} from 'react'
import {setRequestModalOpen,setModalRequest} from '../redux/reservations/requestModal-actions'
import {FontAwesomeIcon}  from '@fortawesome/free-solid-svg-icons'
import { FaHeart,FaCheck} from "react-icons/fa";
import {FiAlertTriangle,FiX } from "react-icons/fi";
import { TfiClose  } from "react-icons/tfi";
import { EmailJS } from '@emailjs/browser'
import { GrFormSubtract } from "react-icons/gr";
function RequestListItem({request}) {

  const visible= useSelector(state => state.requestModal.visibility)
  const [visibility,setVisibility]=useState(visible)
 
  
  const dispatch= useDispatch()
  const [ourRequest,setRequest]=useState(request)
  
  
  
  
    useEffect(() => {

    },[ourRequest])

    function isCurrent(request){
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date();

      let day = date.getDate();
      let year = date.getFullYear();
      let monthIndex = date.getMonth();
      const month = months[monthIndex];
      // console.log(day + " " + month + " " + year)
      const today = {
        month: month,
        day: day,
        year: year,
      };

      const eventdate = request.actDate.split(" ");
          const eventday = eventdate[1].replace(",", "");
          
          const eventDate = {
            month: eventdate[0],
            day: eventday,
            year: parseInt(eventdate[2]),
          };
          if (checkUpdate(eventDate, today, months) != false){
           return true
          }else{
            return false
          }
            
          

    }
    
    function checkUpdate(eventDate, today, months) {
      if(eventDate.year<today.year){
        return false
      }
      if (eventDate.month == today.month && today.day > eventDate.day) {
     
        return false;
      }
    
      if (
        months.indexOf(today.month) > months.indexOf(eventDate.month) &&
        today.year >= eventDate.year
      ) {
       
        return false;
      }else{
        return true
      }
    }

    


  return (
   
    
    <li class={
      isCurrent(request)==true ?" bg-gray-200 mt-4 py-5 border-b px-3 transition ease-in-out delay-150  hover:-translate-y-2 hover:bg-indigo-100  rounded-lg object-contain  ":"mt-4 bg-gray-400 m-3 py-5 border-b px-3 transition hover:bg-indigo-100 rounded-lg object-contain opacity-.5 "}>
        <h3 class="font-bold text-purple-500">Request ID:{request.id}</h3>
        <a href="#" class="flex justify-between items-center">
        
        
          <h3 class="text-lg font-semibold">{request.clientName}</h3>
          
        </a>
        <div class="grid grid-cols-2">
        <div>
        <h3 class="text-green-700">{request.act} | {request.actDate} | {request.actTime}</h3>
        
        <button class="bg-gray-100 p-2 rounded-md transition ease-in-out delay-150   hover:bg-gray-300 "  onClick={()=> {
          console.log("CLICK")
           
          
         const occ=[]
          const prom = new Promise((resolve,reject) => {
            
             
              console.log("NEWWW IN EVENTMODAL")
              
              dispatch(setModalRequest(request))
               
              resolve()
            
          })

          prom.then(() => {
            
            console.log("Setting MODAL")
            dispatch(setRequestModalOpen(true))
            
            
          }).catch(
            console.log("SET OCC FAILED")
          )
          
        }}>
         Update Access<faCamera/>
        </button>
        </div>
        <div class="grid-col justify-end ">
          <div class="flex justify-end">
          {request.approved==1 ? <FaCheck class="m-3 h-8 w-8 transition-opacity duration-75" color="green" />:<h3></h3>}
          {request.approved==-1 ? < FiX class="m-3 h-8 w-8 transition ease-in-out delay-150 "  color="red" />:<h3></h3>}
          {request.approved==0 ? < GrFormSubtract class="m-3 h-8 w-8 transition ease-in-out delay-150"  color="white" />:<h3></h3>}
          </div>
        </div>
        </div>
        
      </li>

  )
}

export default RequestListItem