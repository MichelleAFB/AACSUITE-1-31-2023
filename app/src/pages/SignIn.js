
//React
import React from "react";
import { Link } from "react";
import { useState } from "react";
import {useEffect} from 'react'
import { toast,ToastContainer } from "react-toastify";


//outside
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


//Icons
import visibilityIcon from "../assets/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
//import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

//import GoogleLogin from "react-google-login";

//redux
import {
  populateEvents,
  loadSelectEvent,
} from "../redux/events/events-actions";
import {
  addPublicEvent,
  addCompanyEvent,
} from "../redux/access/accessEvents-actions";
import { showTopNavbar,hideTopNavbar } from "../redux/topNavbar/topNavbar-action";
import { setEmployee } from "../redux/employee/employeeModal-actions";
import { setUser } from "../redux/user/user-action";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employee, setEmployee] = useState(false);
  const [employeeActive, setEmployeeActive] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [showEmployeeId, setShowEmployeeId] = useState(false);
  const [isLoading,setIsLoading] =useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[googleUserType,setGoogleUserType]=useState("client")
  const[googleUserEmployee,setGoogleUserEmployee]=useState(false)
  const[googleUserEmployeeId,setGoogleUserEmployeeId]=useState("")
  const[googleUserClient,setGoogleUserClient]=useState(true)
  const[googleUserAdmin,setGoogleUserAdmin]=useState(false)

  useEffect(() => {
    const prom=new Promise((resolve,reject) => {
      dispatch(hideTopNavbar())
     sessionStorage.removeItem('visibleNavbar')
      if(sessionStorage.getItem("client")!=null){
        sessionStorage.removeItem("client")
      }
      if(sessionStorage.getItem("employee")!=null){
        sessionStorage.removeItem("employee")
      }
      if(sessionStorage.getItem("admin")!=null){
        sessionStorage.removeItem("admin")
      }
      resolve()
    })

    prom.then(() => {
        setIsLoading(false)
    })
  })


 
 

  async function signin(e) {
    e.preventDefault();
   
    console.log("employeeId:"+ employeeId)
    axios
      .get("https://accserverheroku.herokuapp.com/publicEvents")
      .then((response) => {
        sessionStorage.setItem("publicEvents", JSON.stringify(response.data));
        console.log(response)
        response.data.map((o) => {
          dispatch(addPublicEvent(o));
        });
      });

    const storageEvents = [];
    const publicEvents = [];
    const prom = new Promise((resolve, reject) => {

    
      axios
        .get("https://accserverheroku.herokuapp.com/currentEvents")
        .then((response) => {
          console.log(response.data);

          console.log(response.data);

          response.data.map((o) => {
            const obj = {
              id: o.id,
              httpId: o.httpId,
              act: o.act,
              time: o.time,
              date: o.date,
              access: o.access,
              image: o.image,
            };

            if (obj.access == "company") {
              dispatch(addCompanyEvent(obj));
            }
           // console.log(obj);
            if (obj.access == "public") {
              //console.log(obj.access);
              publicEvents.push(obj);
            }
            storageEvents.push(obj);
          });
          resolve();
        });
    });

    prom.then(() => {
      dispatch(loadSelectEvent(storageEvents[0]));
      dispatch(populateEvents(storageEvents));
      
    });
    if(admin && employeeActive){
      toast.error("Please select wither admin or employee.If client select neither and proceed")
    }
    if (admin && employeeActive==false) {
     console.log({
      email: email,
      password: password,
      admin: admin,
    })
    
      await axios
        .post("https://accserverheroku.herokuapp.com/user/sign-in", {
          email: email,
          password: password,
          admin: admin,
        })
        .then((response) => {
          console.log("SIGNIN");
          console.log(response.data);
          if (response.data.loggedIn == true) {
            const admin=response.data.admin
            console.log(response.data)
            sessionStorage.setItem('admin',JSON.stringify(admin))
            sessionStorage.setItem("visibleNavbar",true)
            

            const prom= new Promise((resolve,reject) => {
              dispatch(setUser({user:response.data.admin,type:"admin"}))
              resolve()
            })

            prom.then(()=> {
             
          
              
              dispatch(showTopNavbar());
              
             navigate("/admin-home");
            })
           
          }
        });
    }if(employeeId=="" && employeeActive==true  && !admin){
      console.log("employee ID empty")
        toast.error("Please enter your employee identification")
    }
    if(employeeActive && !admin && employeeId!=" "){
      console.log({email:email,password:password})
      console.log("LOOG EMPLOY\n\n\n "+ employeeId)
       await axios.post("https://accserverheroku.herokuapp.com/user/sign-in/employee/"+employeeId,{email:email,password:password}).then((response) => {
        console.log(response.data)
        if(response.data.login ==true){
          console.log(response.data)
          const prom=new Promise((resolve,reject) => {
            dispatch(setUser({user:response.data.employee,type:"employee"}))
          //console.log(JSON.stringify(response.data.employee))
          sessionStorage.setItem("employee", JSON.stringify(response.data.employee))
          const employee=response.data.employee
          console.log(response.data.employee)
          console.log(employee)
       
          dispatch(setUser({user:response.data.employee,type:"employee"}))
          resolve()
            
          })

          prom.then(() => {
            
          
            dispatch(showTopNavbar());
            sessionStorage.setItem("visibleNavbar",true)
          navigate("/employee-home")
          })
        }
       })
    }
    if(admin==false && employeeActive==false){
      console.log({email:email,password:password})
      await axios
        .post("https://accserverheroku.herokuapp.com/user/sign-in", {
          email: email,
          password: password,
          admin: admin,
        })
        .then((response) => {
          if (response.data.loggedIn == true) {
            dispatch(setUser({user:response.data.client,type:"client"}))
            console.log("\n\n\n")
            //console.log(response.data)
            const client=response.data.client
            console.log("client")
            console.log(client)
            sessionStorage.setItem("client", JSON.stringify(response.data.client));
            dispatch(showTopNavbar());
            sessionStorage.setItem("visibleNavbar",true)
            navigate("/client-home");
          }
        });
    }
  }

  const signUpInstead = () => {
    navigate("/sign-up");
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  /**<img 
                className="showPassword"
                //src={visibilityIcon}
                alt="show password"
               /*onChange={onChange}
                onClick={()=>{
                  setShowPassword((prevState) =>!prevState)
                }}/> 
                 <Link 
                /*to='/forgot-password' 
                className='forgotPasswordLink'>
                Forgot Password
                </Link>
          
          <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
          </Link>
          
          */

  const onMutate = () => {
    setActive(!active);
    setAdmin(!admin);
    console.log(!admin);
  };

  console.log(employeeActive)
  const onMutateEmployee = () => {
    console.log("employee button")
    setEmployeeActive(!employeeActive);
    setEmployee(!employee);
    
  };

  function sayHello(){
    return "Hello " + this.name;
  }
          
  var obj = {name: "SANDYYYYYY"};
          
  sayHello.call(obj);

  

  //setInterval(waitForGoogle(),10000)
if(!isLoading){

  function add (a) {
    return function(b){
      return a + b;
    }
  }
  
  add(3)(4) 
  
  return (
    <div>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!!</p>
        </header>
        <main classname='m-4'>
          <form onSubmit={signin}>
          <div className='passwordInputDiv m-2'>
            <input
              id='email'
              className='bg-blue-100 p-2 rounded-md w-full'
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='Email'
            />
            </div>
            <div className='passwordInputDiv m-2'>
              <input
                type={showPassword ? "text" : "password"}
                className='bg-blue-100 p-2 rounded-md w-full'
                placeholder='Password'
                id='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <img
                className='showPassword'
                src={visibilityIcon}
                alt='show password'
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
                
       
            </div>
            {employeeActive ? (
              <div className="passwordInputDiv m-2">
                <input
                  type={showEmployeeId ? "text" : "password"}
                  class='bg-blue-100 p-2 rounded-md w-full'
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
                    setShowEmployeeId((prevState) => !prevState);
                  }}
                />
                </div>
             
            ) : (
              <p></p>
            )}
          

            <div className='signInBar'>
              <button
                className={active ? "formButtonActive" : "formButton"}
                type='button'
                id='parking'
                value={false}
                onClick={onMutate}
              >
                Admin
              </button>
              <button
                className={employeeActive ? "formButtonActive" : "formButton"}
                type='button'
                id='parking'
                value={false}
                onClick={onMutateEmployee}
              >
                Employee
              </button>
             
              <button className='signInButton' type='submit'>
                {<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />}
                <faCloudArrowUp/>
              </button>
             
             
           
              

          
            </div>
          </form>
          <div class="flex w-full justify-between">
                <button className='registerLink' onClick={signUpInstead}>
                  Sign Up Instead
                </button>
                <button  className='registerLink' onClick={forgotPassword}>
                  Forgot Password
                </button>
            </div>
          <ToastContainer/>
        </main>
        {<div class="flex-row-2 bg-gray-200 p-3 w-full rounded-md "> 
          
          <div class="flex">
          {googleUserEmployee? 
              <div>
                  <button class="bg-green-100 p-3 rounded-md m-2" onClick={()=>{
                     setGoogleUserType("client")
                      setGoogleUserEmployee(false)
                      console.log(googleUserType)
                    }}>
                      Employee
                  </button>
                  <input type="text" class="p-2 bg-gray-100 rounded-md" onChange={(e) => {
                        setGoogleUserEmployeeId(e.target.value)
                  }}/>
              </div>
              :
              <button class="bg-gray-100 p-3 rounded-md m-2" onClick={()=>{
                setGoogleUserType("employee")
                setGoogleUserEmployee(true)
                console.log(googleUserType)
              }}>
                Employee
              </button>
            }
              {googleUserAdmin? 
              <button class="bg-green-100 p-3 rounded-md m-2" onClick={()=>{
                setGoogleUserType("client")
                setGoogleUserAdmin(false)
                console.log(googleUserType)
              }}>
              Admin
              </button>
              :
              <button class="bg-gray-100 p-3 rounded-md m-2" onClick={()=>{
                setGoogleUserType("admin")
                setGoogleUserAdmin(true)
                console.log(googleUserType)
              }}>
                Admin
              </button>
            }
            </div>
              <div class="flex">
              {
              googleUserType=="client" && googleUserClient ?
                <a
                  href='https://accserverheroku.herokuapp.com/user/sign-in/auth/google'
                  class='btn red darken-1'>
                  Login with Google
                </a>:<a></a>
              }
              {
                googleUserType=="employee"&&googleUserEmployee ?
                <a
                href={'http://localhost:3002/auth/google/employee/'+googleUserEmployeeId}
                class='btn red darken-1'>
                Login with Google Employee
              </a>:
                  <a>
                  </a>
              }
                {
                googleUserType=="admin"&&googleUserAdmin ?
                <a
                href={'http://localhost:3002/auth/google/admin/'}
                class='btn red darken-1'>
                Login with Google Admin
              </a>:
                  <a> 
                </a>
              }
              </div>
              </div>
              }
      </div>
    
    </div>
  );
}}

export default SignIn;
