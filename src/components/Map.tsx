"use client"

import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { City, cityData } from './assets/data'

const MAP_TILE = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
)

export default function Map():JSX.Element {  
    const mapRef = useRef<L.Map | null>(null)
    const layerRef = useRef<L.LayerGroup | null>(null)
    const controlRef = useRef<L.Control.Layers | null>(null)  

    const mapParams:L.MapOptions = {
        center: L.latLng(37.0902, -95.7129),
        zoom: 12,
        zoomControl: false, 
        layers: [MAP_TILE]
    }

    const [map, setMap] = useState(null)

    useEffect(() => {
        // const map = L.map('map', mapParams)
        mapRef.current = L.map('map', mapParams) 
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
            }
        }
    }, [])

    useEffect(() => {
        controlRef.current = L.control
            .layers({
                OpenStreetMap: MAP_TILE,
            })  
            .addTo(mapRef.current)
        L.control
            .zoom({
                position: 'topright'
            })
            .addTo(mapRef.current)
    }, [])

    useEffect(() => {
        mapRef.current.on('zoomstart', () => {
            console.log('zoom started')
        })
    }, [])

    useEffect(() => {
        layerRef.current = L.layerGroup().addTo(mapRef.current)
        controlRef.current?.addOverlay(layerRef.current, 'Circles')
    }, [])

    useEffect(() => {
        layerRef.current?.clearLayers()

        cityData.forEach((city:City) => {
            const [lat, lng] = city.latLng
            L.circle(L.latLng(lat, lng), {
                radius: 100000,
            }).addTo(layerRef.current)
        })
    }, [cityData])
    return (
        <div>
            <div id="map" className='w-full h-[350px] bg-red-500 overflow-hidden '></div>
           test
        </div>
    )
}