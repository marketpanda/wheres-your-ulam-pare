export interface City {
    name: string
    latLng: number[]
}

export const cityData:City[] = [
    {
        name: 'Miami, FL',
        // LatLng array that represents a geographical point (the city):
        latLng: [25.7617, -80.1918],
      },
      {
        name: 'New York City, NY',
        latLng: [40.7128, -74.0060],
      },
      {
        name: 'Baltimore, MD',
        latLng: [39.2904, -76.6122],
      },
      {
        name: 'Lincoln, NE',
        latLng: [40.8136, -96.7026],
      },
      {
        name: 'Los Angeles, CA',
        latLng: [34.0522, -118.2437],
      },
]