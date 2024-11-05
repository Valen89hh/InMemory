"use client"

import useQuery from "@/hooks/use-query";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ButtonPrimary from "../buttons/button-primary";

const Search = ({className, onSearch}: {className?:string, onSearch?: ()=>void}) => {
    const {setQuery} = useQuery()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState("")
    const [isFocus, setIsFocus] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setQuery("search", e.target.value)
    }

    useEffect(()=>{
        const searchParam = searchParams.get("search") ?? ""
        setSearch(searchParam)
    }, [searchParams])

    return ( 
        <div className={twMerge(`w-full border-2 border-solid transition-all ${isFocus ? "border-primary" : "border-transparent"} lg:w-1/2 bg-background rounded-md px-3 py-2 flex justify-between items-center gap-2`, className)}>
            <input 
                value={search} 
                onChange={handleChange} 
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
                className="outline-none w-full bg-transparent text-gray-dark" 
                placeholder="Buscar bigrofia" type="text" 
            />
            {search.length > 0 ? (
                <ButtonPrimary className="py-1" onClick={()=>{
                    if(onSearch) onSearch()
                }}>
                    Buscar
                </ButtonPrimary>
            ): (
                <SearchIcon className="cursor-pointer hover:shadow-md" width={18} height={18}/>
            )}
        </div>
     );
}
 
export default Search;