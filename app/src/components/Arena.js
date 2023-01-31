import axios from 'axios'
import {updateSelectedEvent, updateSelectedEventOccupied,updateSelectedSeats,resetSelectedSeats,resetSelectedEventOccupied,populateCurrentOccupied} from '../features/events/selectedEventSlice'
import {useSelector,useDispatch} from 'react-redux'


import {useState,useEffect} from 'react'

import clsx from 'clsx';

function Arena({act,id,seats,selectedSeats, onSelectedSeatsChange }) {
  
/******************** */
  const dispatch = useDispatch()
  const reduxEvent=useSelector((state)=> 
    state.selectedEventRedux.selectEvent)
  
  const reduxSeats=useSelector((state)=> 
  state.selectedEventRedux.selectSeats)



  
  const event={
    act:reduxEvent.act,
    id:reduxEvent.id 
  }
 /************************/

  function handleSelectedState(seat) {
    
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
      
    } else {
      onSelectedSeatsChange([...selectedSeats,seat]);
    }
  }
/**
 * 
 * const EventModel = new mongoose.Schema({
  id:'number',
  act:'string',
  date:'string',
  time:'string',
  httpId:'number',
  image:'string'
})
 */
  
  const [allOccupied,setAllOccupied] =useState([])
  const [hasOccupied,setHasOccupied] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [actExist,setActExist] =useState(false)
  
  
  const occ=useSelector(state => state.selectedEventRedux.selectEvent)
  const reduxOccupied=useSelector(state => state.selectedEventRedux.occupied)


  

  useEffect(()=>{
    const eve= new Promise((resolve,reject) => {
    
      let i=0
      localStorage.setItem('occupied',[])
      while(i<occ.length){
        if(occ[i].actID==956 && id==956){
          console.log("*********956EXIST*********")
        }
        
        if(event.id==occ[i].actID){
          console.log(event.act)
          setHasOccupied(true)
          //console.log(occupiedArray)
          console.log(!occupiedArray.includes(occ[i].seat))
         if(!occupiedArray.includes(occ[i].seat)){
          occupiedArray.push(occ[i].seat)
          const o=localStorage.getItem('occupied')
          console.log(o)
          o=[...o,occ[i].seat]
         }
        
          console.log(occupiedArray)
          console.log(i)
          console.log(occ.length)
          
        if(i==occ.length-1){
          //console.log(occupiedArray)
          //console.log("done")
          //console.log("ATTEMPTING TO BREAK")
          resolve()
        } 
      }else{
        console.log("not a match")
      }
        i++
        
      }
      resolve()
    })
  
    eve.then(()=>{
      
      setAllOccupied(occupiedArray)
     
      console.log(hasOccupied)
      setIsLoading(false)
      console.log("all occupied")
      console.log(allOccupied)
      event.occupied=occupiedArray
      console.log("successful getting all occippied seats for " + act )
      }  
    ).catch(
      
      console.log("unsuccesful")
    )

  },[occ])






const occupiedArray=[]
const newOcc=[]

   useEffect(()=>{
    console.log("ARENA HAS DETECTED CHANGE IN REDUXEVENT CHANGING")

    console.log(allOccupied.length)
    if(allOccupied.length!=0){
      console.log("****BEFORE RESET")
      console.log(allOccupied)
      console.log("\n\n\n\n"+"reseting setall occupied" )
      //const emp=[]
      //setAllOccupied(emp)
      console.log(allOccupied)
      console.log("\n\n\n")
    }
    

    const eve= new Promise((resolve,reject) => {
      axios.get('http://localhost:3002/sendOccupiedtoFront').then((response) =>{
      const occ=response.data
      
      let i=0
      
      while(i<occ.length){
        
        
        if(event.id==occ[i].actID){
          setHasOccupied(true)
          //console.log(occupiedArray)
          console.log("********************ARENA")
          console.log(event.act)
         if(!occupiedArray.includes(occ[i].seat)){
          occupiedArray.push(occ[i].seat)
          console.log("****pushin seat " )
          console.log(event)
         }
          console.log(occupiedArray)
          console.log(i)
          console.log(occ.length)
        if(i==occ.length-1){
          //console.log(occupiedArray)
          //console.log("done")
          console.log("ATTEMPTING TO BREAK")
          resolve()
        } 
      }else{
        console.log("not a match")
      }
        i++
        
      }
    })
    })

    eve.then(()=>{
      
      setAllOccupied(occupiedArray)
     
      //console.log(hasOccupied)
      console.log(event)
      setIsLoading(false)
      console.log("all occupied")
      console.log(allOccupied)
      event.occupied=occupiedArray
      console.log("successful getting all occippied seats for " + act )
      }  
    ).catch(
      
      console.log("unsuccesful")
    )
    },[reduxEvent])

    const getOccupied = () => {
      console.log(allOccupied)
    }

   //const [isOccupied,setIsOccupied]=useState(false)
    
  return (
    <div className="Cinema">
      <div className="screen" />
      <span className="seat occupied"></span>
      <div className="seats">
        {seats.map((seat) => {
          if(hasOccupied){
            console.log("HAS OCCUPIED TRUE")
          let isSelect
          
          
          let val=allOccupied.includes(seat.toString(),0)
          const isOccupied=val
          console.log(allOccupied)
          console.log("seat is "+ seat+ " " + isOccupied)
          console.log(seat)
          if(selectedSeats.includes(seat)){
            console.log("\n\n\n")
            console.log("IS SELECTED IS TRUE")
            console.log("seat " + seat + " has been selected")
            //console.log(selectedSeats)
            isSelect=true
            console.log("\n\n\n")

          }else{
            isSelect =false;
           }
         const isSelected=isSelect
          let isOccupy
          console.log(seat.toString())
          console.log("allOccupied")
          console.log(allOccupied)
          //console.log(allOccupied)
          
            
          return (
            
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                "seat",
                isSelected && "selected",
                isOccupied && "occupied"
              )}
              
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === "Enter") {
                        handleSelectedState(seat);
                        console.log("isSelected")
                        console.log(isSelected)
                        console.log("isOccupy")
                        console.log(isOccupied)
                      }
                    }
              }
            />
          );
      }else{
        let isSelect
        //console.log("*******NO OCCUPIED SEAT**********")
        //console.log(allOccupied)
        //console.log(seat)
        if(selectedSeats.includes(seat)){
          console.log("\n\n\n")
          console.log("IS SELECTED IS TRUE")
          console.log("seat " + seat + " has been selected")
          //console.log(selectedSeats)
          isSelect=true
          console.log("\n\n\n")

        }else{
          isSelect =false;
          
         }
         const isSelected=isSelect
        return (
          
          <span
            tabIndex="0"
            key={seat}
            className={ isSelected ? 'seat occupied':'seat occupied'}
            onClick={() => handleSelectedState(seat)}
            onKeyPress={
              (e) => {
                    if (e.key === "Enter") {
                      handleSelectedState(seat);
                      console.log("IN OTHER OPTIONS")
                    }
                  }
            }
          />
          
        );
      }}
    )}

      
      </div>
    </div>
  );
}


export default Arena