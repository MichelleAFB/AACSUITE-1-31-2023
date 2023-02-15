import React from 'react'
import {useState,useEffect} from 'react'
import  axios from 'axios'

import {connect} from 'react-redux'

//components
import CompanyEditListItem from './CompanyEditListItem'

function CompanyEditList({reload}) {

  const[events,setEvents]=useState()
  const[isLoading,setIsLoading]=useState(true)


  

  useEffect(() => {
    
   
    const eve=[]
    const prom=new Promise((resolve,reject) => {
      
      axios.get("http://localhost:3002/company/employee-occupied").then((response) => {
       console.log(response.data)
       const ev=response.data
        ev.map((m) => {
          if(!ev.includes(m.eventId)){
            console.log(m)
            axios.post("http://localhost:3002/getEventInfo/"+m.eventId).then((response2) =>{
              eve.push({id:m.eventId,event:response2.data}) 
            })
           
            
          }
        })

        
      })
      setTimeout(()=>{
        resolve()
      },1000)
    

    })

    prom.then(() => {
      setEvents(eve)
      setIsLoading(false)
      
    })

  },[reload])

  const[seeSearch,setSeeSearch]=useState(false)
  const[searchWord,setSearchWord]=useState("")


  function readSearchWord(word,searchWord){
    console.log("\n\n\n\n")
    console.log(word)
    const event=word.split(" ")
    console.log("EVENT")
    console.log(event)
    console.log("SEARCHWORD")
    console.log(searchWord)
    
    var exist=false
    const prom=new Promise((resolve,reject) => {
      event.map((e) => {
        console.log(e.includes(searchWord))
        if(e.toUpperCase().includes(searchWord.toUpperCase())){
          console.log("\n\nMATCH\n\n")
          exist=true
          resolve(exist)
        }
      
      })

      setTimeout(()=>{
        resolve(exist)
      },3000)
     

    })

    prom.then((exist) => {
      console.log("searchWord:"+searchWord)
      console.log("word:"+word)
      console.log("exist:"+exist)
      return exist
    })
    
  }
  

 
  if(!isLoading && events!=null){
  return (
    <div class="flex-col p-2 w-full rounded-md ">
      <div>
      <input type="text"  class="bg-gray-200 rounded-md p-3 w-full" placeholder="event.." onChange={(e) =>{
        setSearchWord(e.target.value)
        console.log(searchWord)
        if(searchWord!=null){
          setSeeSearch(true)
        }
      }}/>
     
      </div>
     
      

      <div class="flex m-4  rounded-md  overflow-x-scroll h-400">
        {
            
            events.map((e) => {
             console.log(e)
             
               return (
                <CompanyEditListItem eventId={e.id}/>
                  
               )
            
            })
          }
          </div>
        
    </div>
  )
  }
}

const mapStateToProps = (state,props) => {
  const reload=state.reloadPage.reload
  console.log(reload)
  return{
    reload:reload
  }
 }

export default connect(mapStateToProps)(CompanyEditList)