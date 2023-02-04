import React from 'react'
import {useState} from 'react'
export default function ReservedCompanySeatsWindow({isCompanyRequested,companyRequests}) {

  const [revokeEmployees, setRevokeEmployees] = useState(false);
  const [revokePublicRequests, setRevokePublicRequests] = useState(false);

  if(isCompanyRequested){
  return (
   
      <div class='flex flex-col p-10'>
        <div>
          <p class='block text-2xl font-bold text-gray-800 dark:text-red-500'>
            RESERVED
          </p>
          <p class='text-white text-small mt-3 mb-2'>
            employees have active requests or reservations for
            this event
          </p>
        </div>
        <div class={`flex `}>
          <div class='justify-center seats'>
            {companyRequests.map((m) => {
              return (
          
            
                <div
                  class='seat selected p-3'
                  onMouseEnter={() => {
                    return (
                      <p>
                       {m.act} {m.firstname} {m.lastname}
                      </p>
                    );
                  }}
                >
                  <p class='text-xs text-white text-center'>
                    {m.seat}
                  </p>
                  
                </div>
        
              );
            })}
          </div>
        </div>
        {revokeEmployees == false ? (
          <button
            class='mt-3 p-2 rounded-md bg-gray-400 '
            onClick={() => {
              setRevokeEmployees(!revokeEmployees);
            }}
          >
            <a class='text-white text-xs font-bold'>
              Click to cancel all reservations
            </a>
          </button>
        ) : (
          <button class='mt-3 p-2 rounded-md bg-red-600 '>
            <a
              class='text-white text-xs '
              onClick={() => {
                setRevokeEmployees(!revokeEmployees);
              }}
            >
              Retain reservations
            </a>
          </button>
        )}
      </div>
    )
  }
}
