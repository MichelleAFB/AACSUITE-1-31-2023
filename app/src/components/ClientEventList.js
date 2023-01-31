import React from "react";
import { useState, useEffect } from "react";
import { ReactReduxContext } from "react-redux";
import EventListItem from "./EventListItem";
import EventModal from "./EventModal";
import ClientEventListItem from "./ClientEventListItem";
import axios from "axios";

function ClientEventList(reload) {


  useEffect(() => {
    const prom= new Promise((resolve,reject) => {
      axios.get("http://localhost:3002/publicEvents").then((response)=> {
        setFiltered(response.data)
    
      setEvents(response.data)
      setTimeout(()=> {
        resolve()
      },500)
      
      })
    })

    prom.then(() => {
      console.log(events)
      setIsLoading(false)
    })


  }, [reload]);

  const [events, setEvents] = useState();
  const [filtered, setFiltered] = useState();
  const[isLoading,setIsLoading]=useState()
 
  const handleChange = (e) => {
    if (e.target.value == null || e.target.value == "") {
      const fil = events;
      setFiltered(events);
    }

    const fil = [];

    const prom = new Promise((resolve, reject) => {
      setFiltered([]);
      filtered.map((ev) => {
        const str = e.target.value.toUpperCase();
        const evie = ev.props.event.act.toUpperCase();
        const evieSplit = evie.split(" ");

        const eve = ev.props.event.act;
        //console.log(eve)
        if (evie.includes(str)) {
          evieSplit.map((o) => {
            if (o.includes(str)) {
              //console.log(evie.includes(str))
              console.log(o);
              console.log("string:" + str);
              console.log("event:" + evie);
              console.log("\n\n");
              if (!fil.includes(ev)) {
                fil.push(ev);
              }
            }
          });
        }
      });
      console.log(fil);
      resolve(fil);
    });

    prom
      .then(() => {
        setFiltered(fil);
        console.log("filtered should be");
        console.log(filtered);
      })
      .catch(console.log("filter not working"));
  };

  /***\rounded-md object-contain bg-gray-50 max-h-screen overflow-y-auto p-5 m-5 */
  if(!isLoading &&  events!=null){
  return (
    <div class=" component_list_full items-center justify-around overflow-y-scroll w-full">
    <header class="text-4xl m-3">Public Events</header>

        
  <label class="px-3">
    <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
      placeholder="Search..." onChange={handleChange}/>
     
  </label>
  <ul class="mt-6 rounded-md p-10">
  {
            filtered.map((e) => {
           
              return <li><ClientEventListItem  key={e.id} event={e}/></li>
              })
          }
  </ul>
</div>
  );
  }
}

export default ClientEventList;
