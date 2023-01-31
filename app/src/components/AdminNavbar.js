import {useNavigate, useLocation} from 'react-router-dom'
import React from 'react'
import {useState,useEffect} from 'react'

function AdminNavBar() {

  const navigate= useNavigate()
  const location = useLocation()

  const[visible,setVisible]=useState(sessionStorage.getItem("visibleAdminNavbar"))
  console.log(visible)
  const[isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    if(visible==null){

    }else{
      setIsLoading(false)

    }

  },[])

  const pathMatchRoute = (route) => {
    if(route == location.pathname){
      return true
    }
  }

  if(!isLoading){
  return (
    <footer className="navbar">
    <nav className="navbarNav bg-green-200">
      <ul className="navbarListItems">
        <li className="navbarListItem" onClick={() => navigate('/')}>
          
          <p className={pathMatchRoute('/'? 'navbarListItemNameActive':'navbarListItemName')}>Reserve</p>
        </li>
        <li className="navbarListItem" onClick={() => navigate('/offers')}>
          
          <p className={pathMatchRoute('/offers'? 'navbarListItemNameActive':'navbarListItemName')}>Offers</p>
        </li>
        <li className="navbarListItem" onClick={() => navigate('/profile')}>
          
          <p className={pathMatchRoute('/profile'? 'navbarListItemNameActive':'navbarListItemName')}>Profile</p>
        </li>

      </ul>
    </nav>
  </footer>
  )
}
}

export default AdminNavBar