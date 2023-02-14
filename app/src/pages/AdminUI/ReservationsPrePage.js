import React,{useEffect,useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setCompanyRequests } from '../../redux/companyReservations/companyRequests-actions'
import axios from 'axios'

//components
import CompanyEditList from '../../components/CompanyEditList'
import TodayEventBox from '../../components/TodayEventBox'


function ReservationsPrePage() {

  const[isLoading,setIsLoading]=useState(true)

  const dispatch=useDispatch()

  useEffect(() =>{
    const eve=[]
    const prom=new Promise((resolve,reject) => {
      
      axios.get("http://localhost:3002/company/employee-occupied").then((response) => {
       console.log(response.data)
       const ev=response.data
        ev.map((m) => {
          if(!ev.includes(m.eventId)){
            console.log("\n\n")
            console.log(m)
            
            axios.get("http://localhost:3002/company/getEventRequests/"+m.eventId).then((response2) =>{
              console.log(response2.data.results)
              console.log(response2.data.results[0].employeeId)
              const requests=response2.data.results
              requests.map((r) =>{
                eve.push({eventId:r.eventId,requests:r})
              })
             
              console.log(eve)
          
              console.log(response2.data)
          
          })  
          }
        })

        
      })
     
      setTimeout(() =>{
        resolve(eve)
      },3000)
     
      
    

    })

    prom.then(() => {
      if(eve!=null){
        dispatch(setCompanyRequests(eve))
      }
      setIsLoading(false)
    })

  },[])


  const navigate=useNavigate()

  if(!isLoading){
    
  return (
    <body class="overflow-y-auto flex bg-gray-100 min-h-screen">
   
 <div class="flex-grow text-gray-800">

   <main class="p-6 sm:p-10 space-y-6">
     <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
       <div class="mr-6">
         <h1 class="text-4xl font-semibold mb-2">Handle Requests and Reservations</h1>
         <h2 class="text-gray-600 ml-0.5">Mobile UX/UI Design course</h2>
       </div>
       <div class="flex flex-wrap items-start justify-end -mb-3">
         <button class="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
           <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
           </svg>
           Manage dashboard
         </button>
         <button class="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
           <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
           </svg>
           Create new dashboard
         </button>
       </div>
     </div>

     <div class="flex flex-col row-span-3 bg-white shadow rounded-lg p-2">
         <TodayEventBox/>
         
       </div>

       <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 m-3">






</div>
     <section class="grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-1 xl:grid-flow-col gap-6">
       
       <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
       <div class="grid lg:grid-cols-2 md:grid-cols-1">
         <div class="p-4 flex-grow">
         
         </div>
         <div>
       
         </div>

         </div>
       </div>
     </section>
     <section class="grid grid-col-1">
   
     </section>
     <section class="grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-1 xl:grid-flow-col gap-6">
       
       <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
             <div class="flex">
               <Link to ="/admin-company-reservation" class="bg-blue-300 p-3 rounded-md m-4 w-1/2 shadow-xl" >
                  <p class="text-center text-xl">Company </p></Link>
               <Link to="/admin-reservations" class="bg-pink-300 p-3 rounded-md m-4 w-1/2  shadow-xl" ><p class="text-center text-xl">Public </p></Link>
             </div>
      
           <div class="flex p-4 flex-grow">
             <div class="flex">
               
             </div>
            
         </div>
       </div>
     </section>

   
    
    

    
     <section class="text-right font-semibold text-gray-500">
       <a href="#" class="text-purple-600 hover:underline">Recreated on Codepen</a> with <a href="https://tailwindcss.com/" class="text-teal-400 hover:underline">Tailwind CSS</a> by Azri Kahar, <a href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard" class="text-purple-600 hover:underline">original design</a> made by Chili Labs
     </section>
   </main>
 </div>
</body>
  )
}}

export default ReservationsPrePage