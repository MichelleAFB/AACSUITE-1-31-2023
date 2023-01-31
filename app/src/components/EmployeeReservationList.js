import React from 'react'
import {useState,useEffect} from 'react'
import {useSelector,connect} from 'react-redux'
import EventListItem from './EventListItem'
import EventModal from './EventModal'
import axios from 'axios'
import EmployeeReservationListItem from './EmployeeReservationListItem'



function EmployeeReservationList() {

  const [events,setEvents]=useState()
  const [isLoading,setIsLoading]=useState(true)
  const [access,setAccess]=useState("")
  const[accessPublic,setAccessPublic]=useState(false)
  const[accessPrivate,setAccessPrivate]=useState(false)
  const[accessCompany,setAccessCompany]=useState(false)
  const [accessChecked, setAccessChecked] = useState(false)
  const [reserved,setReserved]=useState()
  const[modalType,setModalType]=useState()
  
  
  
  
  const idReserved=[]
  useEffect(()=>{
    
    const prom= new Promise((resolve,reject) => {

      const employee=JSON.parse(sessionStorage.getItem("employee"))
      console.log(employee.id)
      axios.post("https://accserverheroku.herokuapp.com/company/employeeReservations/"+employee.id).then((response)=> {
        console.log(response.data)
        setFiltered(response.data)
     
      setEvents(response.data)
      if(sessionStorage.getItem("employee")!=null){
          setModalType("employee")
          console.log(sessionStorage.getItem("employee"))
      }
    
      resolve()
      
      })
      
      
    })

    prom.then(() => {
    
      setIsLoading(false)
    })
    
  },[])

  const [event,setEvent]=useState()
  const [filtered,setFiltered] = useState()
  console.log(filtered)
  
  const handleChange = (e) => {
      if(e.target.value==null || e.target.value==""){
        const fil=events
        setFiltered(events)
      }

      const fil=[]

      const prom = new Promise((resolve,reject) => {
        
      setFiltered([])
      events.map((ev) => {
       
      
        const str=e.target.value.toUpperCase()
        const evie=ev.act.toUpperCase()
        console.log(evie)
        console.log(str)
        const evieSplit=evie.split(" ")
        
        
        const eve=ev.act
        console.log("\n\n")
        console.log(eve)
        //console.log(eve)
        console.log(evie.includes(str))
        if(evie.includes(str)){
          evieSplit.map((o) => {
            if(o.includes(str)){
              //console.log(evie.includes(str))
              console.log(o)
              console.log("string:"+str)
              console.log("event:"+evie)
              console.log("\n\n")
              fil.push(ev)
            }
          })
          
        }
      })
      console.log(fil)
        resolve(fil)
      })

      prom.then(() => {
        setFiltered(fil)
        console.log("filtered should be")
        console.log(filtered)
    }).catch(
      console.log("filter not working")
    )   
  }

  
 
  
  


console.log(modalType)

if(!isLoading ){
  
  return (
    <div class=" component_list_grid items-center justify-around overflow-y-scroll w-full">
      <header class="text-4xl m-3">Your Reservations</header>
 
          
    <label class="px-3">
      <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
        placeholder="Search..." onChange={handleChange}/>
       
    </label>
    <ul class="mt-6 rounded-md p-10 ">
    {
              filtered.map((e) => {
             
                 return <li><EmployeeReservationListItem  modalType={modalType} key={e.id} event={e} /></li>
                })
               
            }
    </ul>
  </div>
  )
  }
  
}

const mapStateToProps = (state,props) => {
  const reload=state.reloadPage.reload
  console.log("vis: " + reload)
  return{
    reload:reload
  }
}

export default EmployeeReservationList;
