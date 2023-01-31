//react
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
//outside
import axios from "axios";

//icons
import { ReactComponent as ArrowRightIcon } from "../assets/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/visibilityIcon.svg";

function SignUp() {
  const navigate = useNavigate();
  

  //const{first,last,email,password,password2}=formData

  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const [employee, setEmployeeId] = useState();
  const [employeeActive, setEmployeeActive] = useState(false);
  const [showEmployeeId, setShowEmployeeId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const form = useRef();

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    password2: "",
    message:"Thank you for setting up your account for AAC dallas private flagship suite! We look forward to hosting you next experience at the American Airlines Center at Dallas."
  });

  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onMutateEmployee = () => {
    setEmployeeActive(!employeeActive);
    setShowEmployeeId(!showEmployeeId);
  };

  const signUp = (e) => {
    console.log(formData);
    console.log("***SIGNUP NEW USER(SIGN_UP.JS)*****");
    console.log(password);
    console.log(password2);
    if (password != password2) {
      alert("passwords do not match!");
    } else {
      console.log(email);
      axios
        .post("http://localhost:3002/user/sign-up", {
          first: first,
          last: last,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
        });
    }
    sendEmail(e);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("testing emailjs functionality");
    console.log(formData.email);
    console.log(e.target);
    emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        e.target,
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
  };

  

  const signInInstead = () => {
    navigate("/");
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Sign Up</p>
      </header>
      <main className='m-4'>
        <form ref={form} onSubmit={signUp} class='mb-10'>
          <input
            type='text'
            name='first'
            placeholder='First...'
            className='emailInput'
            onChange={(e) => {
              setFirst(e.target.value);
            }}
            value={first}
          />

          <input
            type='text'
            name='last'
            placeholder='Last...'
            className='emailInput'
            onChange={(e) => {
              setLast(e.target.value);
            }}
          />

          <input
            type='email'
            name='email'
            placeholder='Email...'
            className='emailInput'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              className='passwordInput'
              placeholder='Password...'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              className='showPassword'
              src={visibilityIcon}
              alt='show password'
              onChange={onChange}
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            />
          </div>
          <div className='passwordInputDiv'>
            <input
              type={showPassword2 ? "text" : "password"}
              name='password2'
              className='passwordInput'
              placeholder='Confirm Password...'
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <img
              className='showPassword'
              src={visibilityIcon}
              alt='show password'
              onChange={onChange}
              onClick={() => {
                setShowPassword2((prevState) => !prevState);
              }}
            />
          </div>
          <img
            className='showPassword'
            src={visibilityIcon}
            alt='show password'
            onClick={() => {
              setShowEmployeeId((prevState) => !prevState);
            }}
          />
          {employeeActive ? (
            <div className='passwordInputDiv'>
              <input
                type={showEmployeeId ? "text" : "password"}
                className='passwordInput'
                placeholder='Employee Id..'
                id='password'
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
              />
              <img
                className='showPassword'
                src={visibilityIcon}
                alt='show password'
                onClick={() => {
                  setShowEmployeeId(!showEmployeeId);
                }}
              />
            </div>
          ) : (
            <p></p>
          )}
          <button
            className={employeeActive ? "formButtonActive" : "formButton"}
            type='button'
            id='parking'
            value={false}
            onClick={onMutateEmployee}
          >
            Employee
          </button>
          <input hidden={true} value="Thank you for setting up your account for AAC dallas private flagship suite! We look forward to hosting you next experience at the American Airlines Center at Dallas." name="message"/>
          <div className='signInBar'>
            
            <input className='signInButton' type='submit' value='Sign Up'  />
            {/*<ArrowRightIcon fill='bg-green-400' width='34px' height='34px' />*/}
            <faCloudArrowDown/>

            <button className='registerLink ml-5' onClick={signInInstead}>
              Sign In Instead
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
/*
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








*/
/*
<form ref={form} onSubmit={sendEmail}>
        
        <input 
         id="first"
         className="emailInput"
         type="text"
         name="first"
         placeholder="First"
         value={first}
         onChange={onChange}/>
        <input 
         id="last"
         className="emailInput"
         name="last"
         type="text"
         placeholder="Last"
         value={last}
         onChange={onChange}/>
       <input 
         id="email"
         className="emailInput"
         type="text"
         placeholder="Email"
         name="email"
         value={email}
         onChange={onChange}/>
       <div className="passwordInputDiv">
         <input
           type={showPassword? 'text':'password'}
           className='passwordInput'
           placeholder="Password"
           id='password'
           value={password}
           onChange={onChange}
           />
           <img 
             className="showPassword"
             src={visibilityIcon}
             alt="show password"
             onChange={onChange}
             onClick={()=>{
               setShowPassword((prevState) =>!prevState)
             }}/>
       </div>
       <div className="passwordInputDiv">
         <input
           type={showPassword? 'text':'password'}
           name="password"
           className='passwordInput'
           placeholder="Confirm Password"
           id='password2'
           value={password2}
           onChange={onChange}
           />
           <img 
             className="showPassword"
             src={visibilityIcon}
             alt="show password"
             onChange={onChange}
             onClick={()=>{
               setShowPassword((prevState) =>!prevState)
             }}/>
       </div>
        <img 
              className="showPassword"
              src={visibilityIcon}
                 alt="show password"
                 onClick={()=>{
                    setShowEmployeeId((prevState) =>!prevState)
                  }}/>
          {employeeActive? <div className="passwordInputDiv">
            <input
              type={showPassword? 'text':'password'}
             
              className='passwordInput'
              placeholder="Employee Id.."
              id='password'
              onChange={(e)=>{
                setEmployeeId(e.target.value)
              }}
             />
             <img 
             className="showPassword"
             src={visibilityIcon}
             alt="show password"
             onClick={()=>{
               setShowEmployeeId((prevState) =>!prevState)
             }}/> 
              
            </div>: <p></p>}
            <button
                className={employeeActive ?'formButtonActive': 'formButton'}
                type="button"
                id="parking"
                value={false}
                onClick={onMutateEmployee}>
                   Employee
              </button>
       
         <div className="signInBar">
           <p className="signInText">
             Sign Up
           </p>
           <input className="signInButton" type="submit" onClick={signUp}/>
             <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
           
           
           <button className='registerLink' onClick={signInInstead}>
            Sign In Instead
          </button>
         </div>
     </form>


*/
