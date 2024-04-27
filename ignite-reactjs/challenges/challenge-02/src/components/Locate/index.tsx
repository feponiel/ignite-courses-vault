import { MapPin } from 'phosphor-react'
import { LocateContainer } from './styles'
import axios from 'axios'
import { useState } from 'react'

interface LocationData {
  city: string
  uf: string
}

export function Locate() {
  return (
    <LocateContainer>
      <MapPin size={22} weight="fill" />
      <span>Porto Alegre</span>
    </LocateContainer>
  )
}
