import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number) {
   const [deBounceValue, setDeounceValue] = useState(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDeounceValue(value);
      }, delay);

      return () => clearTimeout(handler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value]);

   return deBounceValue;
}

export { useDebounce };
