"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Tooltip } from "react-leaflet"
import L, { Icon, LatLng, LatLngExpression, icon, marker } from 'leaflet'

import 'leaflet/dist/leaflet.css' 
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import markerIcon from './assets/mapIcon.png'
import ChangeViewButton from "./ChangeViewButton"
import { useCounterStore } from "@/store"
import GeometryUtil from "leaflet-geometryutil";
import freebus from './geojson'
import { number } from "zod"
 
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

    const legalIcon = L.divIcon({
      html: `
      <svg viewBox="0 0 16 16"><g fill="#902f61"><path d="M9.156 14.544C10.899 13.01 14 9.876 14 7A6 6 0 0 0 2 7c0 2.876 3.1 6.01 4.844 7.544a1.736 1.736 0 0 0 2.312 0zM6 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0z" fill="currentColor"></path></g></svg>`,
      className: "svg-icon",
      iconSize: [40,40],
      iconAnchor: [20,20],
      popupAnchor: [0,-20],

    })

    const defaultPosition: [number, number] = [14.5813245, 121.0033887]
    const defaulZoom:number = 17

    const [userPosition, setUserPosition] = useState<null | string>(null)
    const [singleMarker, setSingleMarker] = useState<L.Marker | null>(null) 
    const [referenceCoords, setReferenceCoords] = useState<[number, number] | null>(null)

    const [nearestCoords, setNearestCoords] = useState<number[] | null>([])


    const getPlacesCopy = places.map((item:any) => item)
    const getPlacesCopyCoords:any = places.map((item:any) =>{
     
      const lat = parseFloat(item.locations[0].coords[0])
      const lng = parseFloat(item.locations[0].coords[1])
      // console.log([lat, lng])
      return [lat, lng]
    })
    
    const mapRef = useRef<L.Map | null>(null)
    let [markers, setMarkers] = useState<L.Marker[]>([])
    
    const MapNewComponent:FC<any> = ({data}) => {
      const map = useMap() 
      useEffect(() => {
        
        if (!mapRef.current) {return}
        markers = []
        data.forEach((item:any) => {
          const newMarker = L.marker(item.locations[0].coords, { icon: legalIcon }).addTo(map)
          newMarker.bindPopup(item.item)
          markers.push(newMarker) 
         
        })        
        console.log(markers)
      }, [])
      return null
    } 

    const MapInsideComponent = (props:any) => {
      const theMap = useMap()
    
      useMapEvents({
        click: (e) => {
          if (singleMarker) {
            singleMarker.remove()
          }
          const { lat, lng } = e.latlng
          const newMarker = L.marker([lat,lng], {icon: legalIcon}).addTo(theMap)
          setSingleMarker(newMarker)
          setUserPosition(null)  

          setReferenceCoords([lat, lng])
          // e.target.setView([lat, lng], e.target.getZoom())  

         
          
    
          const nearest = GeometryUtil.closest(theMap, getPlacesCopyCoords, e.latlng)

          if (nearest) {
              setNearestCoords([nearest.lat, nearest.lng])
          }
         
          
          
        }
      })

      //nearest coords
      useEffect(() => {

        if (!nearestCoords) return

        markers.forEach(marker => {
          const markerLatlng = marker.getLatLng()  
           
          if (
            Math.abs(parseFloat(markerLatlng.lat.toFixed(3)) - parseFloat(nearestCoords[0]?.toFixed(3))) < 0.005 &&
            Math.abs(parseFloat(markerLatlng.lng.toFixed(3)) - parseFloat(nearestCoords[1]?.toFixed(3))) < 0.005
            ) {
            theMap.flyTo(markerLatlng, 17)
            marker.openPopup() 
          }
          console.log('markerslength ', markers.length)
        })
        return
      }, [nearestCoords])
 
      
      useEffect(() => {
        if (referenceCoords) {
          console.log('hello ', referenceCoords)
        }
      }, [referenceCoords])
      
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
            const {lat, lng } = e.latlng
            setReferenceCoords([lat, lng])
          }) 
        }
      
        return 
        
 
      }, [userPosition])
  
      return null 
    } 
    
    
    const getUserLocation = () => {
      setUserPosition(prev => prev = 'getLocation')
      console.log('get user location')
    }
    
    
    return ( 
        <>
        
        <MapContainer 
          scrollWheelZoom={true}
          zoom={defaulZoom} 
          center={defaultPosition}
          className="w-full max-w-[720px] h-full"
          ref={mapRef}   
        >
          <div className="w-1/2 sm:w-1/4 absolute right-0 z-[12000] flex justify-end gap-2 bg-purple-800  backdrop-blur">
          
            <div className="text-white flex flex-col items-center">
              <span>

              { referenceCoords && referenceCoords[0] }
              </span>
              <span>  
              { referenceCoords && referenceCoords[1] }
              </span>
              <span>  
              { nearestCoords && nearestCoords[0] }
              </span>
              <span>  
              { nearestCoords && nearestCoords[1] }
              </span>
            </div>
            <div className=" w-[80px] right-2 top-2 text-white h-[80px] justify-center gap-2 flex p-2 items-center">

              <button onClick={getUserLocation} className="rounded-full flex items-center justify-center text-left text-xs w-[60px] h-[60px] bg-red-800">
                <div className='rounded-full shadow w-[32px] h-[32px] flex items-center justify-center'>
                  <svg viewBox="0 0 12 12"><g fill="none"><path d="M6 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm-.5-5.97V.5a.5.5 0 0 1 1 0v1.53A4.002 4.002 0 0 1 9.969 5.5H11.5a.5.5 0 0 1 0 1H9.969a4.002 4.002 0 0 1-3.47 3.47L6.5 10v1.5a.5.5 0 0 1-1 0V10v-.03A4.002 4.002 0 0 1 2.03 6.5a.5.5 0 0 1-.03 0H.5a.5.5 0 0 1 0-1H2a.5.5 0 0 1 .03 0A4.002 4.002 0 0 1 5.5 2.032zM3 6a3 3 0 1 0 6 0a3 3 0 0 0-6 0z" fill="white"></path></g></svg>
                </div>
              </button>
            </div>

          </div>
           
          <TileLayer  
            // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; `<a href="https://openmaptiles.org/" target="_blank">OMT</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'           
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIA_API_KEY}`} 
          />
        
          <MapInsideComponent />
          <MapNewComponent data={getPlacesCopy} />
        
        </MapContainer>
        </>
  )
}

export default Map  