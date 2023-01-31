import React, { useEffect } from 'react'
import {useState} from 'react'
function EventBox({id,act,date, time}) {
  const [past,setPast]=useState(false)
  

  useEffect(() => {
    const d=new Date().toString()
  const newDate=d.split(' ')
  const edate=date.split(' ')
  const y=edate[1]
  const eDay=y.substring(0,y.length-1)
  
  

 
  const day=newDate[2]
  const month=newDate[1]
  const year=newDate[3]

  const months={
    Jan:0,
    Feb:1,
    Mar:2,
    Apr:3,
    May:4,
    June:5,
    July:6,
    Aug:7,
    Sep:8,
    Oct:9,
    Nov:10,
    Dec:11
  }

  const newEdate={
    day:edate[1],
    year:edate[2]
  }

  Object.keys(months).forEach((m)=>{
    if(month == m && m==edate[0]){
      //console.log("month: " + m)
      //console.log("current month:" +month)
      //console.log("event month:" + edate[0])
     
      if(newDate[2]>eDay)
      //console.log(d + " current:" + newDate[2] + " eventdate:" + edate[1]+ " "+edate[0] )
      //console.log(act)
      setPast(true)
    }
  })

  },[])
  return (
    <div className={past?'event_box_past':'event_box'}>
      <p>act: {act}</p>
      <p>date:{date}</p>
    </div>
  )
}

export default EventBox