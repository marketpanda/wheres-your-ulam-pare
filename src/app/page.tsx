 
import Image from "next/image";
import { PrismaClient } from "@prisma/client"; 
import { register } from "swiper/element/bundle";
register()
import PlaceSwiper from "@/components/PlaceSwiper";
import MapDynamicWrapped from "@/components/MapDynamicWrapped";

import React, { FC }  from 'react'
import MapCaller from "@/components/MapDynamicWrapped";

import { useCounterStore } from "@/store";
import Link from "next/link";
 
const prisma = new PrismaClient()
 

// https://www.youtube.com/watch?v=V7LfrS3T5fs
const Home:FC = async () => { 

  const getPlaces = async () => {
    const response = await prisma.place.findMany({
      include: {
        locations: true
      }
    })

    const hasLocations = response.filter(place => place.locations.length > 0) 
    console.log(hasLocations)
    return response
  }

  const places = await getPlaces()
  console.log(places)
  return (

    <> 
      <div className="flex justify-center h-screen bg-gray-100">
                      
        <div className="flex flex-col rounded-xl overflow-hidden m-2 max-w-[720px] w-full shadow"> 
          <div className="w-full h-full items-center flex flex-col justify-center">

          <span>
            Where s Your Ulam Pare!
          </span>
          <Link href="/map">
            Explore
          </Link>
          </div>
        </div> 
      </div>
         
    </>
    
  );
}

export default Home
