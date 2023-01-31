import React from 'react'
import {useNavigate} from 'react-router-dom'

function ReservationsTab() {

  const navigate=useNavigate()
  const error=false
  if(error==true){
    throw new Error("error is true")
  }
  return (
    <div class="p-10 bg-gray-200 rounded-md object-contain">
      <button class="p-5" onClick={() => {
        navigate("reservations")

      }}>
        <p class="text-2xl font-bold">See Reservations</p>
      </button>
    </div>
  )
}

export default ReservationsTab