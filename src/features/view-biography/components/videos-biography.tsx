import ButtonPrimary from "@/components/buttons/button-primary";
import React, { useRef } from "react";
import { CircularProgress } from "@mui/material";
import VideosGallery from "./video-gallery";
import SliderVideos from "./slider-videos";

interface VideosBiographyProps{
    initialVideos?: string[]
}

const VideosBiography: React.FC<VideosBiographyProps> = ({
    initialVideos = [],
}) => {

    return ( 
        <div className="space-y-4 flex flex-col  h-full relative">
            {initialVideos.length > 0 ? (
                <>
                    <VideosGallery  videos={initialVideos} className="hidden md:block"/>
                    <SliderVideos videos={initialVideos} className="block md:hidden"/>
                </>
                
            ) : (
                <div className="flex-1 min-h-60 flex justify-center items-center">
                    <span>Sin Videos</span>
                </div>
            )}    
        </div>
     );
}
 
export default VideosBiography;