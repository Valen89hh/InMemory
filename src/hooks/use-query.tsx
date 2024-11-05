"use client";

import { useRouter, useSearchParams } from "next/navigation";

const useQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Función para actualizar la query sin sobrescribir otras
  const setQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Añadir o actualizar la query
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Empujar la nueva URL con las queries actualizadas
    router.push(`?${params.toString()}`);
  };

  const getQuery = (key:string)=>{
    return searchParams.get(key)
  }

  return {
    setQuery,
    getQuery
};
};

export default useQuery;
