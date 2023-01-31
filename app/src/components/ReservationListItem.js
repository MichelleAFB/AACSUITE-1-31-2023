import React from 'react'
import {useEffect,useState} from 'react'
import { setModalRequest, setRequestModalOpen } from '../redux/reservations/requestModal-actions'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function ReservationListItem({reservation}) {

  const [reso,setReso]=useState()
  const [isLoading,setIsLoading]=useState(true)
  const[seeMore,setSeeMore]=useState(false)


  useEffect((reservation) => {

    const prom = new Promise((resolve,reject) => {

      
      setReso(reservation)
      console.log(reso)
      
        resolve()
     
     
    })

    prom.then(()=> {
      console.log("success setting reso")
      console.log(reso)
      setIsLoading(false)
    }).catch(
      console.log("failed setting reservationlistitem")
    )
  },[])

  const dispatch=useDispatch()

  function isCurrent(reservation){
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

    const eventdate = reservation.actDate.split(" ");
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

  if(!isLoading){
  
  return (
    
    <li class={
      isCurrent(reservation)==true ?"bg-gray-200 m-3 py-5 border-b px-3 transition hover:bg-indigo-100 rounded-lg object-contain  ":"bg-gray-400 m-3 py-5 border-b px-3 transition hover:bg-indigo-300 rounded-lg object-contain opacity-.5 "}>
        <div class="object-contain">
        <h3 class=" font-bold text-purple-500">Reservation ID:{reservation.id}</h3>
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{reservation.clientName}</h3>
        </a>
        <h3 class="text-green-700">{reservation.act} | {reservation.actDate} | {reservation.actTime}</h3>
        <button class=" bg-orange-300 p-2 rounded-md" onClick={() => {
          setSeeMore(!seeMore)
          const prom = new Promise((resolve,reject) => {
            dispatch(setModalRequest(reservation))
            resolve()
        })

        prom.then(() => {
          dispatch(setRequestModalOpen())
        })
        }}>
          Edit 
        </button>
        {seeMore ? <div class="flex-cols p-3">
          <div class="col">
            <p><span class="text-xl">Act: </span>{reservation.act}</p>
          </div>
          <div>
          <p><span class="text-xl">Date:</span> {reservation.actDate}</p>
         </div>
         <div>
          <p><span class="text-xl">Time: </span> {reservation.actTime}</p>
         </div>
      
        </div>:<p></p>}
        
        </div>
      </li>
  
  )
  }
}

export default ReservationListItem