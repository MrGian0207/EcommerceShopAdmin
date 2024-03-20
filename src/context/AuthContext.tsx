import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';

// Define the type for your context value
interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isRefresh, setIsRefesh] = useState<boolean>(false);

    const login = (accessToken: string, refreshToken: string) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        fetch('http://localhost:8000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
        })
            .then((res) => {
                return res.json;
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    setTimeout(() => {
        setIsRefesh(!isRefresh);
    }, 30000);

    useEffect(() => {
        if (isRefresh) {
            fetch('http://localhost:8000/refreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    try {
                        const { status, accessToken } = data;
                        if (status === 'success') {
                            setAccessToken(accessToken);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRefresh]);

    return (
        <AuthContext.Provider
            value={{ accessToken, refreshToken, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
