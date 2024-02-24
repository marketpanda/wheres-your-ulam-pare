import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image'


const PlaceDetailsButton = (place:any) => {
  const loopThroughPrices = (prices:Object) => {
    const htmlArrayHolder = []

    for (const [key, value] of Object.entries(prices)) {
        const k = key
        const v = value
        htmlArrayHolder.push(`Php${v}/${k} `)
    }
    
    return htmlArrayHolder
  }

  const Badges = ({badges}: {badges: any}) => {
    const loopBadges = badges
    console.log(loopBadges)
    return (
      <div className='flex text-xs gap-1'>
      
      {loopBadges.map((badge:string, i:number) => (
        <div className='bg-gray-800 rounded-full text-white px-2 py-1' key={i}>{badge}</div>
      ))}
      
    </div>
    )
  }

  const DisplayAddress = ({parseAddress} : {parseAddress: any}) => {
    const addressObject = parseAddress
    return (
      <div className='text-right flex flex-col text-xs'>
        <span>
          {addressObject?.street}
        </span>
        <span>
          {addressObject?.townBarangay}
        </span>
        <span>
          {addressObject?.cityProvince} {addressObject?.zip}
        </span>
        
      </div>
    )
  }

  return (
    <>
    {/* <button onClick={() =>openDetails(place)}> 
        <div className='rounded-full bg-white shadow w-[48px] h-[48px] flex items-center justify-center'>
            <svg viewBox="0 0 32 32" width="32" height="32"><g fill="none"><path d="M11 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8zm-1 6a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm1-18a1 1 0 1 0-2 0v1H9a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h9.222a3 3 0 0 0 2.027-.788l4.778-4.38A3 3 0 0 0 26 21.62V8a3 3 0 0 0-3-3h-1V4a1 1 0 1 0-2 0v1h-3V4a1 1 0 1 0-2 0v1h-3V4zM9 7h14a1 1 0 0 1 1 1v13h-4a2.5 2.5 0 0 0-2.5 2.5V27H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm10.5 19.185V23.5a.5.5 0 0 1 .5-.5h2.975L19.5 26.185z" fill="purple"></path></g></svg> 
        </div>
    </button> */}
    
    <Dialog.Root>
    <Dialog.Trigger asChild>
      <button>
      <div className='rounded-full bg-white shadow w-[48px] h-[48px] flex items-center justify-center'>
            <svg viewBox="0 0 32 32" width="32" height="32"><g fill="none"><path d="M11 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8zm-1 6a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm1-18a1 1 0 1 0-2 0v1H9a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h9.222a3 3 0 0 0 2.027-.788l4.778-4.38A3 3 0 0 0 26 21.62V8a3 3 0 0 0-3-3h-1V4a1 1 0 1 0-2 0v1h-3V4a1 1 0 1 0-2 0v1h-3V4zM9 7h14a1 1 0 0 1 1 1v13h-4a2.5 2.5 0 0 0-2.5 2.5V27H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm10.5 19.185V23.5a.5.5 0 0 1 .5-.5h2.975L19.5 26.185z" fill="purple"></path></g></svg> 
        </div>
      </button>

    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-white z-[80000] bg-opacity-50 backdrop-blur data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="z-[88888] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            <div className='flex flex-col'>
              <span className='text-2xl font-semibold'>
                {place.place.item}
              </span>
              <span className='opacity-70 font-semibold'>
                @{ place.place.place }
              </span>
            </div>
        </Dialog.Title>
        <Dialog.Description className="flex flex-col mt-[10px] mb-5 text-[15px] leading-normal gap-2">
            <div className='flex justify-between w-full h-32'>
                <Image src={place.place.images} className="object-cover w-full" alt="Image" width={200} height={200} />
            </div>
             
            <div className='flex justify-between w-full gap-1'>
                <div className='w-8 h-8'>
                <svg viewBox="0 0 512 512"><path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M448 448V240"></path><path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M64 240v208"></path><path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M382.47 48H129.53c-21.79 0-41.47 12-49.93 30.46L36.3 173c-14.58 31.81 9.63 67.85 47.19 69h2c31.4 0 56.85-25.18 56.85-52.23c0 27 25.46 52.23 56.86 52.23s56.8-23.38 56.8-52.23c0 27 25.45 52.23 56.85 52.23s56.86-23.38 56.86-52.23c0 28.85 25.45 52.23 56.85 52.23h1.95c37.56-1.17 61.77-37.21 47.19-69l-43.3-94.54C423.94 60 404.26 48 382.47 48z"></path><path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M32 464h448"></path><path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M136 288h80a24 24 0 0 1 24 24v88h0h-128h0v-88a24 24 0 0 1 24-24z"></path><path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M288 464V312a24 24 0 0 1 24-24h64a24 24 0 0 1 24 24v152"></path></svg>

                </div>
                <div><DisplayAddress parseAddress={place.place.locations[0]} /></div>
            </div>
            <div className='flex justify-between w-full'>
                <span className='opacity-70'>category</span>
                <span>{place.place.category}</span>
            </div>

           
            <div className='flex justify-between w-full gap-1 overflow-auto '>
                <span className='opacity-70'>description</span>
                <span>{place.place.description}</span>
            </div>
            
            <div className='flex justify-between w-full'>
                <span className='opacity-70'>price</span>

                <span>{loopThroughPrices(place.place.price)}</span>
                {/* <span>{JSON.stringify(place.place.price)}</span> */}
            </div>

             
           
            {/* <div className='flex justify-between w-full'>
                <span>location(s)</span>
                <span>{JSON.stringify(place.place.locations[0])}</span>
            </div> */}
            <div className='flex justify-between w-full'>
                <span></span>
                <span>
                  <Badges badges={place.place.badges} />
                  
                </span>
            </div>
            {place.place.pasalubongangle ?
                <div className='flex justify-between w-full'>
                    Pasalubongable
                </div>
            :''
            }
        </Dialog.Description>

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green-400 text-green-100 hover:bg-green-500 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Done
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <svg viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z" fill="gray"></path></svg>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
    
    </>
  )
}

export default PlaceDetailsButton







 

 
 










