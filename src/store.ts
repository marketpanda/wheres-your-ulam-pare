import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type CounterStore = { 
    place: {
        coords?: any 
        activePlaceId?:any
        focusMarker?: any
    }    
    changeCoords: (newCoords: number[]) => void 
    changeActivePlaceId: (newId: string) => void 
    changePlace: (newCoords: any, newPlaceId: string) => void 
}

export const useCounterStore = create<CounterStore>()(subscribeWithSelector((set) => ({
    place: { 
        coords: [1, 1],
        activePlaceId: null,
        focusMarker: null
         
    },
    changeCoords: (newCoords) => set((state) => ({ ...state, place: { ...state.place, coords: newCoords}})),
    changeActivePlaceId: (newId) => set((state) => ({ ...state, place: { ...state.place, activePlaceId: newId }})),
    changePlace: (newCoords: number[], newId: string) => set((state) => ({
        ...state,
        place: {
            coords: newCoords,
            activePlaceId: newId
        }
    }))
})))

