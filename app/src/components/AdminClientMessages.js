import React from 'react'
import axios from 'axios'
import {useEffect,useState}from 'react'
import { ChangeHistorySharp } from '@material-ui/icons'
function AdminClientMessages() {

  const [messages,setMessages]=useState()
  const[isLoading,setIsLoading]=useState(true)

  useEffect(() =>{
    const prom=new Promise((resolve,reject) => {
        axios.get("https://accserverheroku.herokuapp.com/reservations/client-messages").then((response) =>{
          console.log(response.data.messages)
          setMessages(response.data.messages)
          resolve(messages)
        })
    })

    console.log(prom)
  
    console.log(prom.then((res) =>{
      console.log(res)
    }))
    prom.then(() =>{
      console.log(messages)
      setIsLoading(false);
    })
  },[])



  const[message,setMessage]=useState()
if(!isLoading){

  function randomFunc(){
    var obj1 = {name:"Vivian", age:45};
  
    return function(){
      console.log(obj1.name + " is "+ "awesome"); // Has access to obj1 even when the randomFunc function is executed
  
    }
  }
  
  var initialiseClosure = randomFunc(); // Returns a function
  
  
  initialiseClosure(); 
  return (
    <div class="p-4 rounded-md m-3 bg-gray-200 p-3 rounded-md overflow-y-scroll w-[80vw] h-[60vh]">
      <h1>Messages</h1>
      
      {
      messages.map((m) =>{
         if(m.message!=""){return  (
          <div class="bg-gray-100 p-3 m-3 rounded-md reverse">
            <div class="m-3 mb-1"><p class="text-gray-500">{m.firstname} {m.lastname} </p></div>
            <div class="m-3 mb-1"><p class="text-gray-500">
               {m.phone} </p></div>
               <div class="m-3"><p class="text-gray-500">
                 {m.email}</p>
                 </div>
            <div class="flex-col bg-gray-400 p-3 rounded-sm m-3">
               <p class="font-bold text-white">{m.message}</p>
             
               </div>
               <div class="flex bg-gray-600 p-3 rounded-sm m-3">
                  <input type="text" cols="40" rows="8" class="w-full p-3 rounded-sm " onChange={(e) =>{
                  setMessage(e.target.value)
                  }}/>
                  <button class="bg-green-400 p-3 rounded-sm"
                    onClick={() =>{
                      const prom=new Promise((resolve,reject) =>{
                        if(message!=""){
                        axios.post("https://accserverheroku.herokuapp.com/reservations/messages-to-client",{messageInfo:m,message:message}).then((response) =>{
                          console.log(response)
                        })
                      }
                      })
                    }}>
                    Send
                  </button>
               </div>
          </div>
        
         )}
      }) 
      }
    </div>
   )
  }
}

export default AdminClientMessages