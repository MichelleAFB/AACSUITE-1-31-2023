import React from "react";
import Home3 from "../dumped/Home3";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelectedEventOccupied,
  resetSelectedSeats,
  updateSelectedEvent,
  updateSelectedEventOccupied,
  populateEvents,
} from "../features/events/selectedEventSlice";
import { visibleNavbar, hideNavbar } from "../features/navbar/navbarSlice";
import axios from "axios";

import { useNavigate } from "react-router-dom";
//import Alert from '../Context/Alert'

function PreHome() {
  const dispatch = useDispatch();
  const showNavbar = useSelector((state) => state.showNavbar.showNavbar);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  console.log(showNavbar);
  dispatch(visibleNavbar());

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3002/sendEventstoFront").then((r) => {
      const events = r.data;
      const ev = events[0];

      dispatch(updateSelectedEvent(ev));
      dispatch(populateEvents({ payload: events }));
      setIsLoading(false);
    });

    axios.get("http://localhost:3002/sendOccupiedtoFront").then((res) => {
      const occ = res.data;
      dispatch(updateSelectedEventOccupied(occ));
      setEvents(occ);
      setIsLoading2(false);
    });
  }, []);

  if (!isLoading && !isLoading2) {
    return (
      <div className='w-3/4  items-center justify-center mt-40 justify-self-center p-10 ml-20'>
        <div class='flex flex-nowrap '>
          <div class='w-1/2 flex-none p-2'>
            <div
              class='text-white text-center bg-blue-600 p-10 rounded-lg'
              onClick={() => {
                navigate("/admin-home");
              }}
            >
              Admin
            </div>
          </div>
          <div class='w-1/2 flex-none p-2'>
            <div
              class='text-white text-center bg-blue-600  rounded-lg p-10'
              onClick={() => {
                navigate("/home");
              }}
            >
              Client
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreHome;
