import { twMerge } from "tailwind-merge";
import { DataResultUpload } from "../actions";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface PhotosGalleryProps{
    images: DataResultUpload[],
    className?: string,
    onDeleteImage: (image: DataResultUpload)=>void
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({
    images,
    className,
    onDeleteImage
}) => {
    return ( 
        <section className={twMerge("columns-2 w-full gap-3 space-y-3", className)}>
            {images.map((img, i)=>(
                <div key={img.path} className="break-inside-avoid group relative rounded-ms border-dashed border-2 border-gray-dark">
                    <Image
                        src={img.url} 
                        alt={img.path} 
                        width={600}
                        height={400}
                        className="w-full object-cover cursor-pointer" 
                    />
                    <div className="transition-all h-fit z-0  absolute top-2 right-2">
                        <button type="button" onClick={(e)=>onDeleteImage(img)} className="text-white bg-red-500 p-1 rounded-ms">
                            <Trash2 size={16}/>
                        </button>
                    </div>
                </div>
            ))}
        </section>
     );
}
 
export default PhotosGallery;