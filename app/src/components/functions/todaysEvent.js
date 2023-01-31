

function checkToday(eventDate,today,months){
  if(eventDate[2]=="-"){
    eventDate[2]="2022"
  }
if(eventDate.month==today.month && today.day==eventDate[1] && today.year==eventDate[2]){
 
  return true
 }  else{
  return false
 }

}
 function todaysEvent(events){
 const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
 const date = new Date();

   let day = date.getDate();
   let year=date.getFullYear();
   let monthIndex = date.getMonth()
   const month=months[monthIndex]
  // console.log(day + " " + month + " " + year)
   const today={
      month:month,
       day:day,
      year:year,
   }
   
   const currentEvents=[]

   const prom = new Promise((resolve,reject) => {

     
     events.map((e) => {
      
       const eventdate=e.date.split(" ")
       const eventday=eventdate[1].replace(',',"")
       if(e.access=="public"){
         console.log("PUBLIC******************")
        console.log("hello")
       }
       const eventDate={
         month:eventdate[0],
         day:eventday,
         year:parseInt(eventdate[2])}
 
         console.log(checkToday(eventdate,today,months))
         if(checkToday(eventDate,today,months)!=false){
          
          
           console.log(e)
           //console.log(currentEvents)
         }

     })
     resolve()
   })

   prom.then(() => {
     //console.log(currentEvents)
     console.log("FINISHE")
    // res.json(currentEvents)
   })
 

}

module.exports=todaysEvent