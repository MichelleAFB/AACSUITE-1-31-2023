

function Legend({seats}) {




  const disp =()=>{
    const s= Array.from(seats);
    console.log(s)
  }

  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>Not Now</small>
      </li>
      <li>
        <span className="seat selected" onClick={disp({seats})} /> <small>Vacant</small>
      </li>
      <li>
        <span className="seat occupied" onClick={disp}/> <small>Occupied</small>
      </li>
    </ul>
  );
}
export default Legend