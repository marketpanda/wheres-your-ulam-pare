import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import dynamic from 'next/dynamic'
import { register } from "swiper/element/bundle";
import PlaceSwiper from "@/components/PlaceSwiper";

register()
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
       
        <div className="flex items-center">
      
          <div className="flex justify-center flex-col items-center mx-auto
            bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded h-screen">

            <div className="mx-auto mb-12 flex w-full justify-center text-2xl font-semibold opacity-80 p-3">
             
              Where&apos;s your Ulam Pare
              </div>
             
            <div>
                <PlaceSwiper places={places} />
            </div>
          </div>

         
        </div>
         
    </>
    
  );
}
