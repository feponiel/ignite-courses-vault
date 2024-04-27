import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/api'

export interface Coffee {
  name: string
  description: string
  image: string
  tags: string[]
  price: number
  amount: number
}

interface CoffeeContextData {
  coffeeList: Coffee[]
}

export const CoffeeContext = createContext({} as CoffeeContextData)

interface CoffeeContextProviderProps {
  children: ReactNode
}

export function CoffeeContextProvider({
  children,
}: CoffeeContextProviderProps) {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([])

  function initCoffeeList(coffees: Coffee[]) {
    setCoffeeList(coffees)
  }

  useEffect(() => {
    const fetchCoffeeList = async () => {
      const coffees = await api
        .get('/coffeeList')
        .then((response) => response.data)

      initCoffeeList(coffees)
    }

    fetchCoffeeList()
  }, [])

  return (
    <CoffeeContext.Provider
      value={{
        coffeeList,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  )
}
