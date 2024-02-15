"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Tooltip } from "react-leaflet"
import L, { Icon, LatLng, icon } from 'leaflet'
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

    const legalIcon = new Icon({
      // iconUrl: 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-legal-business-and-finance-icongeek26-linear-colour-icongeek26.png',
      iconUrl: markerIcon.src,
      iconSize: [40,40],
      iconAnchor: [20,20],
      popupAnchor: [0,-20],
     
    })
 
    // const map = useRef()
 
    const defaultPosition: [number, number] = [14.5813245, 121.0033887]
    const defaulZoom:number = 17

    const [userPosition, setUserPosition] = useState<null | string>(null)
    const [singleMarker, setSingleMarker] = useState<L.Marker | null>(null) 
    const MapInsideComponent = (props:any) => {
      const theMap = useMap()
      const theMapEvents = useMapEvents({
        click: (e) => {
          if (singleMarker) {
            singleMarker.remove()
          }
          const { lat, lng } = e.latlng
          const newMarker = L.marker([lat,lng], {icon: legalIcon}).addTo(theMapEvents)
          setSingleMarker(newMarker)
          setUserPosition(null)

          e.target.setView([lat, lng], e.target.getZoom())
        }
      })
      
      useEffect(() => { 
        const unsub = useCounterStore.subscribe(state => state, (newState, prevState) => { 
          
          if (theMap) {
            const num1 = parseFloat(newState.place.coords[0])
            const num2 = parseFloat(newState.place.coords[0][1])
            
            theMap.flyTo([num1, num2], 18, {
              animate: true,
              duration: 2
            })
          }
          console.log(newState.place.coords)
          console.log(newState.place.activePlaceId)
           

          
        }) 
        return unsub
      }, [])

      useEffect(() => {
        if (userPosition === 'getLocation') {
          theMap.locate().on("locationfound", (e) => {
            const userLocationMarker = L.marker(e.latlng, {icon: legalIcon}).addTo(theMap)
            userLocationMarker.bindPopup(`You are here`).openPopup()
            theMap.flyTo(e.latlng, 16)
            setUserPosition(null)
          }) 
        }
  
        return
 
      }, [userPosition])
 
      return userPosition === null ? null : (
        <Marker  position={[14.5787404,121.0001156]}>
          <Popup>You are here</Popup>
        </Marker>
      ) 
    } 
    const pinUserLocation = (e:any) => {
      if (userPosition !== 'pinLocation') {
        setUserPosition(prev => prev = 'pinLocation')
        console.log('hello')
      }
    }
    
    const getUserLocation = () => {
      setUserPosition(prev => prev = 'getLocation')
      console.log('get user location')
    }
 
    return ( 
        <>
        <div className="z-[12000]  bg-purple-800 text-white w-full justify-between flex items-center">
          <button onClick={pinUserLocation} className="h-12 rounded-full">Pin Location</button>
          <button onClick={getUserLocation} className="h-12 rounded-full">Get Current Location</button>
        </div>
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
              <>
             
              <Marker 
                position={entry.locations[0].coords}
                key={entry.id}
                // ref={entry.id}
                icon={legalIcon}
              >
                 {/* <Tooltip>
                  <div className="w-[180px]">
                    <div className="h-full overflow-hidden rounded">
                      <img
                        className="object-cover w-full h-12"
                        src={ entry.images } 
                        alt={ entry.item } />
                    </div> 
                    <span className="font-bold text-violet-900 mt-1 w-full flex justify-end">
                      @{entry.place} 
                    </span>
                  </div>
              
                </Tooltip> */}
                <Popup> 
                  <div className="w-[180px]">
                  <div className="h-full overflow-hidden rounded">
                    <img
                      className="object-cover w-full h-12"
                      src={ entry.images } 
                      alt={ entry.item } />
                  </div>
                 
                    <span className="font-bold text-violet-900 mt-1 w-full flex justify-end">
                      @{entry.place} 
                    </span>
                  </div>
                </Popup>
              </Marker>
              </>
            ))
 

          }
            {/* <Marker 
              position={[14.5787404,121.0001156]}
              icon={legalIcon}>
            </Marker> */}

         
            
          <MapInsideComponent />
        
        </MapContainer>
        </>
  )
}

export default Map
