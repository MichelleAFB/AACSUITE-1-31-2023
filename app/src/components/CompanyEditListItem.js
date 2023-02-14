import React from 'react'
import {useState,useEffect,useRef}from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

//outside
import{toast,ToastContainer} from 'react-toastify'
import emailjs from "@emailjs/browser";
import { reloadPage, reReloadPage } from '../redux/reload/reload-actions'
//components



function CompanyEditListItem({eventId}) {

  const revokeForm=useRef()
 



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



  const[requests,setRequests]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[event,setEvent]=useState()
  
  const[revokeData,setRevokeData]=useState()
  const revokeform=useRef()
  const[approveData,setApproveData]=useState()
  const approveform=useRef()
  console.log(eventId)

  useEffect(() => {

    console.log(eventId)
    const prom=new Promise((resolve,reject)=> {
      console.log(eventId)
      axios.get("http://localhost:3002/company/getEventRequests/"+eventId).then((response) => {
        
        console.log(response.data)
        const r=response.data.results
        setRequests(response.data.results)

        
       
        axios.post("http://localhost:3002/getEventInfo/"+eventId).then((response1) =>{
          //console.log(response1)
            setEvent(response1.data)

            axios.get("http://localhost:3002/company/getEmployeeInfo/"+r[0].employeeId).then((response2) =>{

            console.log(response2)
            //console.log(response1.data[0].act)
            const employee=response2.data.employee[0]
            //console.log(employee.email)
            setRevokeData({
              first:r[0].firstname,
              last:r[0].lastname,
              email:employee.email,
              subject:"AAC FLAGSHIP SUIT:Reservation cancelled",
              message:"Hello " + r[0].firstname+". We regret to inform you the reservation recently confirmed has been canceled. Cancellation details: "+ r[0].act + " | " + response1.data[0].date+ " | "+ response1.data[0].time
            })
            setApproveData({
              first:r[0].firstname,
              last:r[0].lastname,
              email:employee.email,
              subject:"AAC FLAGSHIP SUIT:Reservation approved",
              message:"Hello Employee" + r[0].firstname+". We are please to inform you the reservation request has been approved!. Reservation details: "+ response1.data[0].act + " | " + response1.data[0].date+ " | "+ response1.data[0].time 
            })
            
            setTimeout(() =>{
              resolve()
            },3000)
               

            })
            
        
        })
       
        
      })
    })

    prom.then((r)=>{
      console.log(requests)
        setIsLoading(false)
      
     
    })

  },[eventId])

  
  console.log(approveData)
  const dispatch=useDispatch()

  const[seeMore,setSeeMore]=useState(false)
  
  if(!isLoading && requests!=null){
    console.log(requests)
    console.log(event[0])
  return (

    <div class="w-200 bg-blue-400 w-full overflow-y-scroll w-100 p-3 m-3 rounded-md rounded-md">
      <ToastContainer/>
      
      <p class="text-xl text-center font-bold text-white">{event[0].act} | {event[0].date } | {event[0].time}</p>
      <div >
        <form ref={revokeForm}>
          <input name="firstname" class="hidden"  type="text" value={revokeData.firstname}/>
          <input name="lastname" class="hidden"  type="text" value={revokeData.lastname}/>
          <input name="email" class="hidden"  type="text" value={revokeData.email}/>
          <input name="message" class="hidden"  tyoe="text" value={revokeData.message}/>
          <input name="subject"class="hidden"  type="text" value={revokeData.subject}/>
        </form>
      </div>
      <div class="grid overflow-y-auto">
      {
        requests.map((r) =>{
          return <li class="bg-gray-100 rounded-md p-3 m-2 " key={r.id}>
            <div class="flex-row">
              <div class="flex">
                <p class="text-xs">{r.firstname} {r.lastname} |seat: {r.seat}| </p>
                <div class="ml-1 p rounded-md">
                 {r.approval==0 ?<p class="text-shadow text-xs text-gray-600 font-bold"> pending</p>:<p></p>}
                  {r.approval==1 ?
                 <p class="text-shadow-lg text-xs text-green-700 font-bold">
                  confirmed</p>:<p></p>}
                  {r.approval==-1 ?
                 <p class="text-shadow-lg text-xs text-red-700 font-bold">
                  denied</p>:<p></p>}
                  </div>
            </div>
            <div class="flex">
            <div >
        <form ref={revokeForm}>
          <input name="firstname" class="hidden"  type="text" value={revokeData.firstname}/>
          <input name="lastname" class="hidden"  type="text" value={revokeData.lastname}/>
          <input name="email" class="hidden"  type="text" value={revokeData.email}/>
          <input name="message" class="hidden"  tyoe="text" value={revokeData.message}/>
          <input name="subject"class="hidden"  type="text" value={revokeData.subject}/>
          <button class="bg-red-600 p-3 rounded-md m-1" onClick={(e) => {
              e.preventDefault()
              alert("denying request for "+ event.act)
              const prom=new Promise((resolve,reject) => {
                
                axios.post("http://localhost:3002/company/revokeOccupiedEmployee/"+r.eventId+"/"+r.employeeId+"/"+r.seat).then((response) =>{
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
      </div>
      <form ref={approveform}>
          <input name="firstname" class="hidden"  type="text" value={approveData.firstname}/>
          <input name="lastname" class="hidden"  type="text" value={approveData.lastname}/>
          <input name="email" class="hidden"  type="text" value={approveData.email}/>
          <input name="message" class="hidden"  tyoe="text" value={approveData.message}/>
          <input name="subject"class="hidden" type="text" value={approveData.subject}/>
             
                {
                  r.approved=="0" || r.confirmedApproval==0?  
          <button class="bg-green-600 p-3 rounded-md m-1" onClick={(e)=>{
            e.preventDefault()
            alert("approving request for " + event.act)
            const prom=new Promise((resolve,reject) => {
              
              axios.post("http://localhost:3002/company/approveOccupiedEmployee/"+r.eventId+"/"+r.employeeId+"/"+r.seat).then((response) =>{
                console.log(response.data)
                if(response.data.success){
                  resolve()
                }
               

              })
            })

            prom.then(()=>{
              const prom1=new Promise((resolve1,reject1) =>{
              sendEmail(approveform)
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
          
              </div>
            </div>
            
           
          </li>
        })
      }
        </div>
      </div>
        )
  }

 
}



export default CompanyEditListItem