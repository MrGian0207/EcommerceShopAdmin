import React, { createContext, memo, ReactNode, useContext, useState } from 'react'
import { useDebounce } from '~/hooks'
import { SearchContextType } from '~/types/ContextType'

const SearchContext = createContext<SearchContextType>({
  debouncedSearchText: '',
  searchText: '',
  setSearchText: () => {},
})

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchContextProvider: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 1000)
  return (
    <SearchContext.Provider
      value={{
        debouncedSearchText,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
})
