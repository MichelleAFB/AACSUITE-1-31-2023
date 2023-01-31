import React, { useEffect } from 'react'
import {useState} from 'react'
import EventModal from './EventModal'
import * as actionTypes from '../redux/eventModal/eventModal-action'

import {useDispatch,useSelector,connect} from 'react-redux'
//import {setModalEvent,setClientModalOpen,setClientModalClose} from '../redux/client/clientModal-actions'
import {setModalEvent,setModalOpen,setModalEventOccupied} from '../redux/eventModal/eventModal-action'



import ReactDOM from 'react-dom'
import axios from 'axios'

/*
export default class EventListItem extends React.Component{

  constructor(props){
    console.log("********PROPS")
   
    this.state={
      mount:true
    }

    this.mountItem = () => this.setState({mount:true})

    this.unmountItem = () => this.setState({mount:false})
  }

  componentDidMount(){
    console.log("mounted")
  }


  render(){

    return  <div>
      <button onClick={this.unmountItem} disabled={!this.state.mount}>unmount</button>
      <button onClick={this.mountItem} disabled={this.state.mount}>mount</button>
      <li class="py-5 border-b px-3 transition hover:bg-indigo-100 rounded-md">
      <a href="#" class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{props.event.act} | {props.event.date} | {props.event.time}</h3>
        <p class="text-md text-gray-400">23m ago</p>
      </a>
      <button class="bg-gray-400 p-2 rounded-md" onClick={handleClick()}>
       Update Access
      </button>
      
      </li>
    </div>
  }

  
}
*/








import { useRef } from 'react'
 function ClientEventListItem({event}){

    
   
    
    const dispatch= useDispatch()

    const visible= useSelector(state => state.showModal.visibilty)
   
  
    //const [ourEvent,setOurEvent]=useState(event)
    const [individual,setIndividual]=useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const[isReserved,setIsReserved] =useState(false)
   const[ourEvent,setOurEvent]=useState()
    
    
      //console.log(eve)
      useEffect(() => {
        setOurEvent(event)
        var reserved=false
        
      setIsLoading(false)

      },[])

  
  
    if(!isLoading){
  return (
    <div class="object-contain " onMouseEnter={()=> {
      
    }}>
      <li class="py-5 border-b px-3 transition hover:bg-indigo-100 rounded-md ">
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time}</h3>
        </a>
       
        <button class="bg-gray-400 p-2 rounded-md" onClick={()=> {
          
          const prom = new Promise((resolve,reject) => {
            dispatch(setModalEvent(event))
           // dispatch(setClientModalOpen())

            
              resolve()
         
          })

          prom.then(() => {
            console.log("event item should be set for modal" )
            //TODO: CHANGE CLIENTMODAL REDUCE,SEPARATE REQUEST MODAL FROM REGULAR
              dispatch(setModalOpen())
            

          })
        }}>
         Request Reservation Access
        </button>
        
      </li>
      </div>
    
  )
  }
 }



export default ClientEventListItem