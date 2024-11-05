import React, { useRef } from "react";
import PhotosGallery from "./photos-gallery";
import SliderPhotos from "./slider-photos";

interface PhotosBiographyProps{
    initialPhotos?: string[]
}


const PhotosBiography: React.FC<PhotosBiographyProps> = ({
    initialPhotos = [],
}) => {


    return ( 
        <div className="space-y-4 flex flex-col  h-full relative">
            {initialPhotos.length > 0 ? (
                <>
                    <PhotosGallery images={initialPhotos} className="hidden md:block"/>
                    <SliderPhotos images={initialPhotos}  className="block md:hidden"/>
                </>
            ) : (
                <div className="flex-1 min-h-60 flex justify-center items-center">
                    <span>Sin Fotos</span>
                </div>
            )}  
        </div>
     );
}
 
export default PhotosBiography;