import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate,Link} from 'react-router-dom'

//outside
import axios from "axios";


//components
import EmployeeReservationList from "../../components/EmployeeReservationList";
import VoteOnMenuPage from "./VoteOnMenuPage";
import EmployeeModal from "../../components/EmployeeModal";
import TodayEventBox from "../../components/TodayEventBox";
import EventList from "../../components/EventList";

function EmployeeHome() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [menu, setMenu] = useState();
  const [employee, setEmployee] = useState();

  const [sandwhiches, setSandwhiches] = useState(false);
  const [starters, setStarters] = useState(false);
  const [sweets, setSweets] = useState(false);

  const [choiceSandwhich, setChoiceSandwhich] = useState();
  const [choiceStarter, setChoiceStarter] = useState();
  const [choiceSeet, setChoiceSweet] = useState();
  const [isLoadingMenu, setIsLoadingMenu] = useState();

  const [showMenu, setShowMenu] = useState();

  const menuVisible = useSelector((state) => state.employeeModal.showMenu);
  const navigate=useNavigate()
  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("employee")));
    const prom = new Promise((resolve, reject) => {
      setUser(JSON.parse(sessionStorage.getItem("employee")));
      resolve();
    });

    prom.then(() => {
      //setIsLoading(false)

      const menuItems = [];
      const prom1 = new Promise((resolve, reject) => {
        axios.get("https://accserverheroku.herokuapp.com/menu").then((response) => {
          setEmployee(JSON.parse(sessionStorage.getItem("employee")));
          if (!response) {
            console.log("SUMN WRONG");
          }
          const data = response.data.results;
          console.log(data);
          data.map((d) => {
            menuItems.push(d);
          });
          resolve();
        });
      });

      prom1
        .then(() => {
          setMenu(menuItems);
          setIsLoading(false);
        })
        .catch(() => {
          console.log("could not get menu");
        });
    });
  }, []);


  if (!isLoading) {
    return (
      <body class='overflow-y-auto flex bg-gray-100 min-h-screen'>
        <EmployeeModal />
        <div class='flex-grow text-gray-800'>
         
          <main class='p-6 sm:p-10 space-y-6'>
            <div class='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
              <div class='mr-6'>
                <h1 class='text-4xl font-semibold mb-2'>
                  Enjoy yourself <br /> ..on the House!
                </h1>
                <h2 class='text-gray-600 ml-0.5'></h2>
              </div>
              <div class='flex flex-wrap items-start justify-end -mb-3'>
                <button class='inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3'>
                  <svg
                    aria-hidden='true'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    class='flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                  Manage dashboard
                </button>
                <button class='inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3'>
                  <svg
                    aria-hidden='true'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    class='flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  Create new dashboard
                </button>
              </div>
            </div>

            <div class='flex flex-col row-span-3 bg-white shadow rounded-lg'>
              <div class='px-6 py-5 font-semibold border-b border-gray-100'>
                Today's Event
              </div>
              <TodayEventBox />
             
            </div>
           
            <div class='grid md:grid-cols-2 xl:grid-cols-2 gap-6 m-3'></div>
            <section class='grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-1 xl:grid-flow-col gap-6'>
              <div class='flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg'>
                <div class='grid lg:grid-cols-2 md:grid-cols-2'>
                  <div class='p-4 flex-grow'>
                   
                    <EmployeeReservationList/>
                 
                  </div>
                  <div>
                  <EventList listType={"company"} />
                    
                  </div>
                </div>
              </div>
            </section>
            <section class='grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-2 xl:grid-flow-col gap-6 '>
            <VoteOnMenuPage />
            </section>

         
          </main>
        </div>
      </body>
    );
  }
}

export default EmployeeHome;
