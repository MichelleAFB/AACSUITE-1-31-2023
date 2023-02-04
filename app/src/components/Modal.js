import React from 'react'

import { connect,useDispatch } from 'react-redux'
import {useState,useEffect} from 'react'
import { setModalClose } from '../redux/eventModal/eventModal-action'

//outside
import axios from 'axios'

function Modal({visibility,ourEvent}) {

  const [changedAccess, setChangedAccess] = useState();
  const [hasChanged, setHasChanged] = useState(false);
  const [editAccess, setEditAccess] = useState("");
  const[accessType,setAccessType] =useState()


  const [request,setRequests] =useState()
  const[isLoading,setIsLoading]=useState()
  const[event,setEvent]=useState()
  const[clientRequests,setClientRequests]=useState()
  const[isClientRequested,setIsClientRequested]=useState(false)
  const[clientRequestsLength,setClientRequestsLength]=useState()
  const[showRequests,setShowRequests] =useState(false)

  //client access Event modal window
  useEffect(() => {

    const access=ourEvent.event
    console.log(access)
  
    const prom = new Promise((resolve, reject) => {
      console.log("edit Event");
      console.log(ourEvent.event);
      const id = ourEvent.event.id;
      console.log(id);
      //TODO: CHANGE API CALL TO USE MODALEVENT NOT OUR EVENT
      axios
        .post("https://accserverheroku.herokuapp.com/getEventInfo/" + ourEvent.event.id)
        .then(async (response) => {
          console.log(response);
          setEvent(await response.data[0]);
          setAccessType(response.data[0].access)

          console.log("*****************OUR EVENT*******")
          console.log(event)
          //setIsLoading(false)
        });

   

      resolve();
    });

    prom.then(() => {
      const isClientRequested=false
      const prom1=new Promise((resolve1,reject1) => {
        axios.get( "http://localhost:3002/reservations/reservationsandrequests/public" +
    "/" +
    ourEvent.event.id).then((response) =>{
      console.log(response.data)
     
      if(response.data!=null){
        console.log("requests exists")
        setIsClientRequested(true)
        setClientRequests(response.data.requests)
        setClientRequestsLength(response.data.requests.length)
        console.log(response.data.requests.length)
      }
     
      resolve1()
      })
    })

    prom1.then(() =>{
      setIsLoading(false)

    })
    })
  

    
  },[visibility,ourEvent])

  const dispatch=useDispatch()
  if(visibility && !isLoading && accessType=="public"){
    console.log(isClientRequested)
    console.log(clientRequests)
    console.log( isClientRequested && clientRequestsLength>1 )
   
    if(isClientRequested && clientRequestsLength==1){
  return (
   
    <div class='bg-gray-200'>
        <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50 justify-items-center'>
          <div class="flex flex-col  justify-items-center bg-purple-400 p-10 rounded-md ">
            <div class="flex-col p-3">
              <p class="text-white text-lg"> {ourEvent.event.act}</p>
              {
                isClientRequested && clientRequestsLength==1 ?
                <div class="flex bg-gray-300 m-4 rounded-md p-2">
                
                </div>:
              <p>Not Reqeusted</p>
              }
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
           
          <button class="flex p-5  bg-green-400 rounded-md" onClick={()=>{
            dispatch(setModalClose())
        }}>
          <p>close modal</p>
        </button>
          </div>
       
        </div>
        </div>
   
  )
      }
      if(isClientRequested && clientRequestsLength>1){
        return (
         
          <div class='bg-gray-200'>
              <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50 justify-items-center'>
                <div class="flex flex-col  justify-items-center bg-purple-400 p-10 rounded-md ">
                  <div class="flex-col p-3">
                    <p class="text-white text-lg"> {ourEvent.event.act}</p>
                    {
                      isClientRequested && clientRequestsLength>1 ?
                      <div class="flex-col bg-gray-300 m-4 rounded-md p-2 justify-items-center">
                        <p class="text-red-600 font-bold text-center text-lg">RESERVED</p>
                        <button class="bg-purple-700 p-2 rounded-md" onClick={() => {
                          setShowRequests(!showRequests)
                        }}>
                          <p class="text-white">See Reservations</p>
                        </button>
                        {
                          showRequests?
                          <div>
                            {
                              clientRequests.map((m) =>{
                                <p>{}m.id</p>
                              })
                            }
                            </div>
                          :<p></p>
                        }
                      </div>:
                    <p>Not Reqeusted</p>
                    }
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
                 
                <button class="flex p-5  bg-green-400 rounded-md" onClick={()=>{
                  dispatch(setModalClose())
              }}>
                <p>close modal</p>
              </button>
                </div>
             
              </div>
              </div>
         
        )
            }
}
}
const mapStateToProps = (state, props) => {
  const vis = state.showModal.visibility;
  const event = state.showModal.event;
  console.log("vis: " + vis);
  return {
    visibility: vis,
    ourEvent: event,
  };
};

export default connect(mapStateToProps)(Modal) 