import {useEffect,useState} from 'react'
import axios from 'axios'
import {clsx}  from 'clsx'
import selectedEventSlice, {updateSelectedEvent, updateSelectedEventOccupied,resetSelectedSeats,resetSelectedEventOccupied} from '../features/events/selectedEventSlice'
import {useSelector,useDispatch} from 'react-redux'


function Events({id,act,date,occupied,onChange }) {

  const dispatch=useDispatch()
  const reduxEvent=useSelector((state)=> 
    state.selectedEventRedux.selectEvent
  )



  var event={
    id:reduxEvent.id,
    act:reduxEvent.act,
    date:reduxEvent.date,
    occupied:reduxEvent.occupied
  }

  //const events=useSelector((state) => state.selectedEventRedux.allEvents)
  const [allOccupied,setAllOccupied] =useState([])
  const [hasOccupied,setHasOccupied] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [actExist,setActExist] =useState(false)
  const [occupiedRedux,setOccupiedRedux]=useState(true)
  const occup=[]
 // console.log("\n\n\n\n")

  const reduxOccupied=useSelector((state) => state.selectedEventRedux.occupied)
 
  const reduxEvents=useSelector((state) => state.selectedEventRedux.allEvents)
  const [events,setEvents]=useState(reduxEvents.allEvents)

  console.log(reduxEvents)
 


   useEffect(()=>{
    const occupiedArray=[]
    
    const eve= new Promise((resolve,reject) => {
      axios.get('http://localhost:3002/sendOccupiedtoFront').then((response) =>{
      const occ=response.data
      let i=0

      
      
      while(i<occ.length){
        //console.log(i)
        if(occ[i].actID==event.id && !occupiedArray.includes(occ[i].seat)){
          console.log(occ[i].actID + " "+ event.id)
          console.log("MATCH")
          occupiedArray.push(occ[i].seat)
          console.log(occ[i].seat)
          console.log(event)
         
        if(i==occ.length-1){
          //console.log(occupiedArray)
          console.log("done")
          console.log("ATTEMPTING TO BREAK")
          
        }
      }
        i++ 
      }
      resolve()
    })
    })

    eve.then(()=>{
     
      
      setAllOccupied(occupiedArray)
      console.log(occupiedArray)
      setEvents(reduxEvents)
      console.log(events)
      console.log(reduxEvents)
      setIsLoading(false)
      console.log("successful")
      console.log(typeof(events.allEvents))
      
      }  
    ).catch(
      console.log("\n\n\n\n unsuccesful")
    )


   },[])
   

   const change=(e)=>{
    onChange(events.find((event) => event.act === e.target.value))
    console.log("event should have sent" + e.target.value)
    
    var currentEvent=events.find((event) => event.act === e.target.value)
    

    console.log("****CURRENT EVENT***")
    console.log(currentEvent)
  
   }

   var interval = null;    

 




// When you want to cancel it:
//clearInterval(handle);
   
if(!isLoading){

    return (
      <div className="Movies">
        <h1>
          {" "}
          Bin<span className="gold">{"g"}</span>eBoy{" "}
        </h1>
        <h4> Its Movie time! </h4>
  
        <img
          className="motion poster"
          src="https://s3.amazonaws.com/pbblogassets/uploads/2017/07/oz-wicked-witch-poster.gif"
          alt="Girl in a jacket"
        />
  
        <p>
          {" "}
          <label htmlFor="movie">Select your Binge!</label>
        </p>
        <select
          id="event"
          value={event.act}
          onChange={(e)=> change(e)}
        >
          {events.map((event) => (
            <option key={event.act} value={event.act}>
              {event.act} ({event.date})
            </option>
          ))}
        </select>
      </div>
    );
    }
  }
  //events:1665591537772
  //home:1665591538773
      

export default Events