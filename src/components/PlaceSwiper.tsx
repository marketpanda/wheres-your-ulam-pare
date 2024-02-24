"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import { register } from "swiper/element/bundle";
import ChangeViewButton from './ChangeViewButton';
import { useCounterStore } from '@/store';
import PlaceDetailsButton from './PlaceDetailsButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { tree } from 'next/dist/build/templates/app-page';
import './assets/mySlider.css'

register()  
const PlaceSwiper = ({ places }:any) => {
    
 
   

    console.log(places)

    const [open, setOpen] = useState(false)
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    }

   

  return (
    <div className='relative top-[-50px] sm:top-4 z-[8888]'> 
        <swiper-container
            loop="true"
            navigation="true"
            modules="modules"
            thumbs-swiper=".my-thumbs" 
        >
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
                            <div className="relative bg-white bg-opacity-20 rounded-none sm:rounded-t  py-1 flex items-center  w-full sm:w-[480px] px-[10px] justify-between text-2xl">
                                <div className='font-bold flex flex-col'>
                                    <span>
                                        { place.item }
                                    </span>
                                    <span className='text-sm'>
                                        @{ place.place }
                                    </span>
                                </div>
                                <div className='flex gap-2 absolute right-5'>
                                    
                                    {/* <button onClick={() =>openDetails(place)}> 
                                    <div className='rounded-full bg-white shadow w-[48px] h-[48px] flex items-center justify-center'>
                                        <svg viewBox="0 0 32 32" width="32" height="32"><g fill="none"><path d="M11 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8zm-1 6a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm1-18a1 1 0 1 0-2 0v1H9a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h9.222a3 3 0 0 0 2.027-.788l4.778-4.38A3 3 0 0 0 26 21.62V8a3 3 0 0 0-3-3h-1V4a1 1 0 1 0-2 0v1h-3V4a1 1 0 1 0-2 0v1h-3V4zM9 7h14a1 1 0 0 1 1 1v13h-4a2.5 2.5 0 0 0-2.5 2.5V27H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm10.5 19.185V23.5a.5.5 0 0 1 .5-.5h2.975L19.5 26.185z" fill="purple"></path></g></svg> 
                                    </div>
                                    </button> */}
                                    {/* <button onClick={toggleDrawer(true)}>toggle</button> */}
                                    <PlaceDetailsButton place={place} />
 
                                    <ChangeViewButton coords={[place.locations[0].coords]} placeId={place.id} />  
                                    {/* <ChangeViewButton count={place.locations[0].coords} />   */}
                                </div>
                            
                            </div>
{/*                         
                            <div className="flex flex-col gap-1 text-sm mt-3 w-full sm:w-[480px] px-[10px] sm:px-[0px]"> 
  

                                <div className="flex">
                                    <div className="text-right w-24 sm:w-32 border border-dashed p-1">by</div>
                                    <div className="flex flex-col text-sm border grow p-1 border-dashed bg-white bg-opacity-50">
                                        <div className='flex gap-1'>
                                            <span>
                                                { place.locations[0].coords[0] }
                                            </span>
                                            <span>
                                                { place.locations[0].coords[1] }
                                            </span>
                                        </div>
                                        <div>

                                        { place.place }
                                        </div>
                                    </div>
                                </div> 
                               
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
                                                ${location.street},
                                                ${location.townBarangay},
                                                ${location.cityProvince}`
                                                )) 
                                        } 
                                        </div> 
                                    </div>
                                </div> 
                                
                            </div>  */}
                        </div>
                    
                    </swiper-slide>

                ))
            }
           
            
        </swiper-container>
        
        


        <div className='w-full sm:w-[480px] mx-auto rounded-none sm:rounded-b overflow-hidden'>
       
        <swiper-container
            loop={true}
            thumbsSlider="" 
            class="swiper2 my-thumbs"  
            className="swiper2 my-thumbs"  
            free-mode="true"
            watch-slides-progress="true"    
            modules="modules" 
            slides-per-view="3"
            
        >
            {
                 places.map((place:any,i:any) => (
                    <swiper-slide key={i}>
                       
                            <div className='text-xs px-2 py-1 font-semibold  bg-white truncate'>
                                {place.place}
                            </div>
                            <div className='w-full h-16 overflow-hidden'>
                                <Image src={place.images} className='object-cover h-full' alt={place.item} width={180} height={100} />
                            </div>
                        
                        
                    </swiper-slide>
                ))
            }
        </swiper-container>
        </div>
         
    </div>
  )
}

export default PlaceSwiper