import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNotify } from "../context/ToastContext";
/*
 It's a React component that renders a Bootstrap Toast component. 
 The Toast component is controlled by the useNotify() hook. 
  The useNotify() hook is a custom hook that returns an object with two properties: 
  1. showController() - a function that sets the show property of the Toast component to true or
  false. 
  2. show - a boolean that determines whether the Toast component is shown or not. 
  3. data - an object that contains the heading and body of the Toast component.
  @returns The return value of the function is the value of the last expression evaluated. */

export default function Notify() {
  // const [show, setShow] = useState(false);

  const info = useNotify();
  
  return (
    <>
      <ToastContainer position='top-end'>
        <Toast onClose={() => info.showController(false)} show={info.show} delay={5000} autohide bg='success'>
          <Toast.Header>
            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
            <strong className="me-auto">{info.data.heading}</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>{info.data.body}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
