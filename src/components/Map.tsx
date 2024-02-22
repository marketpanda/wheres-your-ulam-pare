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
import { getDistance } from 'geolib';

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

    const [nearestCoords, setNearestCoords] = useState<any>([])
    const [focusMarker, setFocusMarker] = useState<any | null>(null)

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
        
        if (!mapRef.current) { return }
        markers = []
        data.map((item:any) => {
          const newMarker = L.marker(item.locations[0].coords, { icon: legalIcon }).addTo(map)
          newMarker.bindPopup(item.item)
          markers.push(newMarker) 
        })        
        // console.log(markers)
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
         
          const latCast = parseFloat(lat.toFixed(6))
          const lngCast = parseFloat(lng.toFixed(6))
          console.log(latCast, lngCast)
          const newMarker = L.marker([lat, lng], {icon: legalIcon}).addTo(theMap)
          setSingleMarker(newMarker)
          setUserPosition(null)  

          setReferenceCoords([lat, lng])
          // console.log(lat.toFixed(6), lng.toFixed(6))
          // e.target.setView([lat, lng], e.target.getZoom())  
          
          const nearest = GeometryUtil.closest(theMap, getPlacesCopyCoords, [latCast, lngCast])
          console.log(nearest)
          console.log(getPlacesCopyCoords)
          if (nearest) {
              setNearestCoords([parseFloat(nearest.lat.toFixed(6)), parseFloat(nearest.lng.toFixed(6))]) 
          }
        }
      })

      //nearest coords
      useEffect(() => {
 
        if (!nearestCoords) return
 
        const computeDistances = async() => {   
          // const sampleDistance = getDistance([14.600887, 120.9758244], [14.6013282, 120.9770207], 1)
          // console.log(sampleDistance)
          let differences = await Promise.all(
            markers.map(async (marker) => {
              const markerLatLng = marker.getLatLng()
              console.log(markerLatLng)
              console.log(nearestCoords)
              const getDistanceViaPackage = getDistance([markerLatLng.lat, markerLatLng.lng], nearestCoords, 1)
              
              
              return { dist: getDistanceViaPackage, theMarker: marker, coords: [markerLatLng.lat, markerLatLng.lng]}
            })
          ).then(
            result => {
              result.sort((a, b) => a.dist - b.dist) 
              return result[0]?.theMarker
              
              // theMap.flyTo(result[0]?.theMarker?.getLatLng(), 17)
              // result[0]?.theMarker.openPopup()
            }
          ).then(result => { 
              console.log(result)
            }
          ).catch(e =>
            console.log('Error ', e.message)
          )

          
          

          // if (differences.length) {
          //   console.log(differences[0].theMarker.getLatLng())
          //   // theMap.flyTo(differences[0].theMarker.getLatLng(), 17)
          // } 

          // try {
          //   if (differences && differences.length > 0 && differences[0].theMarker) {               
          //     theMap.flyTo(differences[0].theMarker?.getLatLng(), 17)
          //     differences[0].theMarker.openPopup()
          //   }
          // } catch (e) {
          //   console.log(e)
          // }
         
        }

        computeDistances() 
        return
      }, [nearestCoords, marker])

       
      
      useEffect(() => {
        if (referenceCoords) {
          // console.log('hello ', referenceCoords)
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
          // console.log(newState.place.coords)
          // console.log(newState.place.activePlaceId)
          
          const lat = newState.place.coords[0][0]
          const lng = newState.place.coords[0][1]

          //pull lat and lng from an object and convert it to float from string
          const currentCoord = [parseFloat(lat), parseFloat(lng)] 
          //we find marker with equivalent lat, and we skip verifying its lng, since almost always
          // it will be a match and we are using 'find', which returns the first result
          const currentMarker = markers.find(marker => marker.getLatLng().lat === currentCoord[0])

          if (currentMarker) {
            currentMarker.openPopup()
          } else {
            console.log('marker not found')
          }
        
            
          
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
          <div className="w-[100px] absolute right-0 z-[12000] flex justify-end gap-2">
          
            {/* <div className="text-white flex flex-col items-center">
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
            </div> */}
            <div className="w-[80px] right-1 top-1 text-white h-[80px] justify-center gap-2 flex p-2 items-center">
              <button onClick={getUserLocation} className="rounded-full flex items-center justify-center text-left text-xs w-[40px] h-[40px] bg-red-800">
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