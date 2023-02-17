import React, { useState,useEffect } from 'react'
import { useSelector,connect} from 'react-redux'
import { ReactDOM } from 'react'

//outside
import axios from 'axios'


function ReservedPublicReservations({ourEvent,visibility}) {


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
          "https://accserverheroku.herokuapp.com/reservations/reservationsandrequests/" +
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

  },[ourEvent,visibility])

  console.log(clientRequests[0])
  console.log(isClientRequested)
  if(!isLoading && isClientRequested){
    
  
    ReactDOM.createPortal(<div class="flex flex-col p-5">
      
      <div>{clientRequests.map((m) => {
       <p class="text-white text-xs m-1">{m.clientName} | {m.dateReserved} | {m.timeReserved} | {m.act} </p>
        
      })}</div>
    </div>,
    document.getElementById('portal')
  )
  
}
if(!isLoading && isClientRequested && clientRequests.length==1){
  console.log(clientRequests)
  ReactDOM.createPortal(
  <div class="flex flex-col p-5">
    
    <div>{
     <p class="text-white text-xs m-2">{clientRequests[0].clientName} | {clientRequests[0].dateReserved} | {clientRequests[0].timeReserved} | {clientRequests[0].act}</p>
      
}</div>
  </div>,
  document.getElementById('portal')
)
}
}
const mapStateToProps = (state, props) => {
  
  const event = state.showModal.publicEvent;
  const vis=state.showmodal.publicVisibility
 
  return {
    visibility:vis,
    ourEvent: event
  };
};
export default connect(mapStateToProps)(ReservedPublicReservations);