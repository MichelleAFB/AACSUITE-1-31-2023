import React, { useState,useEffect } from 'react'
import { useSelector,connect} from 'react-redux'


//outside
import axios from 'axios'
function ReservedPublicReservations({ourEvent}) {


  const[clientRequests,setClientRequests]=useState()
  const[isClientRequested,setIsClientRequested]=useState()
  const[isLoading,setIsLoading]=useState(true)
  const[isReserved,setIsReserved]=useState(false)
  useEffect(()=> {
    const occClient=[]
    var clientReqs=false
    var reservedExists=false
    const prom1 = new Promise((resolve1, reject1) => {
       
   
      console.log("**********CLIENT REEQUEST");

      axios
        .get(
          "http://localhost:3002/reservations/reservationsandrequests/" +
            ourEvent.publicEvent.access +
            "/" +
            ourEvent.publicEvent.id
        )
        .then((responseClient) => {
          console.log("company requests");
          if (responseClient.data.success == true) {
            console.log("**********PUBLIC MODAL:GETTING OCCUPIEND");
            const r = responseClient.data.requests;

            console.log(r.length);
            if (r.length == 1) {
              clientReqs = true;
              setClientRequests(r)
              if (r.approved == 1) {
                reservedExists = true;
              }
            }
            if (r.length > 1) {
              r.map((rr) => {
                clientReqs = true;
                occClient.push(rr);
              });
            }
          }

          
          resolve1();
        });
    
  });

  prom1.then(() => {
    console.log("order work!!!!!");
   

    const prom2 = new Promise((resolve2, reject3) => {
    
      setIsReserved(reservedExists);
      setIsClientRequested(clientReqs);
      if(clientRequests==null){
      setClientRequests(occClient);
      }
     
      setTimeout(() => {
        resolve2();
      }, 1000);
    });

    prom2.then(() => {
      //console.log('MADE IT HERE________')
      //console.log("company rested?"+isCompanyRequested)

      setIsLoading(false);
      /******************************** */

      /******************************** */
    });
  });



  })
  
  return (
    <div>ReservedPublicReservations</div>
  )
}
const mapStateToProps = (state, props) => {
  
  const event = state.showModal.publicEvent;
 
  return {

    ourEvent: event
  };
};
export default connect(mapStateToProps)(ReservedPublicReservations);