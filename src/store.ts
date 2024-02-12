import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type CounterStore = {
    count: number[],
    coords?: number[],
    changeCoords: (newCoords: number[]) => void
     
}

export const useCounterStore = create<CounterStore>()(subscribeWithSelector((set) => ({
    count: [0, 0],
    coords: [1, 1],
    changeCoords: (newCoords: number[]) => set({coords: newCoords})
    
})))

