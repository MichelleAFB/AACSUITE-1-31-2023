import React from 'react'
import {useState,useEffect} from 'react'
import  axios from 'axios'

import {connect} from 'react-redux'

//components
import CompanyEditListItem from './CompanyEditListItem'
import CompanyReqItem from './CompanyReqItem'
function CompanyEditList({reload}) {

  const[events,setEvents]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[filtered,setFiltered]=useState()


  

  useEffect(() => {
    
   
    const eve=[]
    const prom=new Promise((resolve,reject) => {
      
      axios.get("https://accserverheroku.herokuapp.com/company/companyInfoRequests").then((response) =>{
        setFiltered(response.data)
        setEvents(response.data)
        console.log(response.data)
      })
      setTimeout(()=>{
        resolve()
      },1000)
    

    })

    prom.then(() => {
      
      setEvents(eve)
      setIsLoading(false)
      
    })

  },[])

  const[seeSearch,setSeeSearch]=useState(false)
  const[searchWord,setSearchWord]=useState("")


  function readSearchWord(word,searchWord){
    const filterWord=[]
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
  

  function search(e,filtered){

    if(e.target.value==null || e.target.value==""){
      const fil=events
      setFiltered(events)
    }

    const fil=[]

    const prom = new Promise((resolve,reject) => {
      
    setFiltered([])
    events.map((ev) => {
     
    
      const str=e.target.value.toUpperCase()
      const evie=ev.event.act.toUpperCase()
      console.log(evie)
      console.log(str)
      const evieSplit=evie.split(" ")
      
      
      const eve=ev.event.act
      console.log("\n\n")
      console.log(eve)
      //console.log(eve)
      console.log(evie.includes(str))
      if(evie.includes(str)){
        evieSplit.map((o) => {
          if(o.includes(str)){
            //console.log(evie.includes(str))
            console.log(o)
            console.log("string:"+str)
            console.log("event:"+evie)
            console.log("\n\n")
            fil.push(ev.event)
          }
        })
        
      }
    })
    console.log(fil)
      resolve(fil)
    })

    prom.then(() => {
      setFiltered(fil)
      console.log("filtered should be")
      console.log(filtered)
  }).catch(
    console.log("filter not working")
  )   
    
  }

 
  if(!isLoading && events!=null){
  return (
    <div class=" p-2 w-full rounded-md w-200 bg-gray-300 h-200 ">
      <div>
      <input type="text"  class="bg-gray-200 rounded-md p-3 w-full" placeholder="event.." onChange={(e) =>{
        //setSearchWord(e.target.value)
        e.preventDefault()
          search(e,events)
       
      }}/>
     
      </div>
     
      

      <div class="flex m-4  rounded-md   overflow-x-scroll h-400">
        {
            
            events.map((e) => {
             console.log(e)
             
               return  (<div><CompanyReqItem eventId={e.id} event={e.event} requests={e.requests}/></div>)
                  
               
            
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