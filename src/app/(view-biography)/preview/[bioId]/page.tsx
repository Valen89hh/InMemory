import PreviewBiography from "@/features/view-biography/components/preview-biography"

const PreviewBiographyPage = async({params}: {params: {bioId: string}}) => {
    
    return <PreviewBiography bioId={params.bioId}/>
}
 
export default PreviewBiographyPage;