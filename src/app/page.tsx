 

import Image from "next/image";
import { PrismaClient } from "@prisma/client"; 
import { register } from "swiper/element/bundle";
register()
import PlaceSwiper from "@/components/PlaceSwiper";
import MapDynamicWrapped from "@/components/MapDynamicWrapped";

import React  from 'react'
import MapCaller from "@/components/MapDynamicWrapped";
 
const prisma = new PrismaClient()
 
export default async function Home() { 

  const getPlaces = async () => {
    const response = await prisma.place.findMany({
      include: {
        locations: true
      }
    })

    const hasLocations = response.filter(place => place.locations.length > 0)
    // console.log(response)
    console.log(hasLocations)
    return response
  }

  const places = await getPlaces()
   
  return (

    <> 
      <div className="flex justify-center h-screen bg-gray-100">
              
         
        
        <div className="flex flex-col rounded-xl overflow-hidden m-2 max-w-[720px] w-full shadow"> 
          {/* <div className="mx-auto  flex w-full justify-center text-2xl font-semibold opacity-80 p-3"> 
            Where&apos;s your Ulam Pare
          </div> */}
          <div className="h-2/5 bg-white">
            <MapCaller places={places} />
          </div>  
          <div className="h-3/5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"> 
            <PlaceSwiper places={places} />
          </div>
        </div> 
      </div>
         
    </>
    
  );
}
