import React from 'react'

import { User } from './UserType'

export type AuthContextType = {
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  logout: () => Promise<void>
}

export type SearchContextType = {
  searchText: string
  debouncedSearchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

export type UpdateLayoutContextType = {
  updateLayout: boolean | null
  handleUpdateLayoutApp: () => void
}

export type UserContextType = {
  loadingUser: boolean
  dataUser: User
}
