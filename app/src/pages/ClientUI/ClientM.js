import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import { setClientModalClose } from "../../redux/client/clientModal-actions";
import { reloadPage } from "../../redux/reload/reload-actions";
import { motion } from "framer-motion";


function ClientM({visibility,ourEvent}) {

  const[event,setEvent]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[clientInfo,setClientInfo]=useState({phone:'',email:''})
  console.log(visibility)
  const dispatch=useDispatch()

  useEffect(() => {
    console.log("*********CLIENT M MODAL RENDEER")
    console.log(ourEvent.event)
      setIsLoading(false)
      setEvent(ourEvent.event)
    

  },[visibility,ourEvent])


  const onMutate=(e) => {
    if(e.target.name =='phone'){
      setClientInfo(phone => e.target.value)
    }
    if(e.target.name =='email'){
      setClientInfo(email=> e.target.value)
     
    }
  }

  console.log(ourEvent)
  if(!isLoading && visibility){
    console.log(isLoading)
  return (
    <div class='bg-gray-200'>
      <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50 justify-items-center'>
      <main id='content' role='main' class='w-full max-w-md mx-auto '>
              <div class=' bg-white-100 p-10  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-5' flex-col>
                <div class="flex-col p-4">
                  <p class="text-white text-center font-bold text-lg">{event.act}</p>
                  <p class="text-white text-center  text-md">{event.date}</p>
                  <p class="text-white text-center  text-md">{event.time}</p>
                </div>
                <div class="flex-col items-center justify-items-center">
                  <p class="text-white text-center text-sm">(Optional) Provide extra contact information</p>
                  <div class="flex-col p-4">
                    <div class="relative m-2">
                      <label for="phone" class="text-white">Phone:</label>
                      <input type="text" onChange={((e) => {
                        console.log(e.target.value)
                      })} class="ml-2 p-1  rounded-md"/>
                    </div>
                    <div class="relative m-2">
                      <label for="phone" class="text-white">Email:</label>
                      <input  name="email" placeholder="@gmail.com" type="text" onChange={((e) => {
                        console.log(e.target.value)
                        console.log(e.target.name)
                      })} class="ml-2 p-1  rounded-md"/>
                    </div>
                  </div>
                  <button class="bg-gray-600 p-2 rounded-md m-2" onClick={() => {
                    console.log("CLOSE MODAL")
                      dispatch(setClientModalClose())
                      setIsLoading(true)
                  }}><p class="text-white">Exit</p></button>
                  <button class="bg-gray-600 p-2 rounded-md m-2" onClick={() => {
                    console.log("CLOSE MODAL")
                    const primaryEmail=JSON.parse(sessionStorage.getItem("client"))
                    console.log(primaryEmail.email)
                    var email
                    if(clientInfo.email!=""){
                      console.log(clientInfo.email)
                     
                        console.log("info:"+primaryEmail+" "+clientInfo.phone+ " "+ clientInfo.email)
                 

                    }
                     /* const prom= new Promise((resolve,reject) => {
                        axios.post("http://localhost:3002/reservationRequests",{email:JSON.parse(sessionStorage.get('client')),
                      })
                      
                      })
                      */
                  }}><p class="text-white">Confirm</p></button>
                  
                </div>
          </div>
          <p>happy</p>
          </main>
      </div>
    </div>

  )
                }
}


const mapStateToProps = (state, props) => {
  const vis = state.showClientModal.visibility;
  const event = state.showClientModal.event;
  console.log("event:")
  console.log(event);
  const user = state.user.user;
  return {
    user: user,
    visibility: vis,
    ourEvent: event,
  };
};
export default connect(mapStateToProps)(ClientM)