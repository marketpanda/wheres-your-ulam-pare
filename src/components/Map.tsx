"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
        zoom: 5,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [MAP_TILE]
    }

    useEffect(() => {
        mapRef.current = L.map('map', mapParams) 
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
            }
        }
    }, [])

    useEffect(() => {
        controlRef.current = L.control.layers({
            OpenStreetMap: MAP_TILE,
        })
        .addTo(mapRef.current)
        L.control.zoom({
            position: 'topright'
        })
        .addTo(mapRef.current)
    }, [])

    return (
        <div>
            <div id="map"></div>
           test
        </div>
    )
}