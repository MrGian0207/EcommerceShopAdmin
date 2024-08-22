import React, { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'

interface PathContextType {
  path: string
}

const PathContext = createContext<PathContextType>({
  path: '',
})

export const usePath = () => {
  return useContext(PathContext)
}

export const PathContextProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const path = location.pathname

  return <PathContext.Provider value={{ path }}>{children}</PathContext.Provider>
}
