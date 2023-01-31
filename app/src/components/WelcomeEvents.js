import {useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {updateSelectedEvent, updateSelectedEventOccupied} from '../features/events/selectedEventSlice'
import {clsx}  from 'clsx'
function 
WelcomeEvents({id,act,date,occupied, onChange }) {
  
  console.log("from EVENTS "+act+ " id:"+id)
  const event={
    id:id,
    act:act,
    date:date,
    occupied:occupied
  }
  const [allOccupied,setAllOccupied] =useState([])
  const [hasOccupied,setHasOccupied] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [actExist,setActExist] =useState(false)
  const [events,setEvents]=useState([])
  const [selectedEvent,setSelectedEvent] =useState()
  const occup=[]
 // console.log("\n\n\n\n")
 /*

 const selectedState = useSelector((state) => state.selectedEvent)
 console.log("Selected state event")
 console.log(selectedState)
 const dispatch=useDispatch()
*/

   useEffect(()=>{
    const occupiedArray=[]


    ////////////////////////////////////////
    axios.get('http://localhost:3002/sendEventstoFront').then(r => {
      setEvents(r.data)
      const ev=events[0]
      console.log("************USEEFFECT IN WELCOMEEVENTS********")
      console.log("check same:"+events[0])
      console.log("check same:"+r.data[0])
      /*setSelectedEvent({
        id:id,
        act:act,
        date:date,
        occupied:occupied
        
      })
      */
      //console.log(r.data)
     // setSelectedEvent({act:ev.act, date:ev.date, time:ev.time, //occupied:ev.occupied, id:ev.id})

    },[])

    /////////////////////////////////////
    /*
    const eve= new Promise((resolve,reject) => {
      axios.get('http://localhost:3002/sendOccupiedtoFront').then((response) =>{
      const occ=response.data
      let i=0
      while(i<occ.length){
        //console.log(i)
        if(occ[i].actID==event.id){
          console.log(occ[i].actID + " "+ event.id)
          occupiedArray.push(occ[i].seat)
        
        if(i==occ.length-1){
          //console.log(occupiedArray)
          console.log("done")
          console.log("ATTEMPTING TO BREAK")
          resolve()
        }
      }else{
        //console.log("not a match")
        reject()
      }
        i++
        
      }
    })
    })

    eve.then(()=>{
      setAllOccupied(occupiedArray)
      setIsLoading(false)
      console.log("successful")
      }  
    ).catch(
      console.log("unsuccesful")
    )
      */
    
   },[event])


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
          onChange={(e) => {
            console.log(e.target.value)
            onChange(events.find((event) => event.act === e.target.value));
          }}
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
      

export default WelcomeEvents