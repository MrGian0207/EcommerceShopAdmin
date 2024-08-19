import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SetURLSearchParams, useSearchParams } from 'react-router-dom'

import { useAuth } from './AuthContext'
import { usePath } from './PathContext'
import { useSearch } from './SearchContext'
import { useUpdateLayout } from './UpdateLayoutContext'

interface DataTableType {
  id: string
  name: string
  description: string
  image: string
  createdAt: string
}

interface TableContextType {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  dataTable: DataTableType[]
  setDataTable: React.Dispatch<React.SetStateAction<DataTableType[]>>
  setSearchParams: SetURLSearchParams
}

const emptyDataTable: DataTableType[] = []

const TableContext = createContext<TableContextType>({
  loading: true,
  setLoading: () => {},
  dataTable: emptyDataTable,
  setDataTable: () => {},
  setSearchParams: () => {},
})

export const useTable = () => {
  return useContext(TableContext)
}

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { path } = usePath()
  const { accessToken } = useAuth()
  const { updateLayout } = useUpdateLayout()
  const { debouncedSearchText } = useSearch()
  const [loading, setLoading] = useState(true)
  const [dataTable, setDataTable] = useState(emptyDataTable)
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' })

  // Danh sách các path được phép gọi API
  const allowedPaths = useMemo(
    () => [
      '/brands',
      '/categories/main-categories',
      '/categories/sub-categories',
      '/products',
      '/orders',
      '/users',
      '/newletter',
      '/settings',
    ],
    []
  )
  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      // Chỉ cho phép những path trên được thực thi hàm
      if (!allowedPaths.includes(path)) {
        return
      }

      setLoading(true)

      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}${path}?page=${searchParams.get(
          'page'
        )}&search=${debouncedSearchText}`

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }

        const response = await fetch(url, {
          method: 'GET',
          headers,
          signal,
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const responseData = await response.json()
        const dataTable: DataTableType[] = responseData.data.map((data: any) => ({
          id: data._id,
          name: data.name,
          description: data.description,
          image: data.image,
          createdAt: data.createdAt,
        }))

        setTimeout(() => {
          setLoading(false)
        }, 3000)
        setDataTable(dataTable)
      } catch (error) {
        console.log(error)
      }
    },
    [allowedPaths, accessToken, path, searchParams, debouncedSearchText]
  )

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    fetchData(signal)

    return () => {
      controller.abort()
    }
  }, [fetchData, updateLayout])

  return (
    <TableContext.Provider
      value={{
        loading,
        setLoading,
        dataTable,
        setDataTable,
        setSearchParams,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
