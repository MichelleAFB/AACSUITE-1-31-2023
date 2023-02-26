import React from 'react'
import {useRef,useState,useEffect} from 'react'
import axios from 'axios'
import emailjs from '@emailjs/browser'

function CompanyReq({request}) {

  const[revokeData,setRevokeData]=useState()
  const revokeForm=useRef()
  const[approveData,setApproveData]=useState()
  const approveForm=useRef()

  const[isLoading,setIsloading]=useState(true)



  useEffect(()=>{

    const prom=new Promise((resolve,reject) =>{

     
      axios.get("https://accserverheroku.herokuapp.com/company/getEmployeeInfo/"+request.employeeId).then((response) =>{
  
     
      setRevokeData({
        first:response.data.employee[0].firstname,
        last:response.data.employee[0].lastname,
        email:response.data.employee[0].email,
        subject:"AAC FLAGSHIP SUIT:Reservation cancelled",
        message:"Hello " + request.firstname+". We regret to inform you the reservation recently confirmed has been canceled. Cancellation details: "+ request.act + " | " + request.date+ " | "+ request.time
      })
      setApproveData({
        first:response.data.employee[0].firstname,
        last:response.data.employee[0].lastname,
        email:response.data.employee[0].email,
        subject:"AAC FLAGSHIP SUIT:Reservation approved",
        message:"Hello Employee" + response.data.firstname+". We are please to inform you the reservation request has been approved!. Reservation details: "+ request.act + " | " + request.date+ " | "+ request.time 
      })
  
      })

      if(revokeData!=null && approveData!=null){
        resolve()
      }

    })

    prom.then(()=>{
      if(revokeData!=null && approveData!=null){
        setIsloading(false)
      }
    })
   
  })


  async function sendEmail(form){
    
    console.log("testing emailjs functionality");
    emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        form.current,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result)
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if(!isLoading){
  return (
    <div class="bg-gray-600 flex-col  rounded-sm m-1 p-3">
    <div class="w-full flex"><p class="text-white text-lg">{request.firstname} {request.lastname}</p></div>
    <div class="flex mt-3"><p class="text-white text-xs">Seat: {request.seat}</p></div>
    <div class="flex mt-3">
      {request.approval==0 ? <p class="text-white text-xs font-bold">
                            pending
                        </p>:<p></p>
      }
          {request.approval==1 ? <p class="text-green-600 text-xs font-bold">
                            confirmed
                        </p>:<p></p>
      }
      {request.approval==-1 ?<p class="text-red-600 text-xs font-bold">
                             denied
                        </p>:<p></p>
      }
    </div>
    <div class="flex mt-3">
    {request.approval==0 ? 
            <div>
                     <form ref={revokeForm}>
                     <input name="firstname" class="hidden"  type="text" value={revokeData.firstname}/>
                     <input name="lastname" class="hidden"  type="text" value={revokeData.lastname}/>
                     <input name="email" class="hidden"  type="text" value={revokeData.email}/>
                     <input name="message" class="hidden"  tyoe="text" value={revokeData.message}/>
                     <input name="subject"class="hidden"  type="text" value={revokeData.subject}/>
                     <button class="bg-red-600 p-3 rounded-md m-1" onClick={(e) => {
                         e.preventDefault()
                         alert("denying request for "+ request.act)
                         const prom=new Promise((resolve,reject) => {
                           
                           axios.post("http://localhost:3002/company/revokeOccupiedEmployee/"+request.eventId+"/"+request.employeeId+"/"+request.seat).then((response) =>{
                             console.log(response.data)
                             if(response.data.success){
                               resolve()
                             }
                            
             
                           })
                         })
           
                         prom.then(()=>{
                           const prom1=new Promise((resolve1,reject1) =>{
                           sendEmail(revokeForm)
                           resolve1()
                           })
           
                           prom1.then(() =>{
                             console.log("email sent")
           
                           })
                         })
                         
                         }}>
                           <p class="text-white text-xs"> Deny</p>
                         </button>
                   </form>
        <form ref={approveForm}>
          <input name="firstname" class="hidden"  type="text" value={approveData.firstname}/>
          <input name="lastname" class="hidden"  type="text" value={approveData.lastname}/>
          <input name="email" class="hidden"  type="text" value={approveData.email}/>
          <input name="message" class="hidden"  tyoe="text" value={approveData.message}/>
          <input name="subject"class="hidden" type="text" value={approveData.subject}/>
             
                {
                  request.approved=="0" || request.confirmedApproval==0?  
          <button class="bg-green-600 p-3 rounded-md m-1" onClick={(e)=>{
            e.preventDefault()
            alert("approving request for " + request.act)
            const prom=new Promise((resolve,reject) => {
              
              axios.post("http://localhost:3002/company/approveOccupiedEmployee/"+request.eventId+"/"+request.employeeId+"/"+request.seat).then((response) =>{
                console.log(response.data)
                if(response.data.success){
                  resolve()
                }
               

              })
            })

            prom.then(()=>{
              const prom1=new Promise((resolve1,reject1) =>{
              sendEmail(approveForm)
              resolve1()
              })

              prom1.then(() =>{
                console.log("email sent")
               

              })
            })

                }}>
                  <p class="text-white text-xs"> approve</p>
            </button>:<p></p>
              }
              </form>
      </div>:<p></p>
      }
          {request.approval==1 ? 
                  <div>
                           <form ref={revokeForm}>
                     <input name="firstname" class="hidden"  type="text" value={revokeData.firstname}/>
                     <input name="lastname" class="hidden"  type="text" value={revokeData.lastname}/>
                     <input name="email" class="hidden"  type="text" value={revokeData.email}/>
                     <input name="message" class="hidden"  tyoe="text" value={revokeData.message}/>
                     <input name="subject"class="hidden"  type="text" value={revokeData.subject}/>
                     <button class="bg-red-600 p-3 rounded-md m-1" onClick={(e) => {
                         e.preventDefault()
                         alert("denying request for "+ request.act)
                         const prom=new Promise((resolve,reject) => {
                           
                           axios.post("http://localhost:3002/company/revokeOccupiedEmployee/"+request.eventId+"/"+request.employeeId+"/"+request.seat).then((response) =>{
                             console.log(response.data)
                             if(response.data.success){
                               resolve()
                             }
                            
             
                           })
                         })
           
                         prom.then(()=>{
                           const prom1=new Promise((resolve1,reject1) =>{
                           sendEmail(revokeForm)
                           resolve1()
                           })
           
                           prom1.then(() =>{
                             console.log("email sent")
           
                           })
                         })
                         
                         }}>
                           <p class="text-white text-xs"> Deny</p>
                         </button>
                   </form>

                    </div>:<p></p>
      }
      {request.approval==-1 ? <p class="text-sm bg-gray-100 rounded-sm p-2 hover:bg-green-400 m-2">
                            reinstate
                        </p>:<p></p>
      }
    </div>

  </div>
      )
    }
}

export default CompanyReq