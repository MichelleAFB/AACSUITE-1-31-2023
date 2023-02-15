import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'

function ClientContact() {
  
  const[phone,setPhone]=useState("")
  const[message,setMessage]=useState("")



  console.log(JSON.parse(sessionStorage.getItem('client')).firstname)
  return (
    <body class="flex bg-gray-100 min-h-screen bg-gradient-to-tr from-blue-200">
  
    
  
  
    <main class="p-6 sm:p-10 space-y-6">
      <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between ">
        <div class="mr-6">
          <h1 class="text-4xl font-semibold mb-2">Dashboard</h1>
          <h2 class="text-gray-600 ml-0.5 text-lg">Welcome {JSON.parse(sessionStorage.getItem('client')).firstname}!</h2>
        </div>
        <div class="flex flex-wrap items-start justify-end -mb-3">
         
        </div>
      </div>

      <div class="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div class="p-6 font-semibold border-b border-gray-100">
            <p class="text-center text-xl">Contact</p>
            <div class="form">
              <div class="form-group">
                <p class="text-center m-3">Your Contact Details</p>
              
                  <p class="text-center">{JSON.parse(sessionStorage.getItem('client')).email}</p>
                 
                  <input type="text" class="m-3 bg-gray-200 p-3 rounded-md w-full" placeholder="Phone" onChange={(e) =>{
                      setPhone(e.target.value)
                  }}/>
                  <input type="text" class="m-3 bg-gray-200 rounded-md w-full h-60" placeholder="message" onChange={(e) =>{
                    setMessage(e.target.value)
                  }}/>
                  <button class="m-3 bg-green-400 rounded-md p-3 hover:bg-green-300"  onClick={()=>{
                      if(phone!=null && message!=null){
                        console.log(phone)
                        console.log(message)
                      }
                  }
                  }>Submit</button>
              </div>
              <div class="form-group">
                
              </div>
            </div>
          </div>
          <div class="p-4 flex-grow">
              
          </div>
        </div>


      <section class="grid md:grid-cols-2xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        
      <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
        

      <div class="grid lg:grid-cols-2 md:grid-cols-1">

        <div>
          <div class="flex flex-col-1  items-start justify-center mb-3 p-3 mt-3">
         
              <button class="inline-flex px-5 py-3 text-white bg-orange-600 hover:bg-orange-400 focus:bg-purple-700 rounded-md ml-6 mb-3">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <Link to="/admin-events"> Manage Events</Link>
              
              </button>
          </div>
         TypeList
        </div>


          <div>
            <div class="flex flex-col-1 items-start justify-center mb-3 p-3 mt-3">
        
                <button class="inline-flex px-5 py-3 text-white bg-orange-600 hover:bg-orange-400 focus:bg-purple-700 rounded-md ml-6 mb-3">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <Link to="/admin-reservations-pre">Manage Requests</Link>
                </button>
          </div>
         
          </div>

          </div>
         
        </div>
      </section>
    
     
      <section class="grid gap-6 m-3">
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div>
          <div class="flex flex-wrap items-start justify-end -mb-3">
          <button class="inline-flex px-5 py-3 text-orange-600 hover:text-orange-400 focus:text-purple-700 hover:bg-orange-200 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Manage dashboard
          </button>
          <button class="inline-flex px-5 py-3 text-white bg-orange-600 hover:bg-orange-400 focus:bg-purple-700 rounded-md ml-6 mb-3">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create new dashboard
          </button>
            
           
         
        </div>
          
          </div>
        </div>
      </section>

     
    
    </main>
 
</body>
  )
}

export default ClientContact