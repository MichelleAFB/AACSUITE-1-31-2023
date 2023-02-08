import React from 'react'

import {useState,useEffect} from 'react'
import { connect,useDispatch } from 'react-redux';
import { ReactDOM } from 'react';

//outside
import axios from 'axios';


function ReservedPublic({ourEvent,visibility,reserved}) {

  const[clientRequests,setClientRequests]=useState()
  const[isRequested,setIsRequested]=useState(false)
  const[isLoading,setIsLoading]=useState(true)
  const[event,setEvent]=useState()

  useEffect(() =>{
    const occ=[]
    var isrequested=false

    console.log(reserved)
   /* const prom=new Promise((resolve,reject) => {
      axios.get("https://accserverheroku.herokuapp.com/reservations/reservationsandrequests/public/" +
      event.id).then((response) => {

        if(response.data.success==true){
          if(response.data.request.length>0){
            const requests=response.data.requests
            isrequested=true
            request.map((m) => {
              occ.push(m)
            })
            resolve(occ,isrequested)
          }
        }
      })
    })

    prom.then((occ,isrequested) => {
      const prom1=new Promise((resolve1,reject1) => {
        setClientRequests(occ)
        setIsRequested(isrequested)
        

        resolve1()
      })

      prom1.then(() =>{
        console.log("client requests")
        console.log(clientRequests)
        console.log("isrequested")
        console.log(isRequested)
        setIsLoading(false)
      })
    })
    */
   if(visibility){
    const prom= new Promise((resolve,reject) => {
      setEvent(ourEvent)
      resolve(event)
    })

    prom.then((event) => {
      console.log(event)
      if(visibility){
        setIsLoading(false)
      }
     
    })
   }


  },[visibility,ourEvent])

if(!isLoading  ){
  return ReactDOM.createPortal(
    <div class="h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50">{ourEvent.publicEvent.act}</div>
    ,document.getElementById('portal'))
  }
}

const mapStateToProps = (state, props) => {
  const vis = state.showModal.publicReservedVisibility;
  const reserved = state.showModal.publicReserved;
  const event=state.showModal.publicEvent

  console.log("event")
  console.log(event)
  console.log("reserved")
  console.log(reserved);
  return {
    visibility: vis,
    reserved:reserved,
    ourEvent: event,
  };
};
export default ReservedPublic