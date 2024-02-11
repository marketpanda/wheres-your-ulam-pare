 
import dynamic from 'next/dynamic'


const MapDynamicWrapped = dynamic(() => import('../components/Map'), {
  ssr: false
})

export default MapDynamicWrapped