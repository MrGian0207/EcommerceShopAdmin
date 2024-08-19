import React, { createContext, memo, ReactNode, useContext, useEffect, useState } from 'react'
import { UserContextType } from '~/types/ContextType'
import { User } from '~/types/UserType'

import { useAuth } from './AuthContext'

const UserContext = createContext<UserContextType | null>(null)

export const useUser = (): { dataUser: User } => {
  return useContext(UserContext) as { dataUser: User }
}

export const UserContextProvider: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  const { accessToken } = useAuth()
  const [dataUser, setdataUser] = useState<User>({})

  useEffect(() => {
    const fetchData = async () => {
      const id_user: string = localStorage.getItem('id_user')
        ? (localStorage.getItem('id_user') as string)
        : ''
      if (id_user !== '') {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id_user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken ? accessToken : 'null'}`,
            },
            credentials: 'include',
          })
          const resData = await res.json()
          setdataUser(resData.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [accessToken])
  return <UserContext.Provider value={{ dataUser }}>{children}</UserContext.Provider>
})
