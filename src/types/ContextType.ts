import { User } from './UserType'

export type AuthContextType = {
  accessToken: string
  login: (accessToken: string) => void
  logout: () => void
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
  dataUser: User
}
