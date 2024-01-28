"use client"

import Image from 'next/image';
import React from 'react'
import { register } from "swiper/element/bundle";

register()
const PlaceSwiper = ({ places }:any) => {
  return (
    <div> 
        <swiper-container loop="true">
            {
                places.map((place:any,i:any) => (
                    <swiper-slide key={i}>
                        <div className='flex flex-col items-center'>
                        <div className="mb-5" key={i}>
                            <Image
                            className="w-[240px] h-[240px] rounded-full"
                            src={ place.images }
                            width="200"
                            height="200"
                            alt={ place.item } />
                        </div>
                        <div className="font-semibold text-xl">{ place.item}</div>
                        
                        <div className="flex flex-col gap-1 text-sm mt-3">
                            <div className="flex">
                                <div className="text-right w-20 border border-dashed p-1">by</div>
                                <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ place.place }</div>
                            </div> 
                            <div className="flex">
                                <div className="text-right w-20 border border-dashed p-1">category</div>
                                <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ place.category }</div>
                            </div> 
                            <div className="flex">
                                <div className="text-right w-20 border border-dashed p-1">price</div>
                                <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ JSON.stringify(place.price) }</div>
                            </div> 
                            <div className="flex">
                                <div className="text-right w-20 border border-dashed p-1">found in</div>
                                <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ place.location }</div>
                            </div> 
                             
                            <div className="flex">
                                <div className="text-right w-20 border border-dashed p-1">comment</div>
                                <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ place.description }</div>
                            </div> 
                            <div className="flex">
                                <div className="text-right w-20 border border-dashed p-1">badges</div>
                                <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ JSON.stringify(place.badges) }</div>
                            </div> 
                        </div> 
                        </div>
                    
                    </swiper-slide>

                ))
            }
           
            
        </swiper-container> 
    </div>
  )
}

export default PlaceSwiper