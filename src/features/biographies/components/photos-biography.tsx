import ButtonPrimary from "@/components/buttons/button-primary";
import React, { useRef } from "react";
import { useManageFilesUpload } from "../hooks/use-manage-files-upload";
import { CircularProgress } from "@mui/material";
import PhotosGallery from "./photos-gallery";
import { DataResultUpload } from "../actions";
import SliderPhotos from "./slider-photos";

interface PhotosBiographyProps{
    initialPhotos?: DataResultUpload[]
    onChangePhotos: (photos: DataResultUpload[])=>void
}


const PhotosBiography: React.FC<PhotosBiographyProps> = ({
    initialPhotos = [],
    onChangePhotos
}) => {
    const {
        fileInputRef, 
        handleClickFile, 
        handleFileSelected, 
        handleFileDelete,
        loadingDelete,
        loadingUpload,
        filesUpload
    } = useManageFilesUpload(initialPhotos, "image", onChangePhotos)


    return ( 
        <div className="space-y-4 flex flex-col  h-full relative">
            {loadingUpload && (
                <div className="bg-black z-20 bg-opacity-40 absolute inset-0 flex-col flex justify-center items-center gap-2 text-white">
                    <CircularProgress color="inherit"/>
                    <h3>Subiendo imagen...</h3>
                </div>
            )}
            {loadingDelete && (
                <div className="bg-black z-20 bg-opacity-40 absolute inset-0 flex-col flex justify-center items-center gap-2 text-white">
                    <CircularProgress color="inherit"/>
                    <h3>Eliminando imagen...</h3>
                </div>
            )}
            {filesUpload.length > 0 ? (
                <>
                    <PhotosGallery images={filesUpload} onDeleteImage={img=>handleFileDelete(img)} className="hidden md:block"/>
                    <SliderPhotos images={filesUpload} onDeleteImage={img=>handleFileDelete(img)}  className="block md:hidden"/>
                </>
            ) : (
                <div className="flex-1 min-h-60 flex justify-center items-center">
                    <span>Sin Fotos</span>
                </div>
            )}
            
            <input 
                ref={fileInputRef} 
                className="hidden" 
                type="file" 
                accept="image/*"
                onChange={handleFileSelected}
            />
            <ButtonPrimary onClick={handleClickFile} type="button" className="rounded-md w-full">
                + Añadir foto
            </ButtonPrimary>
                
        </div>
     );
}
 
export default PhotosBiography;