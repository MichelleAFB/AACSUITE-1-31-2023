import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import { setClientModalClose } from "../redux/client/clientModal-actions";
import { reloadPage } from "../redux/reload/reload-actions";
import { motion } from "framer-motion";
import { genComponentStyleHook } from "antd/es/theme/internal";


function ClientModal({ visibility,ourEvent }) {
  const [isLoading, setIsLoading] = useState(true);
  //const [event,setEvent] = useState()
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [client, setClient] = useState();
  const [altEmail, setAltEmail] = useState("");
  const [useAltEmail, setUseAltEmail] = useState(false);
  const[event,setEvent]=useState()
  const dispatch = useDispatch();

  const modalEvent = useSelector((state) => state.showClientModal.event);
  const modalOpen = useSelector((state) => state.showClientModal.visibility);
  
  const ourVis=visibility
  useEffect(() => {
    var storeEvent
    console.log("vis for client modal:"+visibility)
  
    console.log("event: in useEffect")
    console.log()
    const prom = new Promise((resolve, reject) => {
     
      const cli=JSON.parse(sessionStorage.getItem('client'))
      console.log('client in modal: ' + cli)
      setClient(cli);
      setClientEmail(cli.email);
      if(modalEvent.event!=null){
        setEvent(modalEvent.event)
        console.log("modalEvent working")
      }
 
      resolve()
  
    });

    prom.then(() => {
      console.log("prom fufilled")
      console.log(event)
    
      
    
      setIsLoading(false);
    }).catch((err) => {
      console.log("error")
      console.log(err)
    })

  },[ourVis]);

  console.log("HOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log(event);
  console.log(modalEvent.event)

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  if (!isLoading ) {

    console.log("event act in modal:"+event)
    console.log(event)
    return (
      <div class='bg-gray-200'>
        <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
          <motion.div
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <main id='content' role='main' class='w-full max-w-md mx-auto '>
              <div class=' bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-5'>
                <div class='p-4 sm:p-7'>
                  <div class='text-center'>
                    <p class='mt-2 text-sm text-gray-600 font-bold dark:text-gray-400'>
                      Request a reservation{" "}
                    </p>
                   {/*} <p class='block text-xl font-bold text-gray-800 dark:text-white'>
                      {() => {
                        return <h3>{event.act}</h3>;
                      }}{" "}
                    </p>
                    <p class='block text-lg font-bold text-gray-800 dark:text-white'>
                      {event.date}{" "}
                    </p>
                    <p class='block text-lg font-bold text-gray-800 dark:text-white'>
                      {event.time}{" "}
                    </p>
                    */}
                  </div>

                  <div class='mt-5'>
                    <form>
                      <div class='grid gap-y-4'>
                        <div>
                          <div class='relative'>
                            <div class='form-group mb-2 mt-5'>
                              <label class='m-5 text-white'>Phone</label>
                              <input
                                class='rounded-md p-2'
                                type='text'
                                onChange={(e) => {
                                  setClientPhone(e.target.value);
                                }}
                              />
                            </div>
                            <div class="form-group">
                            <button class='ml-2 p-2 bg-gray-400 rounded-md'   onClick={setUseAltEmail(!useAltEmail)}>
                                <p class='text-white'> also use</p>
                              </button>
                            </div>
                            {useAltEmail ?
                            <div class='form-group'>
                              <label class='m-5 text-white'> Alt Email</label>
                              <input
                                class='rounded-md p-2'
                                type='text'
                                onChange={(e) => {
                                  setAltEmail(e.target.value);
                                  console.log(altEmail)
                                }}
                              />
                             
                            </div>:<p></p>
                         }
                          </div>
                        </div>
                        <div>
                          <label
                            for='email'
                            class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                          >
                            {/*{event.event.act} | {event.event.date} |{" "}
                            {event.event.time}*/}
                          </label>
                          <div class='relative'>
                            <div class='flex'>
                              <div class='flex mt-3'></div>
                            </div>
                          </div>
                        </div>
                        <div class='flex'>
                          <button
                            class='py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("CLICK");
                              const prom = new Promise((resolve, reject) => {
                                console.log(event);
                                console.log("altEmail:" + altEmail);
                                console.log("userEmail:" + client.email);
                                console.log(
                                  "name:" + client.firstname + " " + client.lastname
                                );

                                if (
                                  altEmail != "" &&
                                  clientPhone != "" &&
                                  useAltEmail
                                ) {
                                  console.log("using alt email");
                                  axios
                                    .post(
                                      "https://localhost:3002/reservations/reservationRequests",
                                      {
                                        event,
                                        phone: clientPhone,
                                        email: clientEmail,
                                        altEmail:altEmail,
                                        name:
                                          client.firstname +
                                          " " +
                                          client.lastname,
                                      }
                                    )
                                    .then((response) => {
                                      console.log(response);
                                      resolve();
                                    });
                                }
                                
                                if (
                                  clientEmail != "" &&
                                  clientPhone != "" &&
                                  altEmail == "" &&
                                  !useAltEmail
                                ) {
                                  //TODO: set an altEmail option for route
                                  //TODO:create a toggle button forincluding an alternate email

                                  console.log("using default emaill");
                                  axios
                                    .post(
                                      "https://localhost:3002/reservations/reservationRequests",
                                      {
                                        event,
                                        phone: clientPhone,
                                        email: clientEmail,
                                        name:
                                          client.firstname +
                                          " " +
                                          client.lastname,
                                      }
                                    )
                                    .then((response) => {
                                      console.log(response);
                                      resolve();
                                    });
                                }
                              });

                              prom
                                .then(() => {
                                  console.log("sent");

                                  setIsLoading(true);
                                  dispatch(setClientModalClose());
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            confirm
                          </button>
                          <button
                            class='py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                            onClick={(e) => {
                              dispatch(reloadPage());
                              setIsLoading(true);
                              dispatch(setClientModalClose());
                            }}
                          >
                            Exit
                          </button>
                        </div>
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
          </motion.div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const vis = state.showClientModal.visibility;
  const event = state.showClientModal.event;
  console.log("event:")
  console.log(event);
  const user = state.user.user;
  return {
    user: user,
    visibility: vis,
    ourEvent: event,
  };
};

export default connect(mapStateToProps)(ClientModal);
