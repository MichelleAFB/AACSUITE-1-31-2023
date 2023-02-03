import React from 'react'

import { connect } from 'react-redux'

function Modal({visibility,ourEvent}) {
  return (
    <div class='bg-gray-200'>
        <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
        <p>hello</p>
        </div>
        </div>
   
  )
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