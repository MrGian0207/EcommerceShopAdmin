import React, { createContext, memo, ReactNode, useContext, useEffect, useState } from 'react'
import { UserContextType } from '~/types/ContextType'
import { User } from '~/types/UserType'

import { useAuth } from './AuthContext'

const emptyDataUser = {
  _id: '',
  name: '',
  gender: '',
  phone: '',
  email: '',
  password: '',
  status: '',
  role: '',
  about: '',
  image: '',
}

const UserContext = createContext<UserContextType>({
  dataUser: emptyDataUser,
})

export const useUser = () => {
  return useContext(UserContext)
}

export const UserContextProvider: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  const { accessToken } = useAuth()
  const [dataUser, setdataUser] = useState<User>(emptyDataUser)

  useEffect(() => {
    const fetchData = async () => {
      const id_user = localStorage.getItem('id_user') || ''
      if (id_user !== '') {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id_user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
          })
          const resData = await res.json()
          setdataUser(resData)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [accessToken])
  return <UserContext.Provider value={{ dataUser }}>{children}</UserContext.Provider>
})
