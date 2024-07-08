"use client"

import BiographyView from "@/components/biography-view"
import { Biography } from "@/lib/models/biography-model"
import { useAuthStore } from "@/lib/storage/auth-storage"
import { useEffect, useState } from "react"

const BiographyViewPage = ({params}: {params: {bioId: string}}) => {
    
    return <BiographyView bioId={params.bioId} protectedPay/>
}
 
export default BiographyViewPage;