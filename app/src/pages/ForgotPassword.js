import React from 'react'
import { useState,useRef,useEffect } from 'react';
import emailjs from "@emailjs/browser";
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ForgotPassword() {


  
  const[isLoading,setIsLoading]=useState(true)
  const[email,setEmail]=useState("")
  const[employeeActive,setEmployeeActive]=useState(false)
  const[employeeId,setEmployeeId]=useState("")
  const[adminActive,setAdminActive]=useState(false)
  const[possibleNames,setPossibleNames]=useState()
  const[isPossibleNames,setIsPossibleNames]=useState(false)
  const[possibleEmployees,setPossibleEmployees]=useState()
  const[isPossibleEmployees,setIsPossibleEmployees]=useState(false)
  const[correctName,setCorrectName]=useState()
  const [formData, setFormData] = useState();
  const forgetForm = useRef();

  useEffect(() =>{

    const prom=new Promise((resolve,reject) =>{
      setFormData({
        
          firstname:"",
          lastname:"",
          email:"",
          message:""
          
        
      })
      resolve()
    })

    prom.then(() =>{
      setIsLoading(false)
    })

  },[])

  async function sendEmail(form) {
    console.log(form.current);
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
          console.log(result);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  if(!isLoading){
  return (
    <div className='pageContainer'>
    <header>
      <p className='pageHeader'>Forgot your Password</p>
      <div class="flex-col m-3 p-2">
        <p class="text-sm text-gray-500 text-center">No worries!</p>
        <p class="text-sm text-center"> We will send an email to reset your password</p>
      </div>
    </header>
    <main className='m-4'>
      <form  class='mb-10' ref={forgetForm}>
        <input
          type='text'
          name='email'
          placeholder='Email...'
          className='emailInput'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <button class="" onClick={(e)=>{
          e.preventDefault()
          //employee
          if(employeeActive && employeeId==""){
            alert("please enter employee ID:")
          }
          if(employeeActive && employeeId!=""){

            const prom=new Promise((resolve,reject) => {
              axios.get("http://localhost:3002/user/getUserInfo/employee/"+email+"/"+employeeId).then((response) =>{
                console.log(response.data)
                if(response.data.success){
                  setPossibleEmployees(response.data.results)
                  setIsPossibleNames(false)
                  
                 
                  resolve()
                }else{
                  resolve()
                }
              })

            })

            prom.then(() => {
              console.log(possibleEmployees)
              if(possibleEmployees!=null){
                console.log(possibleEmployees)
                setIsPossibleEmployees(true)
              }

            })
        
        }
        //TODO:set up password revovery for client
        if(!employeeActive && !adminActive){

          const prom=new Promise((resolve,reject) => {
            axios.get("http://localhost:3002/user/getUserInfo/"+email).then((response) =>{
              console.log(response.data)
              if(response.data.success){
                setPossibleNames(response.data.results)
                setIsPossibleEmployees(false)
               
                resolve()
              }else{
                resolve()
              }
            })

          })

          prom.then(() => {
            console.log(possibleNames)
            if(possibleNames!=null){
              console.log(possibleNames)
              setIsPossibleNames(true)
            }

          })

        }
        }}>
          Send
        </button>

    

   
      </form>
      <form ref={forgetForm} >
        <input type="text" value={formData.firstname} name="firstname"/>
        <input type="text" value={formData.lastname} name="lastname"/>
        <input type="text" value={formData.email} name="email"/>
        <input type="text" value={formData.message} name="message" onChange={() =>{
          console.log(formData.mesage)
        }}/>
      </form>
      {
        isPossibleEmployees?
        <div class="flex-col p-3 rounded-md w-full m-3 bg-gray-200">
          <div><p class="text-center text-orange-300 text-lg">Are you one of these employees?</p></div>
          <div>
          {
            possibleEmployees.map((n) => {
              console.log(n.last)
              return<button key={n.id} class="bg-gray-400 rounded-md p-3 m-2 "><p class="text-white" onClick={() => {


                const prom=new Promise((resolve,reject) =>{
                  console.log(email)
                  setCorrectName({firstname:n.firstname,last:n.lastname})
                  setFormData({
                    firstname:n.firstname,
                    lastname:n.lastname,
                    email:email,
                    message:`Please use the following link to reset your password: http://localhost:3000/reset-password/${n.id}/${n.email}/${n.firstname}/${n.lastname}`
  
                  })
                  resolve()

                })

                

                prom.then(() =>{
                  console.log(formData)
                  const prom1 =new Promise((resolve,reject) => {
                    if(formData.fistname != ""){
                      console.log(formData)
                      sendEmail(forgetForm)
                    }
                  })
                })
           
               
              }}>{n.firstname} {n.lastname} {n.id}</p></button>
            })
          }
          </div>

        </div>:<div></div>
      }
       {
        isPossibleNames?
        <div class="flex-col p-3 rounded-md w-full m-3 bg-gray-200">
          <div><p class="text-center text-orange-300 text-lg">Is this you?</p></div>
          <div>
          {
            possibleNames.map((n) => {
              return<button class="bg-gray-400 rounded-md p-3 m-2 "><p class="text-white" onClick={() => {
                setCorrectName({firstname:n.first,last:n.last})
              }}>{n.first} {n.last}</p></button>
            })
          }
          </div>

        </div>:<div></div>
      }
      
      <div class="flex">
      {
        employeeActive?
        <div class="passwordInputDiv">
        <button class="m-2 bg-green-400 p-3 rounded-md" onClick={() =>{
          setEmployeeActive(!employeeActive)
        }}>Employee</button>
        <input
          type='text'
          name='email'
          placeholder='Id..'
          className='emailInput'
          onChange={(e) => {
            setEmployeeId(e.target.value);
          }}
          
        />
        </div>
        :
        <div class="passwordInputDiv">
        <button class="m-2 bg-gray-200 p-3 rounded-md" onClick={() =>{
          setEmployeeActive(!employeeActive)
        }}>Employee</button>
       
        </div>
      }
       {
        adminActive?
        <div class="passwordInputDiv">
        <button class="m-2 bg-green-400 p-3 rounded-md" onClick={() =>{
          setAdminActive(!adminActive)
        }}>Admin</button>
       
        </div>
        :
        <div class="passwordInputDiv">
        <button class="m-2 bg-gray-200 p-3 rounded-md" onClick={() =>{
          setAdminActive(!adminActive)
        }}>Admin</button>
       
        </div>
      }
     </div>
    </main>
  </div>
  )
    }
}
