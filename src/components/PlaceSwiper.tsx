"use client"

import Image from 'next/image';
import React from 'react'
import { register } from "swiper/element/bundle";
import ChangeViewButton from './ChangeViewButton';
import { useCounterStore } from '@/store';

register()
const PlaceSwiper = ({ places }:any) => {
    
    const { coords, changeCoords } = useCounterStore()

    const loopThroughPrices = (prices:Object) => {
        const htmlArrayHolder = []

        for (const [key, value] of Object.entries(prices)) {
            const k = key
            const v = value
            htmlArrayHolder.push(`Php${v}/${k} `)
        }
        
        return htmlArrayHolder
    }

    const openDetails = (details:any) => {
        console.log(details)
    }

    const zoomToMap = (coords:number[]) => {
        console.log(coords)
    }

  return (
    <div className='relative top-[-50px] sm:top-4 z-[8888]'> 
        <swiper-container loop="true" navigation="true">
            {
                places.map((place:any,i:any) => (
                    <swiper-slide key={i}>
                        
                        <div className='flex flex-col items-center'>
                            <div className="mb-5 w-[250px] h-[250px]" key={i}>
                            {/* {
                                place.locations?.map((location: any, j: number) => (
                                    <div key={j}>
                                        <p>street: { location.street }</p>
                                    </div>

                                ))
                        
                            } */}
                                <Image
                                className="object-cover h-full w-full rounded-full"
                                src={ place.images }
                                width="250"
                                height="250"
                                alt={ place.item } />
                            </div>
                            <div className="relative bg-white bg-opacity-20 rounded-none sm:rounded  py-1 flex items-center  w-full sm:w-[480px] px-[10px] justify-between text-2xl">
                                <div className='font-bold'>

                                { place.item}
                                </div>
                                <div className='flex gap-2 absolute right-5'>
                                    
                                    <button onClick={() =>openDetails('hello')}> 
                                    <div className='rounded-full bg-white shadow w-[48px] h-[48px] flex items-center justify-center'>
                                        <svg viewBox="0 0 32 32" width="32" height="32"><g fill="none"><path d="M11 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8zm-1 6a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm1-18a1 1 0 1 0-2 0v1H9a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h9.222a3 3 0 0 0 2.027-.788l4.778-4.38A3 3 0 0 0 26 21.62V8a3 3 0 0 0-3-3h-1V4a1 1 0 1 0-2 0v1h-3V4a1 1 0 1 0-2 0v1h-3V4zM9 7h14a1 1 0 0 1 1 1v13h-4a2.5 2.5 0 0 0-2.5 2.5V27H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm10.5 19.185V23.5a.5.5 0 0 1 .5-.5h2.975L19.5 26.185z" fill="purple"></path></g></svg> 
                                    </div>
                                    </button>
 
                                    <ChangeViewButton coords={[place.locations[0].coords]} placeId={place.id} />  
                                    {/* <ChangeViewButton count={place.locations[0].coords} />   */}
                                </div>
                            
                            </div>
                        
                            <div className="flex flex-col gap-1 text-sm mt-3 w-full sm:w-[480px] px-[10px] sm:px-[0px]"> 
                                <div className="flex">
                                    <div className="text-right w-24 sm:w-32 border border-dashed p-1">by</div>
                                    <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50">{ place.place }</div>
                                </div> 
                                {/* <div className="flex">
                                    <div className="text-right w-20 sm:w-32 border border-dashed p-1">category</div>
                                    <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ place.category }</div>
                                </div>  */}
                                <div className="flex">
                                    <div className="text-right w-24 sm:w-32 border border-dashed p-1">price</div>
                                    <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50">{
                                       loopThroughPrices(place.price)
                                        // JSON.stringify(place.price)
                                    
                                    }</div>
                                </div> 
                                <div className="flex">
                                    <div className="text-right w-24 sm:w-32 border border-dashed p-1">found in</div>
                                    <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50">
                                        <div className="w-[200px] sm:w-[300px]">
                                        {
                                            place.locations.map((location:any) => (`
                                                ${location.coords[0]},
                                                ${location.coords[1]},
                                                ${location.street},
                                                ${location.townBarangay},
                                                ${location.cityProvince}`
                                                )) 
                                        } 
                                        </div> 
                                    </div>
                                </div> 
                                
                               
                                
                                {/* <div className="flex">
                                    <div className="text-right w-20 sm:w-32 border border-dashed p-1">comment</div>
                                    <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ place.description }</div>
                                </div>  */}
                                {/* <div className="flex">
                                    <div className="text-right w-20 sm:w-32 border border-dashed p-1">badges</div>
                                    <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">{ JSON.stringify(place.badges) }</div>
                                </div>  */}
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