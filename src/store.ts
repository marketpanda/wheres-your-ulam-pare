import { Marker } from 'leaflet'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type CounterStore = {
    place: {
        coords?: any 
        activePlaceId?:any
        focusMarker?: any
    },
    focusMarker2?: any
    changeCoords: (newCoords: number[]) => void 
    changeActivePlaceId: (newId: string) => void 
    changePlace: (newCoords: any, newPlaceId: string) => void 
    changeFocusMarker: (theMarker: L.Marker) => void
}

export const useCounterStore = create<CounterStore>()(subscribeWithSelector((set) => ({
    place: { 
        coords: [1, 1],
        activePlaceId: null, 
        focusMarker:null 
    },
    focusMarker2: null,
    changeCoords: (newCoords) => set((state) => ({ ...state, place: { ...state.place, coords: newCoords}})),
    changeActivePlaceId: (newId) => set((state) => ({ ...state, place: { ...state.place, activePlaceId: newId }})),
    changePlace: (newCoords: number[], newId: string) => set((state) => ({
        ...state,
        place: {
            coords: newCoords,
            activePlaceId: newId
        }
    })),
    changeFocusMarker: (newFocusMarker:L.Marker) => set((state) => ({ ...state, focusMarker2: newFocusMarker }) )
})))

