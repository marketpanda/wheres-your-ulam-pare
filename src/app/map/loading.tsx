import Image from 'next/image'
import React from 'react'
import splashImage from "./Yubaba._resized.png"

const loading = () => {
    
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <span className='font-semibold text-xl'>

        Loading...
        </span>
        <div className='opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Image src={splashImage.src} width={300} height={300} alt="Loading..." />
        </div>
    </div>
  )
}

export default loading