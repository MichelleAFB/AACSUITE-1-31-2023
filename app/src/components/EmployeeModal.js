import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setEmployeeModalClose,setMenuVisible } from "../redux/employee/employeeModal-actions";
import emailjs from "@emailjs/browser";
import {ToastContainer,toast} from "react-toastify"

function CompanyMenu({ visibility, event }) {
  const [employee, setEmployee] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [allSeats, setAllSeats] = useState();
  const [updateSeats, setUpdateSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState();

  const [approveData, setApproveData] = useState();
  const approveForm = useRef();

  const dispatch = useDispatch();

  const modalEvent = useSelector((state) => state.employeeModal.event);
  const modalOpen = useSelector((state) => state.employeeModal.visibility);
  console.log(modalOpen);

  const navigate = useNavigate();
  useEffect(() => {
    const seats = [];
    const reserved = [];
    const prom = new Promise((resolve, reject) => {
      setEmployee(JSON.parse(sessionStorage.getItem("employee")));
      console.log(employee);
      

      setTimeout(()=>{
        console.log(event.event)
        console.log(event)
        const id=event.event.id
      
      axios
        .post("https://accserverheroku.herokuapp.com/getOccupiedEmployee/" + id)
        .then((response) => {
          console.log(response.data);
          const data = response.data.occupied;

          data.map((s) => {
            console.log(s);
            reserved.push(s.seat);
            console.log(reserved);
          });
        });
      },500)
      resolve();
    });
    console.log(event)

    prom.then(() => {
      setApproveData({
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
        message:
          " We are please to inform you the reservation request has been approved!. Reservation details: " +
          event.event.act +
          " | " +
          event.event.date +
          " | " +
          event.event.time,
      });
      console.log("reserved");
      console.log(reserved);
      const prom1 = new Promise((resolve, reject) => {
        var j = 0;
        console.log(reserved);
        if (reserved.length > 0) {
          console.log("RESERVED NOT NULL");
          console.log(reserved);
          while (j < 40) {
            console.log(reserved.includes(j));
            if (!reserved.includes(j)) {
              seats.push({ seat: j, selected: false });
            } else {
              seats.push({ seat: j, reserved: true });
            }

            j++;
          }
        } else {
          var j = 0;
          while (j < 40) {
            seats.push({ seat: j, selected: false });
            j++;
          }
        }

        console.log(seats);
        resolve();
      });

      prom1.then(() => {
        console.log(seats);
        setReservedSeats(reserved);

        setAllSeats(seats);
        console.log(reserved);

        console.log(allSeats);
        setIsLoading(false);
      });
    });
  }, [visibility,event]);

  async function sendEmail(form) {
    console.log(form.current);
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
          console.log(result);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }



  if (!isLoading && modalOpen) {
  
    return (
      <div class='bg-gray-200'>
        <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
          <main id='content' role='main' class='w-full max-w-md mx-auto '>
            <div class=' bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-5'>
              <div class='p-4 sm:p-7'>
                <div class='text-center'>
                  <p class='mt-2 text-sm text-gray-600 font-bold dark:text-gray-400'>
                    Request a reservation{" "}
                  </p>
                  <p class='block text-xl font-bold text-gray-800 dark:text-white'>
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
                </div>

                <div class='mt-5'>
                  <form>
                    <div class='grid gap-y-4'>
                      <div>
                        <div class='relative'></div>
                      </div>
                      <div>
                        <label
                          for='email'
                          class='block text-sm font-bold ml-1 mb-2 dark:text-white'
                        >
                          {event.event.act} | {event.event.date} |{" "}
                          {event.event.time}
                        </label>
                        <div class='relative'>
                          <div class='flex'>
                            <div class='flex mt-3 mb-5'>
                              {
                                <div class='seats'>
                                  {allSeats.map((s) => {
                                    console.log(reservedSeats.includes(s.seat));
                                    if (reservedSeats.includes(s.seat)) {
                                      return (
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            console.log("\n\n\n\n\n\n");

                                            console.log(
                                              reservedSeats.includes(s)
                                            );
                                            setUpdateSeats(!updateSeats);
                                            s.selected = !s.selected;
                                            
                                          }}
                                          class='seat occupied'
                                        >
                                          <p class='text-white'>{s.seat}</p>
                                        </button>
                                      );
                                    } else if (s.hasOwnProperty("selected")) {
                                     
                                      if (s.selected == false) {
                                        return (
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              console.log("\n\n\n\n\n\n");

                                              console.log(
                                                reservedSeats.includes(s)
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

                                              s.selected = !s.selected;
                                              console.log(allSeats);
                                            }}
                                            class='seat selected '
                                          >
                                            <p>{s.seat}</p>
                                          </button>
                                        );
                                      }
                                    }
                                  })}
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='flex'>
                        <form ref={approveForm}>
                          <input
                            name='first'
                            class='hidden'
                            value={approveData.firstname}
                          />
                          <input
                            name='last'
                            class='hidden'
                            value={approveData.lastname}
                          />
                          <input
                            name='email'
                            class='hidden'
                            value={approveData.email}
                          />
                          <input
                            name='subject'
                            class='hidden'
                            value={approveData.subject}
                          />
                          <input
                            name='message'
                            class='hidden'
                            value={approveData.message}
                          />
                          <button
                            class='py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("CLICK");
                              console.log(updateSeats);
                              const sendSeats = [];
                              const prom = new Promise((resolve, reject) => {
                                console.log(allSeats);
                                allSeats.map((m) => {
                                  if (m.selected == true) {
                                    sendSeats.push(m);
                                  }
                                });
                                if (
                                  employee.email != "" &&
                                  employee.phone != ""
                                ) {
                                  console.log("sending reservation");

                                  /* axios.post("http://localhost:3002/reservations/reservationRequests",{event,phone:employee.phone,email:employee.email,name:sessionStorage.getItem("name")}).then((response) => {
                     console.log(response)

                     resolve()
                   })
                   */
                                  resolve();
                                }
                              });

                              prom
                                .then(() => {
                                  console.log("sent");
                                    const emp=sessionStorage.getItem("employee")
                                    const employ=JSON.parse(emp)
                                    const employee=employ
                                    console.log(employee)
                                  const prom1 = new Promise(
                                    (resolve, reject) => {
                                      sendSeats.map((m) => {
                                        axios
                                          .post(
                                            "https://accserverheroku.herokuapp.com/setOccupiedEmployee",
                                            {
                                              eventId: event.event.id,
                                              employeeId: employee.id,
                                              act: event.event.act,
                                              seat: m.seat,
                                            }
                                          )
                                          .then((response) => {
                                            console.log(employee)
                                            if (
                                              response.data.success == false
                                            ) {
                                              alert(
                                                "Could not reserve seat: " +
                                                  m.seat
                                              );
                                            } else if (
                                              response.data.success == true
                                            ) {
                                              
                                              sendEmail(approveForm);
                                            }
                                          });
                                      });
                                     resolve();
                                    }
                                  );

                                  prom1.then(() => {
                                    setTimeout(() => {
                                      setIsLoading(true);
                                      dispatch(setMenuVisible())
                                      dispatch(setEmployeeModalClose());
                                      
                                    }, 500);
                                  });
                                })
                                .catch((err) => {
                                  console.log(err);
                                  console.log(sendSeats);
                                });
                            }}
                          >
                            confirm
                          </button>
                        </form>
                        <button
                          class='py-3 px-4 inline-flex mr-5 ml-5 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                          onClick={(e) => {
                            setIsLoading(true);
                            dispatch(setEmployeeModalClose());
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
                          <ToastContainer/>
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
}
const mapStateToProps = (state, props) => {
  //const vis=state.employeeModal.visibility
  const event = state.employeeModal.event;
  const vis = state.employeeModal.visibility;
  console.log("vis: " + vis);
  return {
    visibility: vis,
    event: event,
  };
};

export default connect(mapStateToProps)(CompanyMenu);
