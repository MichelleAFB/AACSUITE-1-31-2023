import React from 'react'
import EventListFull from '../../components/EventListFull'
import EventsList from '../../components/EventList'
import TodayEventBox from '../../components/TodayEventBox'
import { ArrowBack } from '@material-ui/icons'
import { FaAccessibleIcon,FaArrowCircleLeft } from 'react-icons/fa'
import { Link ,useNavigate} from 'react-router-dom'
function EventsPage() {

  const navigate=useNavigate()
  return (
    <body class="flex bg-gray-100 min-h-screen">
 
    <div class="flex-grow text-gray-800">
      
      <main class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div class="mr-6">
            <h1 class="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 class="text-gray-600 ml-0.5">Mobile UX/UI Design course</h2>
          </div>
          <div class="flex flex-wrap items-start justify-end -mb-3">
            <button class="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3" onClick={()=> {
              navigate("/admin-home")
            }} >
              
              Go back to main dashboard
            </button>
            <button class="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              
              Create new dashboard
            </button>
          </div>
        </div>

        <div class="flex flex-col row-span-3 bg-white shadow rounded-lg">
            
              <TodayEventBox/>
            
          </div>

          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 m-3">


<div class="flex items-center p-4 bg-white shadow rounded-lg">
  <div class="grid grid-cols-1">
  <EventsList listType={"public"}/>
  </div> 
</div>

<div class="flex items-center p-4 bg-white shadow rounded-lg">
  <div>
    <EventsList listType={"private"}/>
  </div>
</div>
<div class="flex items-center p-4 bg-white shadow rounded-lg">
  <div>
    <EventsList listType={"company"}/>
  </div>
</div>



</div>
        <section class="grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-1 xl:grid-flow-col gap-6">
          
          <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div class="p-4 flex-grow">
            <EventListFull listType={"current"}/>
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
}

export default EventsPage


/**
 * card
 * 
 * <div class="flex items-center p-8 bg-white shadow rounded-lg">
 
</div>
 */