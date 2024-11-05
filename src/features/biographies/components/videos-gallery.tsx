import { twMerge } from "tailwind-merge";
import { DataResultUpload } from "../actions";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface VideosGalleryProps{
    videos: DataResultUpload[],
    className?: string,
    onDeleteVideo: (video: DataResultUpload)=>void
}

const VideosGallery: React.FC<VideosGalleryProps> = ({
    videos,
    className,
    onDeleteVideo
}) => {
    return ( 
        <section className={twMerge("columns-2 w-full gap-3 space-y-3", className)}>
            {videos.map((vid, i)=>(
                <div key={vid.path} className="break-inside-avoid group relative rounded-ms border-dashed border-2 border-gray-dark">
                    <video
                        src={vid.url} 
                        controls
                        className="w-full object-cover cursor-pointer" 
                    />
                    <div className="transition-all h-fit z-0  absolute top-2 right-2 ">
                        <button type="button" onClick={(e)=>onDeleteVideo(vid)} className="text-white bg-red-500 p-1 rounded-ms">
                            <Trash2 size={16}/>
                        </button>
                    </div>
                </div>
            ))}
        </section>
     );
}
 
export default VideosGallery;