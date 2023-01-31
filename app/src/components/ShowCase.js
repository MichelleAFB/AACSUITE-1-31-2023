




function ShowCase() {
  

  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>Not Now</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Vacant</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}

export default ShowCase