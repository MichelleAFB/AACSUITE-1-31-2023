import axios from 'axios'
import React from 'react'
import {useEffect,useState} from 'react'

function ClientMessageListItem({threadId}) {

  //console.log(message)
  const[messages,setMessages]=useState()
  //const[threadId,setThreadId]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[show,setShow]=useState(false)
  const[event,setEvent]=useState()
  const[even,setEven]=useState(1)
  const[messageTo,setMessageTo]=useState()
  const[ourMessage,setOurMessage]=useState()

  //console.log(message)
  useEffect(()=>{

    var mes
    var eve
    const prom1=new Promise((resolve1,reject) =>{
      const message=JSON.parse(sessionStorage.getItem('messages'))
      const mess=message.map((m)=>{
        if(m.threadId==threadId){
          return m.messages
        }
      })
      console.log(mess[0])
      setMessages(mess[0])
      console.log(mess[0])
       mes=mess[0]
      
      console.log(eve)
      console.log(mes)

      if(mes!==null  ){
        resolve1()
      }
    })

    prom1.then(()=>{
      const prom=new Promise((resolve,reject) =>{
       
        eve=mes[0].eventId
        console.log(eve)
        
    
        setTimeout(()=>{
  
          axios.post("http://localhost:3002/getEventInfo/"+eve).then((response) =>{
          
          setEvent(response.data[0])
          setTimeout(()=>{
            
             resolve()
           },2000)
        })
  
        },100)
        
        
        
        
      })
  
      prom.then(()=>{
        //console.log(event)
        //console.log(messages)
        //console.log(threadId)
        if(messages!=null&& event!=null){
         setIsLoading(false)
        }
        
      })

    })
   

  },[])
 

  


 
  if(!isLoading && messages!=null){

    
    
    /**
     * <div class="flex justify-end">
                     
                    <div class="flex p-2 rounded-sm w-1/4 bg-white m-2">{messages[1].message}</div>
                  </div>
     */

                  /**
                   * class="flex-col [&>*:nth-child(odd)]:bg-red-500 [&>*:nth-child(odd)]:flex [&>*:nth-child(odd)]:justify-start [&>*:nth-child(even)]:bg-blue-500 [&>*:nth-child(even)]:flex [&>*:nth-child(even)]:justify-end
                   */

    /**
     *   [&>*:nth-child(odd)]:bg-blue-300
                  [&>*:nth-child(odd)]:flex
                  [&>*:nth-child(odd)]:justify-start
                 [&>*:nth-child(even)]:bg-gray-200 
                 [&>*:nth-child(even)]:flex 
                 [&>*:nth-child(even)]:justify-end"  
     */
  return (
    <div>
      
      <div class="bg-green-200 p-3 rounded-sm w-full">
      
   
        <div>
        
          
          <div class="flex-col justify-end">
                <div class="flex">{event.act+" "}</div>
                <div class="
                 bg-white 
                 overflow-y-scroll w-[80vw] h-[40vh]"
                  >
                  {messages.map((r) =>{
                   
                  
                   
                      
                  <div class="flex-col p-2 rounded-sm m-2 bg-blued-200 ">
                      <div class="flex-col">
                       
                        <div class="flex"><p class="text-sm">{r.dateSent}| {r.timeSent}</p></div>
                        <div class="flex"><p class="text-sm"></p></div>
                        <div class="bg-white p-2 mt-3">
                          <p class="text-lg">{r.message}</p>
                  
                        </div>
                  
                      
                  </div>
                </div> 
                    
                 

                  })
                  
                
                  }
                  <div class="flex p-2 rounded-sm m-2 bg-green-200">
                      <input type="text" cols="40" rows="8" class="w-full p-3 rounded-sm " onChange={(e) =>{
                        setMessageTo(e.target.value)
                  }}/>
                  </div>

                  
                  
            </div>
          </div>
        
        </div>
        
       

      </div>
    </div>
        )
      }
}

export default ClientMessageListItem