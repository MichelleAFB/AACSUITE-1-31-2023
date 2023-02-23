import React from 'react'
import { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom';
//outside
import axios from 'axios';
import { showTopNavbar } from '../redux/topNavbar/topNavbar-action';

function ResetPassword({handle}) {

  
  const[password,setPassword]=useState("")
  const[confirmPassword,setConfirmPassword]=useState("")

  const navigate=useNavigate()
  const dispatch=useDispatch()

  //use these to send  info to server
  const { id}=useParams()
  const { firstname }=useParams()
  const { lastname }=useParams()
  const { email }=useParams()

  useEffect(()=>{
    

  },[])

  return (
    <div>
        <div className='pageContainer'>
    <header>
      <p className='pageHeader'>Forgot your Password</p>
    
      <div class="flex-col m-3 p-2">
        <p class="text-sm text-center"> Set your new password</p>
      </div>
    </header>
    <main className='m-4'>
      <form  class='mb-10'>
      <input
          type='text'
          name='first'
          placeholder='Password...'
          className='emailInput'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
         
        />
        <input
          type='text'
          name='first'
          placeholder='Password...'
          className='emailInput'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
         
        />
        <button class="bg-green-200 rounded-md p-3" onClick={(e) =>{
          e.preventDefault()
          if(confirmPassword!=null && confirmPassword==password){
         

            const prom=new Promise((resolve,reject) =>{

              axios.post("http://localhost:3002/user/reset-password/employee/"+id+"/"+email+"/"+firstname+"/"+lastname+"/"+password).then((response)=> {
                console.log(response)
                if (response.data.success){
                    console.log(response.data.results)
                    const results=response.data.results
                    alert(results[0].firstname + " "+ results[0].lastname +" your password has been reset!")
                    sessionStorage.setItem('employee',JSON.stringify(results[0]))
                    dispatch(showTopNavbar())
                    resolve()
                    
                }
              })

            })

            prom.then(()=>{
              navigate("/employee-home")
            })
          }
          

        }}>
          Send
        </button>

    

   
      </form>
    </main>
  </div>
    </div>
  )
}

export default ResetPassword