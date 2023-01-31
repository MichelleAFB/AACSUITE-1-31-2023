import axios from 'axios'
import React from 'react'
import {useEffect,useState} from 'react'


function RecentChangesCard({title,changeType,width,color}) {

  const [changes,setChanges] = useState()
  const[isLoading,setIsLoading]=useState(true)
  const[ourTitle,setOurTitle]=useState()

  useEffect(() => {
    const change=[]

   const prom = new Promise((resolve,reject) => {
   
    axios.post("http://localhost:3002/getRecentChanges/"+changeType).then((response) => {
   setOurTitle(title)
    const data =response.data.changes
    data.map((r) => {
        change.push(r) 
    })
  })
    
  console.log(change)
    resolve()
   })

   prom.then(() => {
    
    setChanges(change)
    
    setIsLoading(false)
   })
   

  },[changeType])

  console.log("changes")
  console.log(changes)

  if(!isLoading ){
    console.log(changes)
    console.log(title)
    console.log(ourTitle)
  return (
    
    <div class={`rounded-md object-contain max-h-screen overflow-y-auto p-5 m-5 items-center ${color}`}>
      {ourTitle}
      <ul>
            {changes.map((m) => {
              console.log(changes)
              return (
                <li key={m.id} class='rounded-md m-2 p-3 bg-gray-200 shadow-md'>
                  <p  class='text-sm pb-3'>
                    
                  {m.message}
                  </p>
                  <p  class='text-md pb-3 font-bold'>
                    
                  {m.date} | {m.time}
                  </p>
                </li>
              );
            })}
            </ul>
            
          </div>
   
         
  )
          }
}

RecentChangesCard.defaultProps = {
  width:"full",
  changeType:"",
  color:"bg-gray-400",
  title:"Recent Changes"
  
}

export default RecentChangesCard