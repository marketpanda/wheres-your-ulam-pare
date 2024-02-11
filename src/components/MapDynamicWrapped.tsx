import dynamic from 'next/dynamic'

const MapDynamicWrapped = dynamic(() => import('../components/Map'), {
  ssr: false
})

const MapCaller = ({places}: {places:any}) => {
  return <MapDynamicWrapped places={places} />
}

export default MapCaller