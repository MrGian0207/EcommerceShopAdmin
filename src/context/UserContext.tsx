import React, {
   ReactNode,
   createContext,
   useContext,
   useState,
   memo,
   useEffect,
} from 'react';
import { useAuth } from './AuthContext';

type UserContextType = {
   dataUser: User;
};

type User = {
   fullName?: string;
   gender?: string;
   phoneNumber?: number;
   emailAddress?: string;
   password?: string;
   status?: string;
   role?: string;
   about?: string;
   image?: string;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
   return useContext(UserContext);
};

export const UserContextProvider: React.FC<{ children: ReactNode }> = memo(
   ({ children }) => {
      const { accessToken } = useAuth()!;
      const [dataUser, setdataUser] = useState<User>({});

      useEffect(() => {
         const fetchData = async () => {
            const id_user: string = localStorage.getItem('id_user')
               ? (localStorage.getItem('id_user') as string)
               : '';
            try {
               const res = await fetch(
                  `http://localhost:8000/users/${id_user}`,
                  {
                     method: 'GET',
                     headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                     },
                     credentials: 'include',
                  },
               );
               const resData = await res.json();
               setdataUser(resData.data);
            } catch (error) {
               console.log(error);
            }
         };
         fetchData();
      }, [accessToken]);
      return (
         <UserContext.Provider value={{ dataUser }}>
            {children}
         </UserContext.Provider>
      );
   },
);
