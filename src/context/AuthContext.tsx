import React, {
   ReactNode,
   createContext,
   useContext,
   useState,
   memo,
   useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Toastify from '~/services/Toastify';

// Define the type for your context value
interface AuthContextType {
   accessToken: string | null;
   login: (accessToken: string) => void;
   logout: () => void;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to access the AuthContext
export const useAuth = () => {
   return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = memo(
   ({ children }) => {
      const [accessToken, setAccessToken] = useState<string | null>(
         localStorage.getItem('access_token')
            ? localStorage.getItem('access_token')
            : null,
      );

      const navigate = useNavigate();
      const location = useLocation();
      const path = location.pathname;

      useEffect(() => {
         if (!localStorage.getItem('access_token')) {
            switch (path) {
               case '/auth/register':
                  navigate('/auth/register');
                  break;
               case '/auth/forgot-password':
                  navigate('/auth/forgot-password');
                  break;
               default:
                  navigate('/auth/login');
            }
         }
      }, [accessToken, navigate, path]);

      const login = (accessToken: string) => {
         setAccessToken(accessToken);
      };

      const logout = async () => {
         Toastify.showToastMessagePending();
         await fetch(`http://localhost:8000/logout`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               if (data.status === 'Success') {
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('id_user');
                  setAccessToken(null);
                  Toastify.showToastMessageSuccessfully(data.message);
               } else {
                  Toastify.showToastMessageFailure(data.message);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      };

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
      );
   },
);
