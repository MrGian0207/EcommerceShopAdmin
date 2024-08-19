import React, { createContext, useContext, useState } from 'react'

interface ModalContextType {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  toggleModal: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextType>({
  isEdit: false,
  setIsEdit: () => {},
  toggleModal: false,
  setToggleModal: () => {},
})

export const useModal = () => {
  return useContext(ModalContext)
}

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  return (
    <ModalContext.Provider value={{ isEdit, setIsEdit, toggleModal, setToggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}
