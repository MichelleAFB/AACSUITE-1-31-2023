import React from 'react'

function List({width,color,title,children}) {
  return (
    <div class={`component_list${width=="full"? "_full":" "} items-center justify-around overflow-y-scroll w-full ${color}`}>
      <header class="text-4xl m-3">{title}</header>
 
          
    <label class="px-3">
      <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
        placeholder="Search..." onChange={handleChange}/>
       
    </label>
    <ul class="mt-6 rounded-md p-10">
    {
              children.map((e) => {
             
                return <li><EventListItem  key={e.id} event={e}/></li>
                })
            }
    </ul>
    </div>
  )
}

export default List