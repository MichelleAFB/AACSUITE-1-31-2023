import React from 'react'
import {setAccessTypeModalOpen,editEventAccessType} from '../redux/eventModal/eventModal-action'

import {useSelector,useDispatch} from 'react-redux'
import {useState,useEffect} from 'react'

function EventAccesstypeModal() {

  const modalOpen= useSelector((state) => state.showModal.visibilityAccessModal)
  console.log(modalOpen)
  const accessEvent=useSelector((state) => state.showModal.event)

  const [open,setOpen]=useState()
  const [event,setEvent] =useState()
  const [isLoading,setIsLoading] =useState(true)

  

  const dispatch=useDispatch()
  
  useEffect((openModal) => {
      
    const prom = new Promise((resolve,reject) => {
      setOpen(modalOpen)
      console.log("access modal open")
      console.log(open)
      setEvent(accessEvent)
      resolve()
    })

    prom.then(() => {
      console.log(open)
      console.log("INSIDE OTHER MODUAL")
      setIsLoading(false)
    })
  },[modalOpen])

  if(isLoading==false && open==true){
    return (
      <div class="bg-gray-200">
    <div class="h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50">
        <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-100">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <p class="mt-2 text-sm text-gray-600 font-bold dark:text-gray-400">Edit </p>
          <p class="block text-xl font-bold text-gray-800 dark:text-white">{event.act} </p>
          <p class="block text-lg font-bold text-gray-800 dark:text-white">{event.date} </p>
          <p class="block text-lg font-bold text-gray-800 dark:text-white">{event.time} </p>
         
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Access</label>
                <div class="relative">
                <button class="w-1/2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={(e) => {
                  e.preventDefault()
                  dispatch(setAccessTypeModalOpen(true))
                  

                }}> {event.access}</button>
                </div>
              </div>
              
              <div class="flex">
              </div>
              <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        View Github
      </a>
      <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
        
        Contact us!
      </a>
    </p>
  </main>
        </div>
      </div>
  
    )
  }
 
}

export default EventAccesstypeModal