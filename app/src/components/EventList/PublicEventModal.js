
import React, { useEffect, useState, forceUpdate ,useMemo} from "react";
import { useSelector, useDispatch, connect } from "react-redux";


//redux
import {
  setPublicModalEvent,
  setPublicModalOpen,
  setPublicModalClose,

 
  editEventAccessType,
} from "../../redux/eventModal/eventModal-action";
import { setOccupiedSeats } from "../../redux/events/events-actions";
import { useNavigate } from "react-router-dom";
import { addPublicEvent } from "../../redux/access/accessEvents-actions";
//import { reloadPage } from "../redux/reload/reload-actions";

//data
import { seats } from "../../data/Seats";

//outside
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { ReservedCompanySeatsWindow } from "../ReservedCompanySeatsWindow";
import ReservedPublicReservations from "./ReservedPublicReservations";


const PublicEventModal = ({ ourEvent, visibility }) => {
  const editEvent = useSelector((state) => state.showModal.event);
  const editEventOccupied = useSelector((state) => state.showModal.occupied);
  console.log(editEvent);

  //const visibility= useSelector((state => state.showModal.visibility))
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [occupied, setOccupied] = useState();
  const [updateSeats, setUpdateSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const selectArray = [];

  //editing variables
  const [editAccess, setEditAccess] = useState("");
  const [editReservations, setReservations] = useState();
  const [allSeats, setAllSeats] = useState([]);
  const [changedAccess, setChangedAccess] = useState();
  const [hasChanged, setHasChanged] = useState(false);
  const [isReserved, setIsReserved] = useState(false); //reserved for client exist

  const [isClientRequested, setIsClientRequested] = useState(false);
  const [clientRequests, setClientRequests] = useState();

  const [isCompanyRequested, setIsCompanyRequested] = useState(false); //company requests
  const [companyRequests, setCompanyRequests] = useState(); //company requests exist
  const [pendingCompanyRequests, setPendingCompanyRequests] = useState(); //company requests exist
  const [revokeEmployees, setRevokeEmployees] = useState(false);
  const [revokePublicRequests, setRevokePublicRequests] = useState(false);

  const [count, setCount] = useState(0);
  


  useEffect(() => {
    console.log(
      "************************************MODAL HOME RELOAD*********************"
    );

    
    var reservedExists;
    const prom = new Promise((resolve, reject) => {
      console.log("edit Event");
      console.log(ourEvent.publicEvent);
      const id = ourEvent.publicEvent.id;
      console.log(id);
      //TODO: CHANGE API CALL TO USE MODALEVENT NOT OUR EVENT
      axios
        .post("https://accserverheroku.herokuapp.com/getEventInfo/" + ourEvent.publicEvent.id)
        .then( (response) => {
          console.log(response);
          setEvent( response.data[0]);

          console.log("*****************OUR EVENT*******")
          console.log(event)
          //setIsLoading(false)
          resolve();
        });

   

  
    });

    prom.then(() => {
      const occClient = [];
      var clientReqs = false;

      const companyrequests = []; //if there are pending company request
      var requested = false;
      
      const prom1 = new Promise((resolve1, reject1) => {
       
   
          console.log("**********CLIENT REEQUEST");
        console.log(event.id)
          axios
            .get(
              "http://localhost:3002/reservations/reservationsandrequests/public/" +
                event.id
            )
            .then((responseClient) => {
              console.log(event)
              console.log("company requests");
              console.log(responseClient)
             
              if(responseClient.data.success==true){
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
              
              
                  console.log(occClient)
              setTimeout(()=> {
                resolve1();
              },1500)
            }
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
    });
    
  }, [ourEvent]);

  console.log(clientRequests)

 
  function getEvent(ourEvent){
    console.log("\n\n\\n\n\n\n\n")
    console.log(ourEvent)
    console.log(event)
    console.log("\n\n\\n\n\n\n\n")
    return ourEvent
  }


  console.log(event);

  console.log(isReserved);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("visibility: " + visibility);

  function displaySeats() {
    if (event.access == "public") {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

 

  if (visibility == true && !isLoading) {
  
    console.log("clientRequets");
    console.log(clientRequests);
    console.log(isClientRequested);
    return (
      <div class='bg-gray-200'>
        <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
          <ToastContainer/>
        
          <main id='content' role='main' class='w-full max-w-md mx-auto '>
            <div class=' bg-white  rounded-xl shadow-lg dark:bg-pink-400 dark:border-gray-700 mb-5'>
              <div class='p-4 sm:p-7'>
                <div class='text-center'>
                <button class="py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => {
                     
                      setIsClientRequested(false)
                      setIsLoading(true);
                      dispatch(setPublicModalClose(false));
                    }}>
                      Exit
                    </button>
                  <p class='mt-2 text-sm text-gray-600 font-bold dark:text-gray-400'>
                    Edit{" "}
                  </p>
                  <p class='block text-xl font-bold text-gray-800 dark:text-white'>
                    {event.act}{" "}
                  </p>
                  <p class='block text-lg font-bold text-gray-800 dark:text-white'>
                    {event.date}{" "}
                  </p>
                  <p class='block text-lg font-bold text-gray-800 dark:text-white'>
                    {event.time}{" "}
                  </p>
                
                  {
                    isCompanyRequested?<p class="font-bold text-red-600">Wait to see Detected</p>:<p></p>
                  }
                 </div>
                
                  {
                    isClientRequested ? (
                    <div class="flex flex-col p-10">
                      <div class="flex flex-col justify-center">
                       <p class='text-center block text-2xl font-bold text-gray-800 dark:text-red-500'>
                          RESERVED
                        </p>
                        <p class='text center text-white text-small mt-3 mb-2'>
                          This event has pending or confirmed
                          public reservation(s):
                        </p>
                        <p></p>
                        <p>{clientRequests[0].clientName}|{clientRequests[0].dateReserved}|{clientRequests[0].timeReserved}</p>
                        {
                          clientRequests.map((m) => {
                            return<p>{m.clientName} | {m.dateReserved} | {m.timeReserved}</p>
                          })
                        }
                         
                        </div>
                        <div class="p-3">
                      {/*clientRequests.map((m) =>{
                        console.log(m)
                        return <p class="text-white text-sm">{m.act} | {m.clientName} | reserved on: {m.dateReserved}</p>
                      })*/}

                       {revokePublicRequests == false ? (
                        <button
                          class='mt-3 p-2 rounded-md bg-gray-400 '
                          onClick={() => {
                            setRevokePublicRequests(!revokePublicRequests);
                          }}
                        >
                          <a class='text-white text-xs font-bold'>
                            Click to cancel all public reservations
                          </a>
                        </button>
                      ) : (
                        <button class='mt-3 p-2 rounded-md bg-red-600 '>
                          <a
                            class='text-white text-xs '
                            onClick={() => {
                              setRevokePublicRequests(!revokePublicRequests);
                            }}
                          >
                            Retain public reservations
                          </a>
                        </button>
                      )}
                      </div>
                    </div>):(<p></p>)
                  }

            

                <div class='mt-5'>
                  
                  <form>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("setting occupied confirm");
                        const select = allSeats.filter(
                          (s) => s.selected == true
                        );
                        console.log("\n\n\n\n\n\n\n")
                        console.log("HASCHANGED:*************" + hasChanged)
                        //TODO:implement client revoke mechanism
                        if(isClientRequested==true && hasChanged==true && revokePublicRequests==true){
                          console.log("HASCHANGED"+ hasChanged)
                          console.log("*************************************************************************************************************************************************************************************************************************************************************************************************************************************************\n\n\n\n\n\n\n\n\n\n\n\n\n\n")


                        }{

                        }
                        console.log(isCompanyRequested +" "+
                          revokeEmployees +" "+
                        
                          hasChanged)
                        //if company req exist,revoke is approved, and access has changed
                       
                      //TODO: allow cancellation mechanism for public reservations

                      //if no reservations found change access type
                        if (
                          isCompanyRequested == false &&
                          isClientRequested == false && hasChanged
                        ) {
                          const prom = new Promise((resolve, reject) => {
                            select.map((s) => {
                              s.actID = event.id;
                              s.act = event.act;
                            });
                            console.log("changed Access?");
                            console.log(changedAccess);
                            if (hasChanged == true) {
                              axios
                                .post(
                                  "https://accserverheroku.herokuapp.com/setAccessType",
                                  { event: event, access: changedAccess }
                                )
                                .then((response) => {
                                  console.log("response");
                                  console.log(response);
                                  console.log("changed Access?");
                                  console.log(changedAccess);
                                  setCompanyRequests()
                                  setClientRequests()
                                });
                            }

                            resolve();
                          });

                          prom.then(() => {
                            console.log("setting occupied then");

                            console.log("CLOSING MODAL");
                            
                            setIsLoading(true);
                            dispatch(setPublicModalClose(false));
                            console.log("isloading");
                            console.log(isLoading);
                            console.log("has access changed:" + hasChanged);
                            console.log(changedAccess);
                          });
                        }
                      }}
                      class='py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                    >
                      confirm
                    </button>
                    <button class="py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => {
                     
                      setIsLoading(true);
                      dispatch(setPublicModalClose(false));
                    }}>
                      Exit
                    </button>
                    <div class='grid gap-y-4'>
                      <div>
                        <div class='relative p-4'>
                          <p class='text-bold text-gray-200'>
                            Current: {event.access}
                          </p>

                          <select
                            id='states'
                            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={(e) => {
                              setHasChanged(true);

                              const prom = new Promise((resolve, reject) => {
                                setChangedAccess(e.target.value);
                                resolve();
                              });

                              prom.then(() => {
                                console.log(
                                  "editaccess " +
                                    editAccess +
                                    " is changed to " +
                                    changedAccess
                                );
                              });
                            }}
                          >
                            <option selected>Choose access</option>
                            <option value='private'>private</option>
                            <option value='public'>public</option>
                            <option value='company'>company</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          for='email'
                          class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                        >
                          Reservation
                        </label>
                        <div class='relative'>
                          <div class='seats'>
                            {occupied == null ? (
                              <p class='text-bold text-gray-200'>
                                Current:No reservations
                              </p>
                            ) : (
                              <div class='seats'>
                                {occupied.map((o) => {
                                  return (
                                    <button
                                      class='seat selected'
                                      onClick={(e) => {
                                        e.preventDefault();

                                        if (o.selected == null) {
                                          console.log("uninstantiates");
                                          o.selected = false;
                                        } else {
                                          if (o.selected == true) {
                                            o.selected = false;
                                          } else {
                                            o.selected = true;
                                          }
                                        }
                                      }}
                                    >
                                      <p class='text-gray-200'>{o.seat}</p>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <div class='flex'>
                            <div class='flex mt-3'>
                              {
                                <div class='seats'>
                                  {allSeats.map((s) => {
                                    if (s.selected == false) {
                                      console.log(s);
                                      return (
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            console.log(s.seat);
                                            console.log(s.selected);
                                            console.log(
                                              "update Seats" + updateSeats
                                            );
                                            setUpdateSeats(!updateSeats);
                                            s.selected = !s.selected;
                                            console.log(allSeats);
                                          }}
                                          class='seat'
                                        >
                                          <p>{s.seat}</p>
                                        </button>
                                      );
                                    }
                                    if (s.selected == true) {
                                      return (
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();

                                            setUpdateSeats(!updateSeats);
                                            console.log(s.seat);
                                            console.log(s.selected);
                                            console.log(
                                              "update Seats" + updateSeats
                                            );
                                            s.selected = !s.selected;
                                            console.log(allSeats);
                                          }}
                                          class='seat selected '
                                        >
                                          <p>{s.seat}</p>
                                        </button>
                                      );
                                    }
                                  })}
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='flex'></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <p class='mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700'>
              <a
                class='pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200'
                href='#'
                target='_blank'
              >
                <svg
                  class='w-3.5 h-3.5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
                View Github
              </a>
              <a
                class='pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200'
                href='#'
              >
                Contact us!
              </a>
            </p>
          </main>
        </div>
      </div>
    );
  }
};

/*
 */
const mapStateToProps = (state, props) => {
  const vis = state.showModal.publicVisibility;
  const event = state.showModal.publicEvent;
  console.log("vis: " + vis);
  return {
    visibility: vis,
    ourEvent: event,
  };
};

export default connect(mapStateToProps)(PublicEventModal);


/***
 * 
 * 
 */