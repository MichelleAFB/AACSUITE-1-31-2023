import React from 'react'
import ShowCase from "../components/ShowCase"
import WelcomeEvents from '../components/WelcomeEvents'
import Arena from '../components/Arena'
import {useSelector,useDispatch} from 'react-redux'
import {updateSelectedEvent, updateSelectedEventOccupied} from '../features/events/selectedEventSlice'
import { useNavigate,useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {visibleNavbar,hideNavbar} from '../features/navbar/navbarSlice'
import axios from 'axios'
import { connect } from "react-redux";
import  { Component } from "react";
import reducer from '../features/events/reducer'

class Welcome extends Component(){

  
 
render(){
  return(
   <div>

   </div>
  )
}
}

export default Welcome
/*
<span className="count">{selectedSeats.length}</span> at a price of{" "}
<span className="total">
          {"Rs." + selectedSeats.length * selectedMovie.price}
        </span>
*/


