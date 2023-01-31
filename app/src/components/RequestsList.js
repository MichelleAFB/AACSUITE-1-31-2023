import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import RequestListItem from "./RequestListItem";

function RequestsList() {
  const [requests, setRequests] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [requestType, setRequestType] = useState("current");
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    const arr = [];

    const prom = new Promise((resolve, reject) => {
      axios
        .get("https://accserverheroku.herokuapp.com/reservations/reservationRequests")
        .then((response) => {
          //console.log(response.data.request)
          console.log("requests");
          console.log(response.data);
          //setRequests(response.data)

          const data = response.data.request;
          console.log(data)
          data.map((e) => {
            arr.push(e);
          });
          console.log(arr);
          resolve(arr);
        });
    });

    prom
      .then(() => {
        setRequests(arr);
        setFiltered(arr);
        console.log(filtered);
        console.log(requests);

        setIsLoading(false);
        console.log("success");
      })
      .catch(console.log("could not set"));
  }, []);

  console.log(filtered);

  const handleChange = (e) => {
    if (e.target.value == null || e.target.value == "") {
      const fil = requests;
      setFiltered(requests);
    }

    const fil = [];

    const prom = new Promise((resolve, reject) => {
      setFiltered([]);
      requests.map((ev) => {
        const str = e.target.value.toUpperCase();
        console.log(str);
        const evie = ev.act.toUpperCase();
        console.log(evie);
        console.log(str);
        const evieSplit = evie.split(" ");

        const eve = ev.act;
        console.log("\n\n");
        console.log(eve);
        //console.log(eve)
        console.log(evie.includes(str));
        if (evie.includes(str)) {
          evieSplit.map((o) => {
            if (o.includes(str)) {
              //console.log(evie.includes(str))
              console.log(o);
              console.log("string:" + str);
              console.log("event:" + evie);
              console.log("\n\n");
              fil.push(ev);
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

  if (!isLoading) {
    return (
      <div class='rounded-md object-contain bg--300 max-h-screen overflow-y-auto p-5 m-5 items-center bg-orange-900'>
        <label class='px-3'>
          <input
            class='rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full'
            placeholder='Search...'
            onChange={handleChange}
          />
        </label>
       
        <ul class='mt-6 rounded-md p-10'>
          {filtered.map((e) => {
            return (
              <li>
                <RequestListItem key={e.id} request={e} />
                
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RequestsList;
