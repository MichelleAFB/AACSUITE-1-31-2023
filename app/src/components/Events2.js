import { useEffect, useState } from "react";
import axios from "axios";
import { clsx } from "clsx";
import selectedEventSlice, {
  updateSelectedEvent,
  updateSelectedEventOccupied,
  resetSelectedSeats,
  resetSelectedEventOccupied,
} from "../features/events/selectedEventSlice";
import { useSelector, useDispatch, connect } from "react-redux";
import { loadSelectEvent } from "../redux/events/events-actions";
import Arena2 from "./Arena2";
import Arena3 from "../dumped/Arena3";

function Events2({ onChange, mapEvents }) {
  const dispatch = useDispatch();

  console.log(mapEvents);

  //const events=useSelector((state) => state.selectedEventRedux.allEvents)
  //const [allOccupied,setAllOccupied] =useState([])
  const [hasOccupied, setHasOccupied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [actExist, setActExist] = useState(false);
  const [occupied, setOccupied] = useState([]);
  const [occupiedRedux, setOccupiedRedux] = useState(true);
  const [events, setEvents] = useState([]);
  const occup = [];
  // console.log("\n\n\n\n")

  const reduxOccupied = useSelector(
    (state) => state.storeEvent.occupied.occupied
  );

  const reduxEvents = useSelector((state) => state.storeEvent.events.events);

  const reduxEvent = useSelector((state) => state.storeEvent.selectEvent);

  console.log("select from event");
  console.log(reduxEvent);
  const selectedEvent = reduxEvent;

  console.log("occupied from events");
  const allOccupied = reduxOccupied;
  console.log(reduxOccupied);

  console.log("selectEvent from events");
  const allEvents = [];
  let i = 0;
  while (i < reduxEvents.length) {
    allEvents[i] = reduxEvents[i];
    i++;
  }

  var event = reduxEvents[0];
  const [selectEvent, setSelectedEvent] = useState();
  const [seats, setSeats] = useState([]);
  //const [selectedSeats,setSelectedSeats]=useState([])

  function getOccupied(reduxOccupied, occ) {
    const prom = new Promise((resolve, reject, reduxOccupied) => {
      let i = 0;
      const occ = [];
      console.log("*****GETOCC******");
      console.log(reduxOccupied);
      if (reduxOccupied) {
        while (i < reduxOccupied.length) {
          console.log(reduxOccupied[i].actID);
          console.log(occ);

          if (reduxOccupied[i].actID) {
            if (reduxOccupied[i].actID == selectEvent.id) {
              console.log(
                "MATCH " + reduxOccupied[i].actID + " " + selectEvent.id
              );
            }
            if (!occ.includes(reduxOccupied[i].seat)) {
              console.log("pushing to occ");
              occ.push(reduxOccupied[i].seat);
            }
          }

          i++;
        }
        setOccupied(occ);
        resolve(occ);
      }
    });

    prom
      .then(() => {
        console.log("success");
        setOccupied(occ);
        console.log(occupied);
      })
      .catch(console.log("fail"));
  }

  useEffect(
    (reduxEvent, reduxOccupied) => {
      const occupiedArray = [];

      setSelectedEvent(selectedEvent);
      console.log("reRender: ");
      console.log(reduxOccupied);
      setEvents(reduxEvents);
      setOccupied(reduxOccupied);
      console.log("occupied");
      console.log(occupied);

      const seats = [];
      let i = 0;
      while (i < 40) {
        seats[i] = i;
        i++;
        if (i == 39) {
          setSeats(seats);
        }
      }

      /*const eve= new Promise((resolve,reject) => {
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
      
      setIsLoading(false)
    console.log("successful")
      
      
      }  
    ).catch(
      console.log("\n\n\n\n unsuccesful")
    )
    */
    },
    [selectEvent]
  );

  const change = (e) => {
    onChange(reduxEvents.find((event) => event.act === e.target.value));
    console.log("event should have sent " + e.target.value);
    const newEvent = reduxEvents.find((event) => event.act === e.target.value);
    console.log(newEvent);

    dispatch(loadSelectEvent(newEvent));

    setSelectedEvent(newEvent);
  };

  if (selectEvent != null && reduxOccupied != null) {
    return (
      <div className='Movies'>
        <h1>
          {" "}
          Bin<span className='gold'>{"g"}</span>eBoy{" "}
        </h1>
        <h4> Its Movie time! </h4>

        <img
          className='motion poster'
          src='https://s3.amazonaws.com/pbblogassets/uploads/2017/07/oz-wicked-witch-poster.gif'
          alt='Girl in a jacket'
        />

        <p>
          {" "}
          <label htmlFor='movie'>Select your Binge!</label>
        </p>
        <select id='event' value={selectEvent.act} onChange={change}>
          {event.act}
          {events.map((eve) => (
            <option key={eve.id} value={eve.act}>
              {eve.act} | ({eve.date}) | ({eve.time})
            </option>
          ))}
        </select>
        <Arena3
          occupied={reduxOccupied}
          event={selectEvent}
          onSelectedSeatsChange={(selectedSeats) => {
            console.log("FROM HOME SELECTED SEATS ARE");
            console.log(selectedSeats);
            console.log(selectedEvent.act);
          }}
        />
      </div>
    );
  }
}
//events:1665591537772
//home:1665591538773
const mapEvents = (state) => {
  return {
    events: state.storeEvent.events.events,
  };
};

export default connect(mapEvents)(Events2);

console.log("map event");
console.log(mapEvents);
