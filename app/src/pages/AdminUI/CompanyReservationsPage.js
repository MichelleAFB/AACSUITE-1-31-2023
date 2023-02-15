import React from 'react'
import Carousel from '../../components/Carousel'
import {Link} from 'react-router-dom'

//components
import CompanyEditList from '../../components/CompanyEditList'


//
function CompanyReservationsPage() {
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
          
              <Link to="/admin-home">Manage dashboard</Link>
            </button>
            <button class="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <Link to="/admin-home">Go Back to dashboard</Link>
            </button>
          </div>
        </div>
   
        <div class="flex flex-col row-span-3 bg-white shadow rounded-lg">
            <div class="px-6 py-5 font-semibold border-b border-gray-100">Students by type of studying</div>
            
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
          
          <div class="flex bg-gray-400  bg-white h-300 shadow rounded-lg">
                <div class="flex-col w-full p-3">
                  <p class="text-center text-xl">Company </p>
                  <CompanyEditList/>
                </div>
          </div>
          
        </section>
       <div class="p-4 bg-gray-300">
          <Carousel/>
       </div>
         
        
   
      
       
       
   
       
       
      </main>
    </div>
   </body>
  )
}

export default CompanyReservationsPage