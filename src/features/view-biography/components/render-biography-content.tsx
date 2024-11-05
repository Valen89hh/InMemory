import "@/styles/biography-styles.scss"

const RenderBiographyContent = ({htmlContent}: {htmlContent: string}) => {
    return ( 
        <div className="biography" dangerouslySetInnerHTML={{__html: htmlContent}}/>
     );
}
 
export default RenderBiographyContent;