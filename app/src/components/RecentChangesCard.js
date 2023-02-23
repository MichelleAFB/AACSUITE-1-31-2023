import axios from 'axios'
import React from 'react'
import {useEffect,useState} from 'react'


function RecentChangesCard({title,changeType,width,color}) {

  const [changes,setChanges] = useState()
  const[isLoading,setIsLoading]=useState(true)
  const[ourTitle,setOurTitle]=useState()

  console.log(title)
  useEffect(() => {
    const change=[]
    

   const prom = new Promise((resolve,reject) => {
   
    axios.post("https://accserverheroku.herokuapp.com/getRecentChanges/"+changeType).then((response) => {
   setOurTitle(title)
    const data =response.data.changes
    data.map((r) => {
        change.push(r) 
    })

    
    resolve()
  })
    
 
    
   })

   prom.then(() => {
    
    
    const prom1=new Promise((resolve1,reject1) =>{
      console.log(change)
      setChanges(change)

      setTimeout(() =>{
        resolve1(changes)
      },1000)
      
    })

    prom1.then(()=>{
      console.log(changes)
      if(changes!=null){
        setIsLoading(false)
      }
    })
   
   })
   

  },[])

  console.log("changes")
  console.log(changes)
  
  if(!isLoading && changes){
    console.log(changes)
    console.log(title)
    console.log(ourTitle)
  return (
    
    <div class={`rounded-md object-contain max-h-screen overflow-y-auto p-5 m-5 items-center ${color}`}>
      {title}
      <ul>
            {changes.map((m) => {
              
              return 
                <li key={m.id} class='rounded-md m-2 p-3 bg-gray-200 shadow-md'>
                  <p  class='text-sm pb-3'>
                    
                  {m.message}
                  </p>
                  <p  class='text-md pb-3 font-bold'>
                    
                  {m.date} | {m.time}
                  </p>
                </li>
              ;
            })}
            </ul>
            
          </div>
   
         
  )
          }
}
console.log(RecentChangesCard.defaultProps)
RecentChangesCard.defaultProps = {
  width:"full",
  changeType:"",
  color:"bg-gray-400",
  title:"Recent Changes"
  
}

export default RecentChangesCard