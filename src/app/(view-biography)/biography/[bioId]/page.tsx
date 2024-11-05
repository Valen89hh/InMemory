"use client"

import ViewBiography from "@/features/view-biography/components/view-biography"

const BiographyViewPage = ({params}: {params: {bioId: string}}) => {
    
    return <ViewBiography bioId={params.bioId} />
}
 
export default BiographyViewPage;