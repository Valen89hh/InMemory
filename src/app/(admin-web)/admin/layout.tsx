"use client"

import SideBarUsers from "@/components/side-bar-users";
import { useAuthStore } from "@/lib/storage/auth-storage";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

const LayoutAdmin = ({children}: {children: React.ReactNode}) => {
    const {user, loading} = useAuthStore()
    //const [loading, setLoading] = useState(true)


   

    if(loading){
        return <div className="h-[60vh] flex items-center justify-center">
        Loading...
    </div>
    }


    if(!user) return <div className="h-[60vh] flex items-center justify-center">
        Pagina protegida
    </div>

    if(user.role !== "admin") return <div className="h-[60vh] flex items-center justify-center">
    Usuario no autorizado
    </div>
    
    return ( 
        <Container fixed>
            {children}
        </Container>
     );
}
 
export default LayoutAdmin;