import React from 'react'

function Seats({seats}) {

  function handleSelectedState(seat) {
   console.log("hi")
  }
  
  return (
    <div className='seats'>
      {{seats}.map((seat)=> {
        const isAvailable = seat.isAvailable
        return(
          <span
              tabIndex="0"
              key={seat}
              className={clsx(
                "seat",
                isAvailable && "selected",
                !isAvailable && "occupied"
              )}
              onClick={isAvailable ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isAvailable
                  ? null
                  : (e) => {
                      if (e.key === "Enter") {
                        handleSelectedState(seat);
                      }
                    }
              }
            />

        )
      })}

    </div>
  )
}

export default Seats