import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SetURLSearchParams, useSearchParams } from 'react-router-dom'

import { useAuth } from './AuthContext'
import { usePath } from './PathContext'
import { useSearch } from './SearchContext'
import { useUpdateLayout } from './UpdateLayoutContext'

interface DataTableType {
  _id: string
  name: string
  description: string
  image: string
  totalProducts: number
  parentCategory: string
  createdAt: string
  priceDefault: number
  totalPrice: number
  statusDelivery: string
  email: string
  phone: string
  statusUser: string
  featureProduct: string
  role: string
}

interface TableContextType {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  dataTable: DataTableType[]
  setDataTable: React.Dispatch<React.SetStateAction<DataTableType[]>>
  setSearchParams: SetURLSearchParams
  numbersOfPage: number
}

const emptyDataTable: DataTableType[] = [
  {
    _id: '',
    name: '',
    description: '',
    image: '',
    totalProducts: 0,
    parentCategory: '',
    createdAt: '',
    priceDefault: 0,
    totalPrice: 0,
    statusDelivery: 'Pending',
    email: '',
    phone: '',
    statusUser: '',
    featureProduct: '',
    role: '',
  },
]

const TableContext = createContext<TableContextType>({
  loading: true,
  setLoading: () => {},
  dataTable: emptyDataTable,
  setDataTable: () => {},
  setSearchParams: () => {},
  numbersOfPage: 1,
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
  const [numbersOfPage, setNumberOfPage] = useState(1)

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
        const dataTable: DataTableType[] = responseData.data.map((data: DataTableType) => ({
          _id: data._id,
          name: data.name || 'None',
          description: data.description || 'None',
          image: data.image || 'None',
          totalProducts: Number(data.totalProducts)
            ? `${Number(data.totalProducts)}`
            : 'Updating ...',
          parentCategory: data.parentCategory || 'None',
          priceDefault: Number(data.priceDefault)
            ? `$${Number(data.priceDefault).toFixed(1)}`
            : 'Updating ...',
          createdAt: data.createdAt || 'None',
          totalPrice: Number(data.totalPrice) ? `USD$ ${Number(data.totalPrice)}` : 'Updating ...',
          statusDelivery: data.statusDelivery || 'None',
          email: data.email || 'None',
          phone: data.phone || 'None',
          statusUser: data.statusUser || 'None',
          featureProduct: data.featureProduct || 'off',
          role: data.role || 'None',
        }))

        setDataTable(dataTable)
        setNumberOfPage(responseData.numbers)

        const timeoutLoading = setTimeout(() => {
          setLoading(false)
        }, 1000)

        return () => clearTimeout(timeoutLoading)
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
        numbersOfPage,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
