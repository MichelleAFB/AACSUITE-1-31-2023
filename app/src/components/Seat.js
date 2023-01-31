import React from 'react'
import {useState, useEffect} from 'react'




function Seat({id,available}) {

  const [availability,setAvailability]= useState({available})
  const[Id, setId]=useState({id})

 
  
 const onClick=()=>{
    setAvailability(!availability)
  }

  return (
    <>
     <div className="seat" onClick={onClick} Id={id}> 
     {id}
     </div>
    
    </>
    
  )
}

export default Seat