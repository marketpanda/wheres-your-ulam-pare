"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import markerIcon from './assets/mapIcon.png'
import ChangeViewButton from "./ChangeViewButton"
import { useCounterStore } from "@/store"
interface MarkerData {
  coordinates: [number, number]
  title: string
}

interface Props { 
  places: Place[]
 
}

interface Place {
  item: string
  place: string
  location: { coords: [number, number]}[]
}

const Map:FC<Props> = ({places})  => {  
    // https://www.youtube.com/watch?v=V7LfrS3T5fs
    // https://www.youtube.com/watch?v=OpvGiudUgXs
    // console.log('places ', places) 
    const map = useRef()
    // const [map, setMap] = useState<any | undefined>(null)
    const defaultPosition: [number, number] = [14.5813245, 121.0033887]
    const defaulZoom:number = 17

    const { coords } = useCounterStore()

    const MapInsideComponent = (props:any) => {
      const theMap = useMap()

      useEffect(() => {
        const unsub = useCounterStore.subscribe(state => state.coords, (fish, prevFish) => {
          
          if (theMap) {
            const num1 = parseFloat(fish[0])
            const num2 = parseFloat(fish[0][1])
            
            // console.log(num1)
            // console.log(num2)
            theMap.flyTo([num1, num2], theMap.getZoom(), {
              animate: true,
              duration: 2
            })
            console.log(fish)
            console.log(theMap)
          }
        }) 
        return unsub
      }, [])
      return null 
    }

    
    return ( 
        <MapContainer 
          
          scrollWheelZoom={true}
          zoom={defaulZoom} 
          center={defaultPosition}
          className="w-full max-w-[720px] h-full"  
        >
           
          <TileLayer  
            // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; `<a href="https://openmaptiles.org/" target="_blank">OMT</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'           
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIA_API_KEY}`} 
          />
          {
            places.map((entry:any, i:number) => (
              <Marker 
                position={entry.locations[0].coords}
                key={i}
              >
                <Popup>
                  
                  {entry.item}@
                  {entry.place}
                  
                </Popup>
              </Marker>
            ))
          }
          {/* <ChangeViewButton
            map = {mapRef.current}
            coords={getCoordsOfCurrentPlace}
            zoom={17}
          /> */}
          <MapInsideComponent />

      </MapContainer>
  )
}

export default Map
