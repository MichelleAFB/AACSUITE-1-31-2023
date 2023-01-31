import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  setModalRequest,
  setRequestModalOpen,
  setRequestModalClose,
} from "../redux/reservations/requestModal-actions";
import axios from "axios";
import { useEffect, useState, useCallback,useRef } from "react";
import emailjs from "@emailjs/browser";
import { reloadPage } from "../redux/reload/reload-actions";
import { motion } from "framer-motion";

function RequestModal({ request, visibility }) {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmActive, setConfirmActive] = useState(false);
  const [confirmApproval, setConfirmApproval] = useState(false);
  const [confirmCount, setConfirmCount] = useState();
  const [reservedForOther,setReservedForOther] = useState(false)
  const [check,setCheck] =useState()
  const approveForm=useRef()
  const[approveData,setApproveData] =useState()
  const revokeForm=useRef()
  const [revokeData,setRevokeData] =useState()
  /*
  
  const [approvalData, setApprovalData] = useState({
    first: request.request.clientName,
    last: "",
    email: request.request.clientEmail,
    message:"Your request to reserve " + request.request.act + " on " + request.request.actDate + " at " + request.request.actTime + " is approved!"
  });

  const [denialData, setDenialData] = useState({
    first: request.request.clientName,
    last: "",
    email: request.request.clientEmail,
    message:"Your request to reserve " + request.request.act + " on " + request.request.actDate + " at " + request.request.actTime + " has been denied. The event may have been reserved by another client. we look forward to hosting you in the future!"
  });
  */
  //const [event,setEvent] = useState()

  window.store=useSelector((state) => state)
  console.log(window.store)
  const dispatch = useDispatch();

  const modalRequest = useSelector((state) => state.requestModal.request);
  const modalOpen = useSelector((state) => state.requestModal.visibility);
  console.log(modalOpen);

  useEffect(() => {
    const prom = new Promise((resolve, reject) => {
      //setEvent(modalEvent)
      const name=request.request.clientName.split(" ")
      console.log(name)
      setRevokeData({
        first:name[0],
        last:name[1],
        email:request.request.clientEmail,
        subject:"AAC FLAGSHIP SUIT:Reservation cancelled",
        message:"Hello " + request.request.clientName+". We regret to inform you the reservation recently confirmed has been canceled. Cancellation details: "+ request.request.act + " | " + request.request.actDate+ " | "+ request.request.time
      })
      setApproveData({
        first:name[0],
        last:name[1],
        email:request.request.clientEmail,
        subject:"AAC FLAGSHIP SUIT:Reservation approved",
        message:"Hello " + request.request.clientName+". We are please to inform you the reservation request has been approved!. Reservation details: "+ request.request.act + " | " + request.request.actDate+ " | "+ request.request.actTime
      })
      setCheck({exist:false})
      setConfirmCount(0)
      if (request != null) {
        resolve();
      }
    });

    prom.then(() => {
      if (modalOpen) {
        setIsLoading(false);
        console.log(isLoading);
      }
    });
  }, [visibility,request]);

 

  

  async function checkReserved(req,reserved){
    console.log("CHECK RESERVED")
    console.log(req)
    const alreadyTaken={exist:false}
    const prom = new Promise((resolve,reject) => {
      console.log("in promise")
      reserved.map((r) => {
        console.log(r.eventId)
        console.log(req.request.eventId)
        console.log("\n")
        if(r.eventId == req.request.eventId){
          
          console.log("r")
          console.log(r.act)
          console.log(r.eventId )
          console.log("req")
          console.log(req.request.act)
          console.log(req.request.eventId)
          alreadyTaken.exist=true
          console.log("alreadyTeaken: " )
          console.log(alreadyTaken)
        
          console.log(check)
          console.log("Check inside checkReserved")
          console.log(check)
          
        }else{
          console.log("not match")
        }
      })
      
      resolve()
    })

    prom.then(() => {
      console.log("outside of lopp\n\n\n")
      console.log(alreadyTaken)
      setCheck(alreadyTaken)
      console.log(check)
      console.log("detected:" + alreadyTaken.exist)
      return alreadyTaken
    }).catch(() =>{
      console.log("not detected:" + alreadyTaken.exist)
      return alreadyTaken
    }
    )
    return alreadyTaken.exist
    

  }

  async function getUpdatedReservations(req){

    const result={exist:false}
    const reserved=[]
    const prom = new Promise((resolve,reject) => {
        axios.get("https://accserverheroku.herokuapp.com/reservations/approvedReservations").then((response) => {
      console.log("update reservations")
      response.data.map((r) => {
        reserved.push(r)
      })
      resolve(reserved)
    })
    })

    const results=[]
    
    prom.then(() => {
      console.log("in prom then")
      console.log(reserved)

      const prom1=checkReserved(req,reserved)

    
       results[0]=prom1.then((response) => {
        console.log(response)

        
        console.log(check)
       return response
      })
      console.log("******************state.check: " )
      console.log(check)

      return results[0]

      
      
    })
    console.log(results[0])
    return results[0]

   /* console.log(reserved)
    const check=  checkReserved(req,reserved)
    console.log("check")
    console.log(check.state)
   return check
   */
  }

 

  
  

  console.log(revokeForm.current)
 
  async function sendEmail(form){
    
    console.log("testing emailjs functionality");
    emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        form.current,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result)
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };



  const approvalHtml =()=> {
    return (<form>
    <input type="text" name="first" placeholder="First..." class="hidden" value={request.request.clientName}
    />
   <input type="text" name="email" placeholder="First..." class="hidden"value={request.request.clientEmail} 
   />
   <input type="text" name="message" placeholder="First..." class="hidden" value={"Your request to reserve " + request.request.act + " on " + request.request.actDate + " at " + request.request.actTime + " is approved!"} 
   /></form>)
  }

  function sendApprovalEmail() {
    console.log("EMAILJS")
    console.log(approvalHtml)
    if(reservedForOther){
      emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        approvalHtml,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    }
   
  };

  console.log("reserved for others: " + reservedForOther)
  
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


  if (!isLoading) {

    console.log(revokeForm)
    console.log("***************REQUEST MODAL ********************")
    return (
      <div class='bg-gray-200'>
        <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
          <motion.div
           variants={dropIn}
           initial="hidden"
           animate="visible"
           exit="exit">
          <main id='content' role='main' class='w-full max-w-md mx-auto '>
            <div class=' bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-5'>
              <div class='p-4  sm:p-7'>
                <div class='text-center'>
                  <p class='mt-2 text-sm text-gray-600 font-bold dark:text-gray-400'>
                    Edit{" "}
                  </p>
                  <p class='block text-xl font-bold text-gray-800 dark:text-white'>
                    {() => {
                      return <h3>{request.act}</h3>;
                    }}{" "}
                  </p>
                  <p class='block text-lg font-bold text-gray-800 dark:text-white'>
                    {request.eventDate}{" "}
                  </p>
                  <p class='block text-lg font-bold text-gray-800 dark:text-white'>
                    {request.eventTime}{" "}
                  </p>
                </div>

                <div class='mt-5'>
                  <form>
                    <div class='grid gap-y-4'>
                      <div class='relative'>
                        <h1 class='text-4xl text-white'>Reservation</h1>
                        <p class="text-green-400">{request.request.act} | {request.request.actDate} | {request.request.actTime}</p>
                        <label
                          for='email'
                          class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                        >
                          Name:
                        </label>
                        <p class='text-white'> {request.request.clientName} </p>
                        <label
                          for='email'
                          class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                        >
                          Email:
                        </label>
                        <p class='text-white'>
                          {" "}
                          {request.request.clientEmail}{" "}
                        </p>
                        <label
                          for='email'
                          class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                        >
                          Phone:
                        </label>
                        <p class='text-white'>
                          {" "}
                          {request.request.clientPhone}{" "}
                        </p>
                        <label
                          for='email'
                          class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                        >
                          Reserved at:
                        </label>
                        <p class='text-white'>
                          {" "}
                          {request.request.dateReserved} at{" "}
                          {request.request.timeReserved}
                        </p>

                        <div class='relative'></div>
                      </div>
                      <div>
                        <div class='relative'>
                          <div class='flex'>
                            <div class='flex mt-3'></div>
                          </div>
                        </div>
                      </div>
                      <div class='flex'>
                      <form ref={approveForm} >
                        <input name="first" class="hidden" value={approveData.first}/>
                        <input name="last" class="hidden" value={approveData.last}/>
                        <input name="email" class="hidden" value={approveData.email}/>
                        <input name="subject" class="hidden" value={approveData.subject}/>
                        <input name="message" class="hidden" value={approveData.message}/>
                        <button
                          class='object-fit py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                          onClick={(e) => {
                            e.preventDefault();
                          
                            //setConfirmActive(!confirmActive);
                            console.log(confirmCount);
                            setConfirmCount(confirmCount + 1);

                            
                            if (confirmCount == 2) {
                              const prom = new Promise((resolve, reject) => {
                                axios
                                .post(
                                  "https://accserverheroku.herokuapp.com/reservations/approveRequest",
                                  {request,message:"Approved reservation for client [" + request.request.clientName + "] for [" + request.request.act.toUpperCase() + " on " + request.request.actDate + "|" + request.request.actTime +"]"}
                                ).then((response) => {
                                  console.log(sessionStorage.getItem("user"))
                                  const user=sessionStorage.getItem("user")
                                  console.log()
                                  if(response.data.approved==true){
                                    sendEmail(approveForm)
                                  }
                                 
                                  console.log(response.data.approved)
                                  alert(response.data.message)
                                  dispatch(setRequestModalClose())
                                  resolve()
                                })
                                
                                 
                              
                                  
                              });

                         prom.then(() => {
                          dispatch(setModalRequest(null))
                          setConfirmCount(0);
                          setIsLoading(true);
                          dispatch(reloadPage())
                          console.log("success closing request modal");
                         
                          
                      
                         })
                         
                          }
                          }}
                        >
                          Approve
                        </button>
                        </form>
                        <form ref={revokeForm} >
                        <input name="first" class="hidden" value={revokeData.first}/>
                        <input name="last" class="hidden" value={revokeData.last}/>
                        <input name="email" class="hidden" value={revokeData.email}/>
                        <input name="subject" class="hidden" value={revokeData.subject}/>
                        <input name="message" class="hidden" value={revokeData.message}/>
                        <button class='object-fit py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800' onClick={() => {
                             const prom = new Promise((resolve, reject) => {
                              axios.post("https://accserverheroku.herokuapp.com/reservations/revokeReservation ",{reservation:request.request}).then((response) =>{
                                const prom1=new Promise((resolve,reject) => {
                                  if(response.data.revoked==true){
                                    sendEmail(revokeForm)
                                  }else{
                                    alert("revoke not successful")
                                  }
                                  
                                  resolve()
                                })

                                prom1.then(() => {
                                  alert(response.data.message)
                                  console.log(response.data)

                                })
                               
                              })                        
                             
                              resolve();
                            });

                            prom
                              .then(() => {
                                dispatch(setRequestModalClose());
                                dispatch(setModalRequest(null))
                                setConfirmCount(0);
                                setIsLoading(true);
                                dispatch(reloadPage())
                               
                              })
                              .catch(
                                console.log("failure closing request modal")
                              );
                          

                        }}>
                          Deny
                        </button>
                        </form>
                       
                        <button
                          class='py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                          onClick={(e) => {
                            const prom = new Promise((resolve, reject) => {
                             
                              dispatch(setRequestModalClose());
                              resolve();
                            });

                            prom
                              .then(() => {
                                dispatch(setModalRequest(null))
                                setConfirmCount(0);
                                setIsLoading(true);
                                console.log("success closing request modal");
                              })
                              .catch(
                                console.log("failure closing request modal")
                              );
                          }}
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  </form>
                  <p class='text-white m-2 text-center'>
                    Please click Approve 3 times to confirm Approval
                  </p>
                </div>
              </div>
            </div>

            <p class='mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700'>
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

/*<div class="bg-gray-200">
    <div class="h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50">
        <main id="content" role="main" class="w-full max-w-md mx-auto ">
    <div class=" bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-5">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <p class="mt-2 text-sm text-gray-600 font-bold dark:text-gray-400">Edit </p>
          <p class="block text-xl font-bold text-gray-800 dark:text-white">{() => {
            return <h3>{request.act}</h3>
          }} </p>
          <p class="block text-lg font-bold text-gray-800 dark:text-white">{request.eventDate} </p>
          <p class="block text-lg font-bold text-gray-800 dark:text-white">{request.eventTime} </p>
         
        </div>

        <div class="mt-5">
        
          <form>
          
          <button class="py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={(e) =>{
           

            const prom = new Promise((resolve,reject) => {
              
              setRequestModalClose()
              resolve()
            })

            prom.then(() => {
              setIsLoading(true)
              console.log("success closing request modal")
            }).catch(
              console.log("failure closing request modal")
            )
          }}>
            Exit
            </button>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Access</label>
                <div class="relative">
                <p class="text-bold text-gray-200">
                  Current: {request.act}
                </p>
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Reservation</label>
                <div class="relative">
         
         
          <div class="flex">
                  

            <div class="flex mt-3">
                
                </div>
                  
                </div>
            </div>
            </div>
            <div class="flex">
              </div>
       
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      
      <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
        
        Contact us!
      </a>
    </p>
  </main>
        </div>
      </div>

*/
/*
<div id="extralarge-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-7xl md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Extra Large modal
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal" onClick={
                  (e) =>{
           

            const prom = new Promise((resolve,reject) => {
              
              setRequestModalClose()
              resolve()
            })

            prom.then(() => {
              setIsLoading(true)
              console.log("success closing request modal")
            }).catch(
              console.log("failure closing request modal")
            )
          }
                }>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-toggle="extralarge-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-toggle="extralarge-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
        </div>
    </div>
</div>


*/

const mapStateToProps = (state, props) => {
  const vis = state.requestModal.visibility;
  const request = state.requestModal.request;
  console.log("vis: " + vis);
  return {
    visibility: vis,
    request: request,
  };
};

export default connect(mapStateToProps)(RequestModal);
