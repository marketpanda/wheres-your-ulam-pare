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
 
    const defaultPosition: [number, number] = [14.5813245, 121.0033887]
    const defaulZoom:number = 17

    const [userPosition, setUserPosition] = useState<null | string>(null)
    const [singleMarker, setSingleMarker] = useState<L.Marker | null>(null) 
    const [referenceCoords, setReferenceCoords] = useState<[number, number] | null>(null)

    const [userLocationMaker, setUserLocationMaker] = useState<L.Marker | null>(null)

    const getPlacesCopy = places.map((item:any) => item)
    const getPlacesCopyCoords:any = places.map((item:any) =>{
      const coordString = item.locations[0].coords
      const lat = parseFloat(item.locations[0].coords[0])
      const lng = parseFloat(item.locations[0].coords[1])
      console.log([lat, lng])
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

          setUserLocationMaker(newMarker)

          setReferenceCoords([lat, lng])
          e.target.setView([lat, lng], e.target.getZoom())  
          
          const nearest = GeometryUtil.closest(theMap, getPlacesCopyCoords, e.latlng)
          console.log(nearest)  
          
        }
      })
 
     

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
      
       
        
 
      }, [userPosition])
  
      return null
      
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
        
        <MapContainer 
          scrollWheelZoom={true}
          zoom={defaulZoom} 
          center={defaultPosition}
          className="w-full max-w-[720px] h-full"
          ref={mapRef}   
        >
          <div className="w-1/2 sm:w-1/4 absolute right-0 z-[12000] flex justify-end gap-2 bg-purple-800 opacity-50 backdrop-blur">
          {/* <button onClick={pinUserLocation} className="rounded-full w-20 text-left text-xs">Pin Location</button> */}
            <div className="text-white flex flex-col items-center">
              <span>

              { referenceCoords && referenceCoords[0] }
              </span>
              <span>  
              { referenceCoords && referenceCoords[1] }
              </span>
            </div>
            <div className=" w-[40px] right-2 top-2 text-white h-[40px] justify-center gap-2 flex p-2 items-center">

              <button onClick={getUserLocation} className="rounded-full text-left text-xs">
                <div className='rounded-full shadow w-[24px] h-[24px] flex items-center justify-center'>
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