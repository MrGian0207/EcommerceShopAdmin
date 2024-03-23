import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    memo,
} from 'react';

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

        const login = (accessToken: string) => {
            setAccessToken(accessToken);
        };

        const logout = async () => {
            await fetch('http://localhost:8000/logout', {
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
                    console.log(data.status);
                    localStorage.removeItem('access_token');
                    setAccessToken(null);
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
