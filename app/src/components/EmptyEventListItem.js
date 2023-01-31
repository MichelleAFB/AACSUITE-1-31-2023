import React from 'react'

function EmptyEventListItem() {
  return (
    <div>
      <div class="py-5 border-b px-3 transition hover:bg-indigo-100 rounded-md bg-gray-100 m-3">
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">No Act | No Date | No Time</h3>
          <p class="text-md text-gray-400">23m ago</p>
        </a>
        <button class="bg-gray-400 p-2 rounded-md" >
          No Events today
         
        </button>
        
      </div>
      </div>
  )
}

export default EmptyEventListItem