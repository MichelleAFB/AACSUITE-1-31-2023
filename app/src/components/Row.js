
import React from 'react'
import Seat from './Seat'
function Row({id, seats}) {




  return (
    <div id={id} seats={seats} className='flex p-10 bg-gray-100 border-gray-300 justify-around w-1/4'>
      {seats.map((seat) =>(
        <Seat id={seat.id} availabilty={seat.availability}/>
      ))

      }

    </div>
  )
}

export default Row