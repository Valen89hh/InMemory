"use client"

import Container from "@/components/containers/container";
import SideBarUsers from "@/components/side-bar-users";
import { useAuthStore } from "@/lib/storage/auth-storage";
import { useEffect, useState } from "react";

const LayoutDashboard = ({children}: {children: React.ReactNode}) => {
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
    
    return ( 
        <Container>

            <main className="py-[8rem] flex flex-col md:flex-row gap-4">
                <SideBarUsers user={user}/>
                <div className="w-full">
                    {children}
                </div>
            </main>
        </Container>
     );
}
 
export default LayoutDashboard;