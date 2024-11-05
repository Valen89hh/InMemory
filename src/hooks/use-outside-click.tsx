import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {

    const ref = useRef<T>(null); // Hacemos que el ref sea genérico para cualquier tipo de HTMLElement
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  
    return ref;
};
