import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface PhotosGalleryProps{
    images: string[],
    className?: string,
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({
    images,
    className,
}) => {
    return ( 
        <section className={twMerge("columns-2 w-full gap-3 space-y-3", className)}>
            {images.map((img, i)=>(
                <div key={"image-bio-"+i} className="break-inside-avoid group relative rounded-ms border-dashed border-2 border-gray-dark">
                    <Image
                        src={img} 
                        alt={img} 
                        width={600}
                        height={400}
                        className="w-full rounded-ms shadow-xl object-cover cursor-pointer" 
                    />
                </div>
            ))}
        </section>
     );
}
 
export default PhotosGallery;