import React, { useEffect,useRef,useMemo } from 'react'
import {useState} from 'react'
import * as actionTypes from '../../redux/eventModal/eventModal-action'
import {useDispatch,useSelector,connect} from 'react-redux'
import {setPublicModalEvent,setPublicModalOpen,setPublicModalOccupied} from '../../redux/eventModal/eventModal-action'
import { setEmployeeModalOpen,setEmployeeModalEvent} from '../../redux/employee/employeeModal-actions'

//functions


//outside
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import axios from 'axios'

//components

 function PublicEventListItem({modalType,event}){

    const visible= useSelector(state => state.showModal.visibilty)
    const [visibility,setVisibility]=useState(visible)
   
    console.log("**************************EVENTLIST ITEM RERENDER**********")
    const dispatch= useDispatch()
    const [ourEvent,setOurEvent]=useState(event)
    const [individual,setIndividual]=useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const[isReserved,setIsReserved] =useState(false)
    const [typeModal,setTypeModal] =useState()
    
    const eve=useRef(event)
    


      useEffect(() => {
        
        var reserved=false
        const prom = new Promise((resolve,reject) => {
          setTypeModal(modalType)
         
            //console.log("*******PUBLIC EVENT*******")
            setIndividual(true)
            axios.get("http://localhost:3002/reservations/approvedReservations").then((response) => {
              var reserved= response.data
             console.log(response)
             dispatch(setPublicModalOccupied(response.data))
                reserved.map((r) => {
                 
          if(r.eventId == event.id ){
            //console.log("reserved event!!!!")
            //console.log(r)
            
            reserved=true
            console.log(isReserved)
    
            }
         })
       
        
        })
        setTimeout(()=> {
          resolve()
        },1000)
        
        })

        prom.then(() => {
          console.log("reserved: " + reserved)
          setIsReserved(reserved)
          setIsLoading(false)
        })

      },[])



 function getImages(event) {
        const act=event.act
        if(act.toUpperCase().includes("SZA")){
          return new CloudinaryImage("v1674517181/665-36a61726a0.t_pixyfz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("ADAM SANDLER")){
          return new CloudinaryImage("v1675375546/AAC/Adam_Sandler_g8yicm.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("BRUCE SPRINGSTEEN")){
          
          return new CloudinaryImage("v1674517184/bruce_sqtmvf-58e674613c_jesttp.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        
        if(act.toUpperCase().includes("ANUEL")){
          
          return new CloudinaryImage("v1674517180/Dallas-1080x1080-5319d91a78_vyr9iv.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("CARRIE UNDERWOOD")){
          
          return new CloudinaryImage("v1674517180/CU-DALLAS-1080x1080-8a7724f27a_wqpial.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("GLOBE TROTTERS")){
          
          return new CloudinaryImage("v1674517179/3_320x320-941dd06973_zapcyc.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("MANA")){
          
          return new CloudinaryImage("v1674517180/320-16fe1574cc_ehdxv1.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.includes("Maná ")){
          
          return new CloudinaryImage("v1674517180/320-16fe1574cc_ehdxv1.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("THOMAS RHETT")){
          
          return new CloudinaryImage("v1674517186/Static_Digital-320x320-cde0ecac60_igjv5y.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("BLINK 182 TOUR 2023")){
           return new CloudinaryImage("v1674517181/blink320-142fb22f0d_dwueof.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("ANITA BAKER")){
          return new CloudinaryImage("v1674517181/AnitaBaker_2023_Regional_AmericanAirlinesCenter_1217_320x320-ef66920f0b_aoymmj.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
       }
      
      
        if(act.toUpperCase().includes("MADONNA")){
          
          return new CloudinaryImage("v1674517182/MADONNA-320-8d93579a45_ehsi3e.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("TROUBADOUR")){
          
          return new CloudinaryImage("v1674517181/665-c11668b958.t_xrrmek.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("NCAA")){
          
          return new CloudinaryImage("v1674517181/Instagram-ed37f234a9_qqbi6n.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
        }
        if(act.toUpperCase().includes("DISNEY")){
          
          return new CloudinaryImage("v1674517180/320x320-dba36c2e3a_l7wbhr.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(200));
        }
      }

       function mavericksImage(){
        const act=event.act
        if(act.toUpperCase().includes("SUNS")){
          return new CloudinaryImage("v1675375542/AAC/Mavericks-v-Suns_vk4hmf.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
        }
          if(act.upperCase().includes("SPURS")){
            return new CloudinaryImage("v1674517184/Spurs-Event-29277db04e.t_wmjg3e.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
          }
          if(act.toUpperCase().includes("HORNETS")){
            return new CloudinaryImage("v1674517180/Hornets-3-d09dce15d5_n1hnxj.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
      
          }
          if(act.toUpperCase().includes("WARRIORS")){
            return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
         }
          if(act.includes("76ers")){
            return new CloudinaryImage("v1674517183/Sixers-f926d8e66a_djjadn.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
          }
          if(act.toUpperCase().includes("PACERS")){
            return new CloudinaryImage("v1674517182/Pacers-c01b2c6151_b8tggy.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
          }
          if(act.toUpperCase().includes("KINGS")){
            return new CloudinaryImage("v1674517181/Kings-7af2259a67_gaz8xo.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
          }
          if(act.toUpperCase().includes("LAKERS")){
            return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
          }
          if(act.toUpperCase().includes("JAZZ")){
            return new CloudinaryImage("v1674517181/jazz-Event-256f7d7387.t_q8iowv.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("BULLS")){
            return new CloudinaryImage("v1674517184/Bulls-3-5939b713a8_hnpuug.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("LAKERS")){
            return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("GRIZZLIES")){
            return new CloudinaryImage("v1674517180/Grizzlies-3-b4b24bcd81_jm1q51.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
      }




  /////////////////////////////////////////////////////////
      function getStarsImages(event){
        const act=event.act
       
          if(act.toUpperCase().includes("LIGHTNING")){
            return new CloudinaryImage("v1674517186/Tampa-Bay-Lightning-2e7b1b3175_ezdf4n.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("WARRIORS")){
             return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
      
          }
        
        
      
          if(act.toUpperCase().includes("WILD")){
            return new CloudinaryImage("v1674517185/Stars-v-Wild-320-882091f674_ialmc2.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(200));
          }
          if(act.toUpperCase().includes("TIMBERWOLVES")){
            return new CloudinaryImage("v1674517185/Stars-v-Wild-320-882091f674_ialmc2.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(200));
          }
          if(act.toUpperCase().includes("PREDATORS")){
            return new CloudinaryImage("v1674517185/Stars-v-Preds-320-16585de0cc_ewvnuo.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("CANUCKS")){
            return new CloudinaryImage("v1674517185/Stars-v-Canucks-320-b6ff12efb7_semaji.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("BLUES")){
            return new CloudinaryImage("v1674517184/Stars-v-Blues-f83a89e7a1.t_mh0wzz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("COYOTES")){
            return new CloudinaryImage("v1674517185/Stars-v-Coyotes-23-320-f9155b6ab8_ppy4kq.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("FLAMES")){
            return new CloudinaryImage("v1674517185/Stars-v-Flames-320-4e6a696c09_qmxhf3.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
        
        
          if(act.toUpperCase().includes("BLACKHAWKS")){
            return new CloudinaryImage("v1674517184/Stars-v-Blackhawks-708ed740d3.t_e5sgaf.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("KNIGHTS")){
            return new CloudinaryImage("v1674517181/Knights-cd0156b60b_lonyys.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("KRAKEN")){
            return new CloudinaryImage("v1674517181/320x320-Stars-vs-Kraken-b6aa33bed6_jxlndp.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("AVALANCHE")){
            return new CloudinaryImage("v1674517179/Colorado-Avalanche-8c84c0f55d.t_yd4uox.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
     
          if(act.toUpperCase().includes("BRUINS")){
            return new CloudinaryImage("v1675375544/AAC/Stars-v-Bruins_nbttup.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(200));
          }
          if(act.toUpperCase().includes("FLYERS")){
            return new CloudinaryImage("v1675375545/AAC/Stars-v-Flyers_pykivl.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
          if(act.toUpperCase().includes("PENGUINS")){
            return new CloudinaryImage("v1674517185/Stars-v-Peguins-320-89961eadd6.t_cmfz9b.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(300).height(150));
          }
        
      }
  
    if(!isLoading && typeModal==null){

      
     
  return (
    <div class="max-h-sm rounded-md">
      <li class="py-5 m-4  bg-pink-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
        <a href="#" class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time} |</h3>
        </a>
        <h3>{event.access}</h3>
        {
          individual ? <button class="bg-orange-300 p-2 rounded-md"><p class="text-sm">Individual Seats</p></button>:<h3></h3>
        }
        {
          event.reserved == true? <p class="font-bold text-red-500">RESERVED</p>:<p></p>
        }
        {event.act.includes("Stars") ?
        <div class="flex justify-center m-3">
          <AdvancedImage cldImg={getStarsImages(event)}/>
        </div>:<p></p>}
        {event.act.includes("Mavericks") ?
        <div class="flex justify-center m-3">
          <AdvancedImage cldImg={getStarsImages(event)}/>
        </div>:<p></p>}
        {(!event.act.includes("Mavericks") && !event.act.includes("Stars")) ?
        <div class="flex justify-center m-3">
          <AdvancedImage cldImg={getImages(event)}/>
        </div>:<p></p>}
        

        
        <button class="bg-gray-400 p-2 rounded-md" onClick={()=> {
          console.log("CLICK")
           
          
         const occ=[]
          const prom = new Promise((resolve,reject) => {
            /*axios.get("http://localhost:3002/sendOccupiedToFront").then((resp) => {
              const res=resp.data

              res.map((e) => {
                if(e.actID==event.id){
                  occ.push(e)
                }
              })
              console.log("NEWWW IN EVENTMODAL")
              dispatch(setModalEventOccupied(occ))
              dispatch(setModalEvent(event))
               
              resolve()
            })
            */

         
            dispatch(setPublicModalEvent(event))
             
            resolve()
          })

          prom.then(() => {
            
          
            dispatch(setPublicModalOpen(true))
            
            
          }).catch(
            console.log("SET OCC FAILED")
          )
          
        }}>
         Update Access
        </button>
        
      </li>
      </div>
    
  )
}if(!isLoading && modalType=="employee"){
  {
     console.log("EMPLOYEEEE LIST TYPE")
    return (
      <div class="max-h-sm rounded-md">
        <li class="py-5 m-4  bg-gray-300 border-purple-100 px-3 transition hover:bg-indigo-100 rounded-lg shadow-lg ">
          <a href="#" class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">{event.act} | {event.date} | {event.time} |</h3>
          </a>
          <h3>{event.access}</h3>
         
         
          {
            event.reserved == true? <p class="font-bold text-red-500">RESERVED</p>:<p></p>
          }
          
          
          <button class="bg-gray-400 p-2 rounded-md" onClick={()=> {
            console.log("CLICK")
             
            
           const occ=[]
            const prom = new Promise((resolve,reject) => {
              axios.get("https://accserverheroku.herokuapp.com/sendOccupiedToFront").then((resp) => {
                const res=resp.data
  
                res.map((e) => {
                  if(e.actID==event.id){
                    occ.push(e)
                  }
                })
                
                dispatch(setPublicModalEvent(event))
                 
                resolve()
              })
            })
  
            prom.then(() => {
              
              console.log("Setting MODAL")
              dispatch(setPublicModalOpen(true)) 
              
            }).catch(
              console.log("SET OCC FAILED")
            )
          }}>
           view
          </button>
          
        </li>
        </div>
      
    )
  }
}

 }

export default PublicEventListItem

export function getImages(event) {
  const act=event.act
  if(act.toUpperCase().includes("SZA")){
    return new CloudinaryImage("v1674517181/665-36a61726a0.t_pixyfz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("ADAM SANDLER")){
    return new CloudinaryImage("v1675375546/AAC/Adam_Sandler_g8yicm.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("BRUCE SPRINGSTEEN")){
    
    return new CloudinaryImage("v1674517184/bruce_sqtmvf-58e674613c_jesttp.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  
  if(act.toUpperCase().includes("ANUEL")){
    
    return new CloudinaryImage("v1674517180/Dallas-1080x1080-5319d91a78_vyr9iv.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("CARRIE UNDERWOOD")){
    
    return new CloudinaryImage("v1674517180/CU-DALLAS-1080x1080-8a7724f27a_wqpial.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("GLOBE TROTTERS")){
    
    return new CloudinaryImage("v1674517179/3_320x320-941dd06973_zapcyc.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("MANA")){
    
    return new CloudinaryImage("v1674517180/320-16fe1574cc_ehdxv1.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("MANA")){
    
    return new CloudinaryImage("v1674517180/320-16fe1574cc_ehdxv1.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("THOMAS RHETT")){
    
    return new CloudinaryImage("v1674517186/Static_Digital-320x320-cde0ecac60_igjv5y.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("BLINK 182 TOUR 2023")){
     return new CloudinaryImage("v1674517181/blink320-142fb22f0d_dwueof.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("ANITA BAKER")){
    return new CloudinaryImage("v1674517181/AnitaBaker_2023_Regional_AmericanAirlinesCenter_1217_320x320-ef66920f0b_aoymmj.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
 }


  if(act.includes("Stars")){
    if(act.toUpperCase().includes("LIGHTENING")){
      return new CloudinaryImage("v1674517186/Tampa-Bay-Lightning-2e7b1b3175_ezdf4n.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.toUpperCase().includes("GOLDEN")){
       return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));

    }
    if(act.upperCase().includes("SUNS")){
      return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));

    }
    if(act.upperCase().includes("DUCKS")){
      return new CloudinaryImage("v1674517186/Warriors-3-51238c51db_kg0er9.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));

    }
   
    if(act.upperCase().includes("GRIZZLIES")){
      return new CloudinaryImage("v1674517180/Grizzlies-3-b4b24bcd81_jm1q51.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("WILD")){
      return new CloudinaryImage("v1674517185/Stars-v-Wild-320-882091f674_ialmc2.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("TIMBERWOLVES")){
      return new CloudinaryImage("v1674517185/Stars-v-Wild-320-882091f674_ialmc2.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("PREDATORS")){
      return new CloudinaryImage("v1674517185/Stars-v-Preds-320-16585de0cc_ewvnuo.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("CANUCKS")){
      return new CloudinaryImage("/v1674517185/Stars-v-Canucks-320-b6ff12efb7_semaji.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("BLUE JACKETS")){
      return new CloudinaryImage("v1674517184/Stars-v-Blues-f83a89e7a1.t_mh0wzz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("COYOTES")){
      return new CloudinaryImage("v1674517185/Stars-v-Coyotes-23-320-f9155b6ab8_ppy4kq.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("FLAMES")){
      return new CloudinaryImage("v1674517185/Stars-v-Flames-320-4e6a696c09_qmxhf3.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
  
  
    if(act.upperCase().includes("BLACKHAWKS")){
      return new CloudinaryImage("v1674517184/Stars-v-Blackhawks-708ed740d3.t_e5sgaf.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("KNIGHTS")){
      return new CloudinaryImage("v1674517181/Knights-cd0156b60b_lonyys.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("KRAKEN")){
      return new CloudinaryImage("v1674517181/320x320-Stars-vs-Kraken-b6aa33bed6_jxlndp.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("AVALANCHE")){
      return new CloudinaryImage("v1674517179/Colorado-Avalanche-8c84c0f55d.t_yd4uox.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("JAZZ")){
      return new CloudinaryImage("v1674517181/jazz-Event-256f7d7387.t_q8iowv.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("BLUE JACKETS")){
      return new CloudinaryImage("v1674517184/Stars-v-Blues-f83a89e7a1.t_mh0wzz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("BLUE JACKETS")){
      return new CloudinaryImage("v1674517184/Stars-v-Blues-f83a89e7a1.t_mh0wzz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
  }
  if(act.toUpperCase().includes("MAVERICKS")){
    if(act.upperCase().includes("SPURS")){
      return new CloudinaryImage("v1674517184/Spurs-Event-29277db04e.t_wmjg3e.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("HORNETS")){
      return new CloudinaryImage("v1674517180/Hornets-3-d09dce15d5_n1hnxj.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));

    }
    if(act.upperCase().includes("SIXERS")){
      return new CloudinaryImage("v1674517183/Sixers-f926d8e66a_djjadn.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("PACERS")){
      return new CloudinaryImage("v1674517182/Pacers-c01b2c6151_b8tggy.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("BLUE JACKETS")){
      return new CloudinaryImage("v1674517184/Stars-v-Blues-f83a89e7a1.t_mh0wzz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("BLUE JACKETS")){
      return new CloudinaryImage("v1674517184/Stars-v-Blues-f83a89e7a1.t_mh0wzz.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("KINGS")){
      return new CloudinaryImage("v1674517181/Kings-7af2259a67_gaz8xo.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("LAKERS")){
      return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }

    if(act.upperCase().includes("LAKERS")){
      return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("LAKERS")){
      return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("LAKERS")){
      return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    if(act.upperCase().includes("LAKERS")){
      return new CloudinaryImage("v1674517181/Lakers-f1809b1fb2_slvkon.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
    }
    


  }
  if(act.toUpperCase().includes("MADONNA")){
    
    return new CloudinaryImage("v1674517182/MADONNA-320-8d93579a45_ehsi3e.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("TROUBADOUR")){
    
    return new CloudinaryImage("v1674517181/665-c11668b958.t_xrrmek.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("NCAA")){
    
    return new CloudinaryImage("v1674517181/Instagram-ed37f234a9_qqbi6n.png", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(150));
  }
  if(act.toUpperCase().includes("DISNEY")){
    
    return new CloudinaryImage("v1674517180/320x320-dba36c2e3a_l7wbhr.jpg", {cloudName: 'michelle-badu'}).resize(fill().width(200).height(200));
  }

}