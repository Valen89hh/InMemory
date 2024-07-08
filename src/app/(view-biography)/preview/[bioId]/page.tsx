"use client"

import BiographyView from "@/components/biography-view"
import { useAuthStore } from "@/lib/storage/auth-storage"

const PreviewBiographyPage = ({params}: {params: {bioId: string}}) => {
    const {user, loading} = useAuthStore()
    //const [loading, setLoading] = useState(true)


    if(loading){
        return <div className="h-screen w-screen flex items-center justify-center">
        Loading...
    </div>
    }


    if(!user) return <div className="h-screen w-screen  flex items-center justify-center">
        Pagina protegida
    </div>
    
    return <BiographyView bioId={params.bioId}/>
}
 
export default PreviewBiographyPage;