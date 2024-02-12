import React, { FC } from 'react'
import { useCounterStore } from '@/store'
interface Props {
    map?: any
    coords?: any
    zoom?: number
    count?:number
}

const ChangeViewButton:FC<Props> = ({map, coords, zoom, count}) => {
    const { changeCoords } = useCounterStore()
    
    const zoomToMap = () => {

        useCounterStore.getState().changeCoords(coords) 
        // console.log('coords ', coords)
    
        if (map) {
            map.setView(coords, zoom, { animate: true })
        }

    }

    changeCoords
  return (
    
    <button onClick={() => zoomToMap()}>

                                    
        <div className='rounded-full bg-white shadow w-[48px] h-[48px]  flex items-center justify-center'>
            <svg viewBox="0 0 28 28" width="32" height="32"><g fill="none"><path d="M14 2.25c5.385 0 9.75 4.365 9.75 9.75c0 4.12-2.895 8.61-8.61 13.518a1.75 1.75 0 0 1-2.283-.002l-.378-.328C7.017 20.408 4.25 16.028 4.25 12c0-5.385 4.365-9.75 9.75-9.75zm0 6a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5z" fill="purple"></path></g></svg> 
        </div>
    </button>
  )
}

export default ChangeViewButton