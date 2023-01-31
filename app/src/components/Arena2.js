import axios from 'axios'
import {updateSelectedEvent, updateSelectedEventOccupied,updateSelectedSeats} from '../features/events/selectedEventSlice'
import {useSelector,useDispatch} from 'react-redux'

import {useState,useEffect} from 'react'

import clsx from 'clsx';

function Arena2({act,id,seats,selectedSeats, onSelectedSeatsChange }) {
  
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

  
  const [allOccupied,setAllOccupied] =useState([])
  const [hasOccupied,setHasOccupied] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [actExist,setActExist] =useState(false)
  const occup=[]
  console.log("\n\n\n\n")




const occupiedArray=[]
const newOcc=[]
   useEffect(()=>{
    console.log("*********RERENDER ARENA*****CURENNT EVENT**"+ event.act)
    
    const eve= new Promise((resolve,reject) => {
      axios.get('http://localhost:3002/sendOccupiedtoFront').then((response) =>{
      const occ=response.data
      let i=0
      
      while(i<occ.length){
        if(occ[i].actID==956 && id==956){
          console.log("*********956EXIST*********")
        }
        
        if(event.id==occ[i].actID){
          setHasOccupied(true)
          //console.log(occupiedArray)
         if(!occupiedArray.includes(occ[i].seat)){
          occupiedArray.push(occ[i].seat)
         }
          //console.log(occupiedArray)
          //console.log(i)
          //console.log(occ.length)
        if(i==occ.length-1){
          //console.log(occupiedArray)
          //console.log("done")
          //console.log("ATTEMPTING TO BREAK")
         
        } 
      }else{
        console.log("not a match")
      }
        i++
        
      }
      resolve()
    })
    })
    console.log("******EVENT IN ARENA" + reduxEvent.act)
    eve.then(()=>{
      setAllOccupied(occupiedArray)
      
      console.log(hasOccupied)
      
      setIsLoading(false)
      console.log("all occupied")
      console.log(allOccupied)
      event.occupied=occupiedArray
      console.log("successful getting all occippied seats for " + act + "\n\n\n\n")
      }  
    ).catch(
      
      console.log("unsuccesful")
    )
    },[reduxEvent])
    
  return (
    <div className="Cinema">
      <div className="screen" />
      <span className="seat occupied"></span>
      <div className="seats">
        {seats.map((seat) => {
          if(hasOccupied){
          let isSelect
          console.log(allOccupied.includes(seat.toString(),0))
          //console.log(allOccupied)
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
          console.log(allOccupied)
          if(allOccupied!=null){
            if(allOccupied.includes(seat.toString(),0)){
              isOccupy=true
              console.log("seat " + seat + " is occupied")
            }else{
              isOccupy=false
              
              
            }
          }else{
            isOccupy=false
          }
            const isOccupied=isOccupy
            
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
                      }
                    }
              }
            />
          );
      }else{
        let isSelect
        console.log("*******NO OCCUPIED SEAT**********")
        //console.log(allOccupied)
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


export default Arena2