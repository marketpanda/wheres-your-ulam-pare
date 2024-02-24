import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'


const PlaceDetailsButton = (place:any) => {
  

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
            {place.place.item}
        
        </Dialog.Title>
        <Dialog.Description className="flex flex-col mt-[10px] mb-5 text-[15px] leading-normal">
            <div className='flex justify-between w-full h-32'>
                <Image src={place.place.images} className="object-cover w-full" alt="Image" width={200} height={200} />
            </div>
            <div className='flex justify-between w-full'>
                <span>Item</span>
                <span>{place.place.item}</span>
            </div>
            <div className='flex justify-between w-full'>
                <span>category</span>
                <span>{place.place.category}</span>
            </div>
            <div className='flex justify-between w-full'>
                <span>description</span>
                <span>{place.place.description}</span>
            </div>
            
            <div className='flex justify-between w-full'>
                <span>price</span>
                <span>{JSON.stringify(place.place.price)}</span>
            </div>
            {/* <div className='flex justify-between w-full'>
                <span>location(s)</span>
                <span>{JSON.stringify(place.place.locations[0])}</span>
            </div> */}
            <div className='flex justify-between w-full'>
                <span>badges</span>
                <span>{place.place.badges}</span>
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
            x
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
    
    </>
  )
}

export default PlaceDetailsButton







 

 
 










