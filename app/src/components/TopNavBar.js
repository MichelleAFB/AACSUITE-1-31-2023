import React from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import{visibleNavbar,hideNavbar} from '../features/navbar/navbarSlice'
import { useSelector, useDispatch,connect} from "react-redux"
import { Layout } from "antd";


import {useState,useEffect} from 'react'
import { FaGenderless } from 'react-icons/fa';
import { showTopNavbar } from '../redux/topNavbar/topNavbar-action';


function TopNavBar({visibility,usere}) {
  //retrieve navbar state from store
  const showNavbar = useSelector((state) => state.showNavbar.showNavbar)
  const dispatch = useDispatch()
  //const [type,setType]=useState()
  const[isLoading,setIsLoading] =useState(true)
  const[employee,setEmployee]=useState()
  const[client,setClient]=useState()
  const[admin,setAdmin]=useState()
  const[employeeExist,setEmployeeExist]=useState(false)
  const[clientExist,setClientExist]=useState(false)
  const[adminExist,setAdminExist]=useState(false)
  const[type,setType]=useState()
  const { Header,Menu,AppHeader } = Layout;

  //const [show,setShow]=useState(showNavbar)
  const location = useLocation()
  const navigate=useNavigate()

  console.log(JSON.parse(sessionStorage.getItem('client')))
  console.log(typeof(JSON.parse(sessionStorage.getItem('client'))))
  
  console.log("TOPNAVBAR")
    const ad=JSON.parse(sessionStorage.getItem('admin'))
    const c=sessionStorage.getItem('client')
    const cli=JSON.parse(c)
    const emp=JSON.parse(sessionStorage.getItem('employee'))
    console.log("emp")
    console.log(emp)
    console.log("client")
    console.log(cli)
  useEffect(() =>{
    console.log("TOPNAVBAR")
   
    const visible=JSON.parse(sessionStorage.getItem("showTopNavBar"))
    if(visibility==true){
    if(emp!="null"){
    
      const prom= new Promise((resolve,reject) => {
        setEmployee(emp)
        console.log("employee topnav")
        console.log(employee)
        setType("employee")
        setEmployeeExist(true)
        resolve()

      })

      prom.then(() => {
        setIsLoading(false)
      })
      
    }
    if(cli!=null){
      const prom= new Promise((resolve,reject) => {
        setClient(cli)
        console.log("client topnavBar")
        console.log(client)
        setType('client')
        setClientExist(true)
        resolve()

      })

      prom.then(() => {
        setIsLoading(false)
      })
    }if(ad!=null){
      const prom= new Promise((resolve,reject) => {
        setAdmin(ad)
        console.log(admin)
        setType("admin")
        setAdminExist(true)
        resolve()

      })

      prom.then(() => {
        const visible=JSON.parse(sessionStorage.getItem('visibleNavbar'))
        if(visible==true){
          setIsLoading(false)
        }
       
      })
    }}
   
  },[visibility])

 

  const pathMatchRoute = (route) => {
    if(route == location.pathname){
      return true
    }
  }
  /*
    store a variable in the app store that stores if topbar show be visible

  */
 const logout =() => {
  dispatch(hideNavbar())
  console.log("inside logout: " + showNavbar)
  setTimeout(function(){
    window.location="http://localhost:3000"
    //window.location="http://localhost:3002/auth/logout"
  },1000)
 }
    //const showTopNavbar= useSelector((state))

    console.log(visibility)
  if(visibility==true && !isLoading){
    console.log(employee)
    console.log(admin)

  if(type=="admin" && !isLoading){
    return (
      
        <header class="flex mr-0 items-center h-20 px-6 sm:px-10 bg-gray-200 justify-between gap-x-20 ">
            <button class="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
              <span class="sr-only">Menu</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <div class="relative w-full max-w-md sm:-ml-2 md:ml-10 p-5">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
              <input type="text" role="search" placeholder="Search..." class="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
            </div>
            <div class="flex justify-end  flex-shrink-0 items-center ml-auto">
              <button class="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                <span class="sr-only">User Menu</span>
                <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
                  <span class="font-semibold"></span>
                  <span class="text-sm text-gray-600">{admin.firstname+" "+admin.lastname}</span>
                </div>
                <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                  <FaGenderless/>
                </span>
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="hidden sm:block h-6 w-6 text-gray-300 mr-6">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg> 
              </button>
              <div class="flex justify-end border-l pl-3 ml-7 space-x-1">
                <button class="relative p-2 text-purple-900 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full " >
                  
                  <span class="sr-only">Notifications</span>
                  <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                  <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full" onClick={() => {
                  console.log("CLICK")
                  navigate("/")
                }}>
                  <span class="sr-only">Log out</span>
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
                </button>
              </div>
            </div>
          </header>
   
    )
  }if(type=="employee" && !isLoading && employee!=null){
    console.log(employee)
    console.log("\n\n\n")
    return (
      <header class="flex mr-0 items-center h-20 px-6 sm:px-10 bg-gray-200 justify-between gap-x-20">
          <button class="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
            <span class="sr-only">Menu</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div class="relative w-full max-w-md sm:-ml-2 md:ml-10">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <input type="text" role="search" placeholder="Search..." class="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
          </div>
          <div class="flex justify-end  flex-shrink-0 items-center ml-auto">
            <button class="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
              <span class="sr-only">User Menu</span>
              <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span class="font-semibold"></span>
                <span class="text-sm text-gray-600">{employee.firstname+" "+employee.lastname}</span>
              </div>
              <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user profile photo" class="h-full w-full object-cover"/>
              </span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="hidden sm:block h-6 w-6 text-gray-300">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg> 
            </button>
            <div class="flex justify-end border-l pl-3 ml-3 space-x-1">
              <button class="relative p-2 text-purple-900 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full " >
                
                <span class="sr-only">Notifications</span>
                <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full" onClick={() => {
                console.log("CLICK")
                navigate("/")
              }}>
                <span class="sr-only">Log out</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
              </button>
            </div>
          </div>
        </header>
    )
  }
  else if(!isLoading && type=="client"){ 
  return (
    <header class="flex mr-0 items-center h-20 px-6 sm:px-10 bg-gray-200 justify-between gap-x-20">
        <button class="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
          <span class="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <div class="relative w-full max-w-md sm:-ml-2 md:ml-10">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input type="text" role="search" placeholder="Search..." class="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
        </div>
        <div class="flex justify-end  flex-shrink-0 items-center ml-auto">
          <button class="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
            <span class="sr-only">User Menu</span>
            <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <span class="font-semibold"></span>
              <span class="text-sm text-gray-600">{client.firstname+" "+client.lastname}</span>
            </div>
            <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user profile photo" class="h-full w-full object-cover"/>
            </span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="hidden sm:block h-6 w-6 text-gray-300">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg> 
          </button>
          <div class="flex justify-end border-l pl-3 ml-3 space-x-1">
            <button class="relative p-2 text-purple-900 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full " >
              
              <span class="sr-only">Notifications</span>
              <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
              <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full" onClick={() => {
              console.log("CLICK")
              navigate("/")
            }}>
              <span class="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
            </button>
          </div>
        </div>
      </header>
  )
      }
  }
}


const mapStateToProps = (state, props) => {
  console.log(state)
  const vis = state.topNavbar.visibility;
  const user=state.user.user
  const type=state.user.type
  console.log(user)
  console.log(type);
  return {
    visibility: vis,
    user:user,
    type:type
  };
};

export default connect(mapStateToProps)(TopNavBar)

/*
<header class="flex items-center h-20 px-6 sm:px-10 bg-white">
        <button class="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
          <span class="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <div class="relative w-full max-w-md sm:-ml-2">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input type="text" role="search" placeholder="Search..." class="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
        </div>
        <div class="flex flex-shrink-0 items-center ml-auto">
          <button class="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
            <span class="sr-only">User Menu</span>
            <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <span class="font-semibold">Grace Simmons</span>
              <span class="text-sm text-gray-600">Lecturer</span>
            </div>
            <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user profile photo" class="h-full w-full object-cover"/>
            </span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="hidden sm:block h-6 w-6 text-gray-300">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg> 
          </button>
          <div class="border-l pl-3 ml-3 space-x-1">
            <button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span class="sr-only">Notifications</span>
              <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
              <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span class="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
            </button>
          </div>
        </div>
      </header>


*/


/*
  if(showNavbar==true && !isLoading){
  if(type=="admin"){
    return (
      <div className="top_navbar">
       <nav className="top_navbarNav">
      <ul className="top_navbarListItems">
        <li className="top_navbarListItem" onClick={() => navigate('/')}>
          
          <p className={pathMatchRoute('/home'? 'top_navbarListItemNameActive':'top_navbarListItemName')}>Home</p>
        </li>
    
        <li className="top_navbarListItem" onClick={() => navigate('/profile')}>
          
          <p className={pathMatchRoute('/auth/logout'? 'top_navbarListItemNameActive':'top_navbarListItemName')} onClick={()=> {
           
          }}><a  onClick={logout}>Sign Out</a></p>
        </li>
  
      </ul>
    </nav>
    </div>
    )
  }
  else{
  return (
    <div className="top_navbar">
     <nav className="top_navbarNav">
    <ul className="top_navbarListItems">
      <li className="top_navbarListItem" onClick={() => navigate('/')}>
        
        <p className={pathMatchRoute('/home'? 'top_navbarListItemNameActive':'top_navbarListItemName')}>Reserve</p>
      </li>
      <li className="top_navbarListItem" onClick={() => navigate('/offers')}>
        
        <p className={pathMatchRoute('/user-events'? 'top_navbarListItemNameActive':'top_navbarListItemName')}><a  href="/userData/userEvents">Your Events</a></p>
      </li>
      <li className="top_navbarListItem" onClick={() => navigate('/profile')}>
        
        <p className={pathMatchRoute('/auth/logout'? 'top_navbarListItemNameActive':'top_navbarListItemName')} onClick={()=> {
         
        }}><a  onClick={logout}>Sign Out</a></p>
      </li>

    </ul>
  </nav>
  </div>
  )
      }
  }
}


*/