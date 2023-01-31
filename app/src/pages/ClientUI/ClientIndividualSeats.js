import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useState,useEffect} from 'react'

function ClientIndividualSeats() {

  
  useEffect(() => {




  },[])

  const seats=[]
  let i=0
  while(i<40){
    seats.push({id:seat,seat:i})
  }


  return (
    <div>ClientIndividualSeats</div>
  )
}

export default ClientIndividualSeats
