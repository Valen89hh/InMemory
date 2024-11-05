import { twMerge } from "tailwind-merge";

interface VideosGalleryProps{
    videos: string[],
    className?: string,
}

const VideosGallery: React.FC<VideosGalleryProps> = ({
    videos,
    className,
}) => {
    return ( 
        <section className={twMerge("columns-2 w-full gap-3 space-y-3", className)}>
            {videos.map((vid, i)=>(
                <div key={"image-bio-"+i} className="break-inside-avoid group relative rounded-ms border-dashed border-2 border-gray-dark">
                    <video
                        src={vid} 
                        controls
                        className="w-full object-cover cursor-pointer" 
                    />
                </div>
            ))}
        </section>
     );
}
 
export default VideosGallery;