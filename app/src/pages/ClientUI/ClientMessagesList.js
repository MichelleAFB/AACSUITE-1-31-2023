import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import ClientMessageListItem from './ClientMessageListItem'
import { MessageSharp } from '@material-ui/icons'
function ClientMessagesList() {

  const[seeMessages,setSeeMessages]=useState(false)
  const[messages,setMessages]=useState()
  const[isLoading,setIsLoading]=useState(true)
  
  useEffect(()=>{

    const firstname=JSON.parse(sessionStorage.getItem('client')).firstname
    const lastname=JSON.parse(sessionStorage.getItem('client')).lastname
    const email=JSON.parse(sessionStorage.getItem('client')).email
    

    const mess=[]
    const prom=new Promise((resolve,reject) =>{
      sessionStorage.removeItem('messages')
      axios.get("http://localhost:3002/reservations/sorting/"+firstname+"/"+lastname+"/"+email).then((response) =>{
        console.log(response.data.length)
        setMessages(response.data)
        response.data.map((m)=>{
          mess.push(m)
          if(mess.length==response.data.length){
            resolve()
          }
        })
        console.log(mess)
       // setMessages(respon.e.data)
        sessionStorage.setItem('messages',JSON.stringify(response.data))
        
        
      })
    })

    prom.then(()=>{
      
      const prom1=new Promise((resolve1,reject1)=>{
        console.log(mess)
        console.log("mess")
        setMessages(mess)
        
        setTimeout(()=>{
          
            resolve1()
        },500)
        
      })
      
        prom1.then(()=>{
          
          if(messages!==null){
            console.log("all messages")
            console.log(messages)
            setIsLoading(false)
          }
        })

      
    })

  },[])

  

if(!isLoading && messages!=null){
  return (
    <div class="bg-white p-3 rounded-md">
      <button class="bg-green-200 p-3 w-full rounded-sm m-2" onClick={()=>{
      setSeeMessages(!seeMessages)
    }}>Messages</button>
    {seeMessages ? 
    <div class="flex-col p-3 bg-blue-200 rounded-sm justify-center">
      {
        messages.map((m) =>{
         console.log(m)
            
          return <div class="justify-center p-1">
           
                  <ClientMessageListItem threadId={m.threadId}/>
            </div>
          
          
        })
      }

    </div>:<div>No messages</div>
    }
    </div>
    	
    )
  }
}

export default ClientMessagesList