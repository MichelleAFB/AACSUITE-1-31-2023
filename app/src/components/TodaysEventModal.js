import React from 'react'
import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import EventListItem from './EventListItem'

function TodaysEventModal({event}) {

//  const[event,setEvent] =useState(event)
  const[isLoading,setIsLoading] =useState(true)
  const [visibility,setVisibility] = useState(false)

  const todaysEvent=useSelector((state) => state.showTodaysEvent.todaysEvent)

  const todaysVisibility=useSelector((state) => state.showTodaysEvent.visibility)
  console.log(visibility)
  console.log(todaysEvent)

  useEffect(() => {

    const prom= new Promise((resolve,reject) => {
     
   
        console.log(todaysEvent)
        //setEvent(todaysEvent)
        setVisibility(true)
        resolve()
      
    })

    prom.then(() =>{
      console.log(event)
      setIsLoading(false)
    }).catch(
      console.log("todays Event modal fail")
      
    )

  },[todaysEvent])

  console.log(event)
  if(isLoading!=true && visibility==true)
  return (
    <div>
    <li class="py-5 border-b px-3 transition hover:bg-indigo-100 rounded-md">
      <a href="#" class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">Todays Events</h3>
        <p class="text-md text-gray-400"></p>
      </a>
      <div>
        <div class="py-5 border-b px-3 transition hover:bg-indigo-100 rounded-md">
          
          
          <EventListItem event={event}
        />        
      </div>
      </div>
      
      
    </li>
    </div>
  )
}

export default TodaysEventModal