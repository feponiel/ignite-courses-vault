import { createContext, ReactNode, useState } from 'react'

interface ClientInfoFormat {
  street: string
  number: number
  district: string
  city: string
  uf: string
  payment: string
}

interface ClientInfoContextData {
  clientInfo: ClientInfoFormat | null
  setClientInfo: (clientInfo: ClientInfoFormat) => void
}

export const ClientInfoContext = createContext({} as ClientInfoContextData)

interface ClientInfoContextProviderProps {
  children: ReactNode
}

export function ClientInfoContextProvider({
  children,
}: ClientInfoContextProviderProps) {
  const [clientInfo, setClientInfo] = useState<ClientInfoFormat | null>(null)

  return (
    <ClientInfoContext.Provider
      value={{
        clientInfo,
        setClientInfo,
      }}
    >
      {children}
    </ClientInfoContext.Provider>
  )
}
