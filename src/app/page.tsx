import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import dynamic from 'next/dynamic'
import { register } from "swiper/element/bundle";
import PlaceSwiper from "@/components/PlaceSwiper";

register()
const prisma = new PrismaClient()
 
//https://www.youtube.com/watch?v=D-B77ctsZkY
//https://www.youtube.com/watch?v=FMnlyi60avU

 

export default async function Home() { 
  const getPlaces = async () => {
    const response = await prisma.place.findMany()
    console.log(response)
    return response
  }

  const places = await getPlaces()
  

  return (
    <>
      

  
        
        <div className="flex items-center">
      
          <div className="flex justify-center flex-col max-w-[500px] items-center mx-auto
            bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full h-full
            rounded">

            <div className="mx-auto flex w-[300px] text-xl font-semibold opacity-80 p-3">Where&apo;s your Ulam Pare</div>
             
            <div className="w-[500px] min-h-[500px] pb-10">
                <PlaceSwiper places={places} />
            </div>
          </div>

         
        </div>
        
         
      
    </>
    
  );
}
