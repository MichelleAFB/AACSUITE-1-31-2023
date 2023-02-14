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
  const[clientAltEmail,setClientAltEmail]=useState()
  const[clientPhone,setClientPhone]=useState()
  const[useAltEmail,setUseAltEmail]=useState(false)
  const dispatch=useDispatch()

  useEffect(() => {
    console.log("*********CLIENT M MODAL RENDEER")
    console.log(ourEvent.event)
      setIsLoading(false)
      setEvent(ourEvent.event)
    

  },[visibility,ourEvent])


  function onMutate(e){
    console.log("mutate")
    if(e.target.name =='phone'){
      setClientPhone(e.target.value)
      console.log(clientPhone)
    }
    if(e.target.name =='email'){
      setClientAltEmail(e.target.value)
      console.log(clientAltEmail)
     
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
                      <input name="phone" type="text" onChange={((e) => {
                      
                        onMutate(e)
                      })} class="ml-2 p-1  rounded-md"/>
                    </div>
                    <div class="flex m-2  align-baseline">
                    
                      
                      {
                      useAltEmail ?   
                      <div class="flex-col align-bottom">
                        <div class="flex">
                          <button class=" h-3 w-3 p-1 rounded-lg bg-blue-700 items-center" onClick={()=> {
                        setUseAltEmail(!useAltEmail)
                      }}>
                          
                        </button>
                        <p class="text-white text-xs m-2">Optional: use alternative email </p>
                     </div>
                     <div>
                     <div class="relative">
                          <label for="email" class="text-white">Email:</label>
                          <input  name="email" placeholder="@gmail.com" type="text" onChange={(e) => {
                              console.log("hello")
                              onMutate(e)
                            
                            }} class="ml-2 p-1  rounded-md"/>
                          </div>
                     </div>
                     </div>: 
                     <div class="flex align-bottom"> 
                      <button class="h-3 w-3 p-1 rounded-lg bg-white " onClick={()=> {
                        setUseAltEmail(!useAltEmail)
                      }}>
                        
                          
                          </button>
                          <p class="text-white text-xs m-2">use alternative email </p>
                        </div>
                    }
                     
                        

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
                      var message
                      if(clientPhone.length!=10){
                        message.append("\nPlease enter valid phone number")
                       
                      }
                     
                      console.log(clientAltEmail)
                      console.log(clientPhone)
                        console.log(primaryEmail)
                        console.log(useAltEmail )
                        if(useAltEmail && clientAltEmail!="" && clientPhone!="" ){
                          axios.post("http://localhost:3002/reservations/reservationRequests",{altEmail:clientAltEmail,firstname:primaryEmail.firstname,lastname:primaryEmail.lastname,email:primaryEmail.email,phone:clientPhone,event:event}).then((response) => {
                            console.log(response.data)
                            if(response.data.success){
                            console.log("CLOSE MODAL")
                            dispatch(setClientModalClose())
                            setIsLoading(true)
                            }
                          })
                        }
                        if(!useAltEmail && clientPhone!="" ){
                          console.log("sending")
                          axios.post("http://localhost:3002/reservations/reservationRequests",{firstname:primaryEmail.firstname,lastname:primaryEmail.lastname,email:primaryEmail.email,phone:clientPhone,event:event}).then((response) => {
                            console.log(response.data)
                          })
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