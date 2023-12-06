import { MapPin } from 'phosphor-react'
import { LocateContainer } from './styles'
import axios from 'axios'
import { useState } from 'react'

interface LocationData {
  city: string
  uf: string
}

export function Locate() {
  const [location, setLocation] = useState<LocationData>()

  const url =
    'https://api.bigdatacloud.net/data/ip-geolocation?localityLanguage=en&key=bdc_673945a1aa6e4620b05847f0446b65ec'

  axios
    .get(url)
    .then((response) => {
      setLocation({
        city: response.data.location.city,
        uf: response.data.location.isoPrincipalSubdivisionCode,
      })
    })
    .catch((error) => {
      console.error(error)
    })

  return (
    <LocateContainer>
      <MapPin size={22} weight="fill" />
      <span>
        {location?.city || 'Porto Alegre'}, {location?.uf.slice(3) || 'RS'}
      </span>
    </LocateContainer>
  )
}
