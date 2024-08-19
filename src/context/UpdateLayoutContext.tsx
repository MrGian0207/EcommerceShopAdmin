import React, { createContext, memo, ReactNode, useContext, useState } from 'react'
import { UpdateLayoutContextType } from '~/types/ContextType'

const UpdateLayoutContext = createContext<UpdateLayoutContextType>({
  updateLayout: false,
  handleUpdateLayoutApp: () => {},
})

export const useUpdateLayout = () => {
  return useContext(UpdateLayoutContext)
}

export const UpdateLayoutContextProvider: React.FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    const [updateLayout, setUpdateLayout] = useState<boolean>(false)
    const handleUpdateLayoutApp = () => {
      setUpdateLayout((prevState) => !prevState)
    }
    return (
      <UpdateLayoutContext.Provider
        value={{
          updateLayout,
          handleUpdateLayoutApp,
        }}
      >
        {children}
      </UpdateLayoutContext.Provider>
    )
  }
)
