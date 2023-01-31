import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {Image} from 'cloudinary-react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Adam_Sandler } from './images';

function PosterBox({event}) {

  const[cld,setCld]=useState()
  const[image,setImage] =useState()
  const[url,setUrl]=useState()
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {

    
      
      setIsLoading(false)

   

  },[])

  


 
  
 
  if(!isLoading){
   
    const act=event.act
    console.log(Adam_Sandler)

    axios.get("https://api.cloudinary.com/v1_1/michelle-badu").then((response) => {
      console.log(response.data)
    })
  return (
    <div className="bg-gray-300 p-5 rounded-md">
   
      <div className="flex object-contain">
        {/*event.act.includes("SZA")?  */}
       
     

      </div>
      <div class="flex flex-col ">
        <img src="/images/Adam_Sandler.jpg" alt="adam"/>
        <p className="font-sembold">{event.act}</p>
        <p>{event.date}</p>
        <p>{event.time}</p>
      </div>
    </div>
  )
}
}
export default PosterBox