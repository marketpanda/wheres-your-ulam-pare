"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import { FC, useRef } from "react"

interface MarkerData {
  coordinates: [number, number]
  title: string
}

const Map:FC = ()  => { 
 
    return ( 
        <MapContainer
        scrollWheelZoom={true}
        zoom={14} 
        center={[14.5813245, 121.0033887]}
        className="w-full max-w-[720px] h-full"
        
        >
          <TileLayer  
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OMT</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'           
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            
          />
      
       </MapContainer>
  )
}

export default Map
