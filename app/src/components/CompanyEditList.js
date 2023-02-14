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
            eve.push(m.eventId) 
            
          }
        })

        
      })
      setTimeout(()=>{
        resolve()
      },500)
    

    })

    prom.then(() => {
      setEvents(eve)
      setIsLoading(false)
    })

  },[reload])

  const[seeMore,setSeeMore]=useState(false)
  

 
  if(!isLoading && events!=null){
  return (
    <div class="flex p-2 w-full rounded-md ">
      
      

      <div class="flex nowrap max-w-screen m-4  rounded-md overflow-x-auto  ">
        {
            
            events.map((e) => {
             console.log(e)
             
               return (
                <CompanyEditListItem eventId={e}/>
                  
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