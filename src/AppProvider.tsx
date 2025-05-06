import React from 'react'

import { AuthProvider } from './context/AuthContext'
import { DeleteDataContextProvider } from './context/DeleteDataContext'
import { ModalContextProvider } from './context/ModalContext'
import { PathContextProvider } from './context/PathContext'
import { ProductContextProvider } from './context/ProductContext'
import { TableContextProvider } from './context/TableContext'
import { UserContextProvider } from './context/UserContext'

const providers = [
  PathContextProvider,
  AuthProvider,
  UserContextProvider,
  ModalContextProvider,
  ProductContextProvider,
  TableContextProvider,
  DeleteDataContextProvider,
]

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {providers.length > 0 ? (
        providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children)
      ) : (
        <>{children}</>
      )}
    </>
  )
}
