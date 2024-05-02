import React, {
   ReactNode,
   createContext,
   useContext,
   useState,
   memo,
} from 'react';
import { useDebounce } from '~/hooks';

type SearchContextType = {
   searchText: string;
   debouncedSearchText: string;
   setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = () => {
   return useContext(SearchContext);
};

export const SearchContextProvider: React.FC<{ children: ReactNode }> = memo(
   ({ children }) => {
      const [searchText, setSearchText] = useState<string>('');
      const debouncedSearchText = useDebounce(searchText, 1000);
      return (
         <SearchContext.Provider
            value={{
               debouncedSearchText,
               searchText,
               setSearchText,
            }}
         >
            {children}
         </SearchContext.Provider>
      );
   },
);
