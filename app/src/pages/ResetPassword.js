import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function ResetPassword() {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirmPassword,setConfirmPassword]=useState("")

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
          value={email}
        />
        <input
          type='text'
          name='first'
          placeholder='Password...'
          className='emailInput'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          value={email}
        />
        <button class="bg-green-200 rounded-md p-3" onClick={() =>{
          if(confirmPassword!=null && confirmPassword==password){
            axios.get("https://accserverheroku.herokuapp.com/user/reset-password/employee/").then((response)=> {
              if (response.data.success){

              }
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