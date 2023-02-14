import React from 'react'

function Carousel() {


  const slides=[
    {
      url:"./flowers.jpg"
    },
    {
      url:"./flowers.jpg"
    },
    {
      url:"./flowers.jpg"
    },
    {
      url:"./flowers.jpg"
    },
    {
      url:"./flowers.jpg"
    }
   
  ]
  return (
    
<div class="max-w-[1400px h-[600px] w-full  m-auto py-16 px-4 relative" data-carousel="slide" >
  <img src="flowers.jpg" alt="flowers" width="500" height="600" />
 <div style={{backgroundImage:`url(${slides[0].url})`}} class="w-full h-full rounded-2xl bg-center bg-cover duration-500 "/>
   
</div>

  )
}

export default Carousel