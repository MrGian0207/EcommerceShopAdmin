import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    memo,
} from 'react';

interface UpdateLayoutContextType {
    updateLayout: boolean | null;
    SetUpdateLayout: () => void;
}

const UpdateLayoutContext = createContext<UpdateLayoutContextType | null>(null);

export const useUpdateLayout = () => {
    return useContext(UpdateLayoutContext);
};

export const UpdateLayoutContextProvider: React.FC<{ children: ReactNode }> =
    memo(({ children }) => {
        const [updateLayout, setUpdateLayout] = useState<boolean | null>(false);
        const SetUpdateLayout = () => {
            setUpdateLayout((prevState) => !prevState);
        };
        return (
            <UpdateLayoutContext.Provider
                value={{
                    updateLayout,
                    SetUpdateLayout,
                }}
            >
                {children}
            </UpdateLayoutContext.Provider>
        );
    });
