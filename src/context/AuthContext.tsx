import React, {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import * as Toastify from '~/services/Toastify'
import { AuthContextType } from '~/types/ContextType'
import { useLocation, useNavigate } from 'react-router-dom'

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  login: () => {},
  logout: () => {},
})

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext)
}

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('access_token') || '')

  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      switch (path) {
        case '/auth/register':
          navigate('/auth/register')
          break
        case '/auth/forgot-password':
          navigate('/auth/forgot-password')
          break
        default:
          navigate('/auth/login')
      }
    }
  }, [accessToken, navigate, path])

  const login = useCallback((accessToken: string) => {
    setAccessToken(accessToken)
  }, [])

  const logout = async () => {
    Toastify.showToastMessagePending()
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.status === 'Success') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('id_user')
          setAccessToken('')
          Toastify.showToastMessageSuccessfully(data.message)
        } else {
          Toastify.showToastMessageFailure(data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
})
