

function Cinema({ movie,seats, selectedSeats, onSelectedSeatsChange }) {
  
  
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
  
  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          let isSelect
          
          if(selectedSeats.includes(seat)){
            console.log("\n\n\n")
            console.log("IS SELECTED IS TRUE")
            console.log("seat " + seat + " has been selected")
            console.log(selectedSeats)
            isSelect=true
            console.log("\n\n\n")

          }else{
            isSelect =false;
            
           }
         const isSelected=isSelect
          let isOccupy
          if(movie.occupied.includes(seat)){
              isOccupy=true
            }else{
              isOccupy=false
              
              
            }
            const isOccupied=isOccupy
            
          return (
            <span
              tabIndex="0"
              key={seat}
              className={isSelected ? "seat selected":"seat"}
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
        })}
      </div>
    </div>
  );
}

export default Cinema