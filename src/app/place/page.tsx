 
import Image from 'next/image'
import React from 'react'

 
const Place = () => {



  return (
    <div className="w-screen h-screen flex items-center">
      
      <div className="flex justify-center flex-col max-w-[500px] items-center mx-auto
        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full h-full
        rounded">
        <div className="mb-5"><Image alt="Cheese Puff" className="w-[240px] h-[240px] rounded-full" src="https://images.summitmedia-digital.com/spotph/images/2020/05/12/2-1589280286.jpg" /></div>
        <div className="font-semibold text-xl">Cheese Puff</div>
        
       

        <div className="flex flex-col gap-1 text-sm mt-3">
        <div className="flex">
            <div className="text-right w-20 border border-dashed p-1">by</div>
            <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">Tokyo Milk Cheese</div>
        </div>
        <div className="flex">
            <div className="text-right w-20 border p-1 border-dashed">category:</div>
            <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">bread / sweets</div> 
        </div>
        <div className="flex">
            <div className="text-right w-20 border p-1 border-dashed">price:</div>
            <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">Php130 per pc, Php700 per box</div> 
        </div>
        <div className="flex">
            <div className="text-right w-20 border p-1 border-dashed">found in:</div>
            <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">Robinsons Manila</div> 
        </div>
        <div className="flex">
            <div className="text-right w-20 border p-1 border-dashed">city:</div>
            <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">manila</div> 
        </div>
        <div className="flex">
            <div className="text-right w-20 border p-1 border-dashed">comments::</div>
            <div className="text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">&quot;RSC craving is real!&quot;</div> 
        </div>

          <div className="flex">
            <div className="text-right w-20 border p-1  border-dashed">badges:</div>
            <div className="flex gap-2 text-sm border grow p-1 border-dashed bg-white bg-opacity-50 backdrop-blur-md">
              <button className="px-4 py-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-xs rounded-full">
              pasalubong-able
              </button>
              <button className="px-4 py-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-xs rounded-full">
              on the go
              </button>
              
            </div>
              
          </div> 
        
        </div>
      </div>
    </div>
  )
}

export default Place