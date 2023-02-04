import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import { setClientModalClose } from "../redux/client/clientModal-actions";
import { reloadPage } from "../redux/reload/reload-actions";
import { motion } from "framer-motion";


function ClientM({visibility,ourEvent}) {

  console.log(visibility)

  console.log(ourEvent)
  return (
    <div class='bg-gray-200'>
      <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50 justify-items-center'>
          <div class="flex flex-col  justtify-items-center">
            {ourEvent.act}
          </div>
      </div>
    </div>

  )
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
export default connect(mapStateToProps)(ClientM)