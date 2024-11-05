import ButtonPrimary from "@/components/buttons/button-primary";
import React, { useRef } from "react";
import { useManageFilesUpload } from "../hooks/use-manage-files-upload";
import { CircularProgress } from "@mui/material";
import PhotosGallery from "./photos-gallery";
import VideosGallery from "./videos-gallery";
import { DataResultUpload } from "../actions";
import SliderVideos from "./slider-videos";

interface VideosBiographyProps{
    initialVideos?: DataResultUpload[]
    onChangeVideos: (videos: DataResultUpload[])=>void
}

const VideosBiography: React.FC<VideosBiographyProps> = ({
    initialVideos = [],
    onChangeVideos
}) => {
    const {
        fileInputRef, 
        handleClickFile, 
        handleFileSelected, 
        handleFileDelete,
        loadingDelete,
        loadingUpload,
        filesUpload
    } = useManageFilesUpload(initialVideos, "video", onChangeVideos)


    return ( 
        <div className="space-y-4 flex flex-col  h-full relative">
            {loadingUpload && (
                <div className="bg-black z-20 bg-opacity-40 absolute inset-0 flex flex-col justify-center items-center gap-2 text-white">
                    <CircularProgress color="inherit"/>
                    <h3>Subiendo video...</h3>
                </div>
            )}
            {loadingDelete && (
                <div className="bg-black z-20 bg-opacity-40 absolute inset-0 flex flex-col justify-center items-center gap-2 text-white">
                    <CircularProgress color="inherit"/>
                    <h3>Eliminando video...</h3>
                </div>
            )}
            {filesUpload.length > 0 ? (
                <>
                    <VideosGallery  videos={filesUpload} onDeleteVideo={vid=>handleFileDelete(vid)} className="hidden md:block"/>
                    <SliderVideos  videos={filesUpload} onDeleteVideo={vid=>handleFileDelete(vid)} className="block md:hidden"/>
                </>
                
            ) : (
                <div className="flex-1 min-h-60 flex justify-center items-center">
                    <span>Sin Videos</span>
                </div>
            )}
            
            <input 
                ref={fileInputRef} 
                className="hidden" 
                type="file" 
                accept="video/*"
                onChange={handleFileSelected}
            />
            <ButtonPrimary onClick={handleClickFile} type="button" className="rounded-md w-full">
                + Añadir Video
            </ButtonPrimary>
                
        </div>
     );
}
 
export default VideosBiography;