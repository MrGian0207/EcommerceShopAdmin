import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserContextType } from '~/types/ContextType'
import { emptyDataUser, User } from '~/types/UserType'

import { useAuth } from './AuthContext'

const UserContext = createContext<UserContextType>({
  loadingUser: false,
  dataUser: emptyDataUser,
})

export const useUser = () => useContext(UserContext)

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth()
  const [loadingUser, setLoadingUser] = useState(false)
  const [dataUser, setDataUser] = useState<User>(emptyDataUser)

  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      setLoadingUser(true)

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
            signal,
          })

          const resData = await res.json()
          if (!signal.aborted && resData) {
            setDataUser(resData) // Đặt dữ liệu trước
          }
        } catch (error) {
          console.log(error)
        } finally {
          if (!signal.aborted) {
            setTimeout(() => {
              setLoadingUser(false)
            }, 500)
          }
        }
      } else {
        setTimeout(() => {
          setLoadingUser(false)
        }, 500)
      }
    },
    [accessToken]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchData])

  return <UserContext.Provider value={{ dataUser, loadingUser }}>{children}</UserContext.Provider>
}
