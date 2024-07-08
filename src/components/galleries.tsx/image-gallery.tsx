import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '../icons/close';

interface ImageGalleryProps {
  images: string[];
  onSelectImage: (index: number) => void;
  onDeleteImage?: (index: number) => void;
  className?: string
  editMode?: boolean
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, editMode = false, onDeleteImage, onSelectImage, className }) => {
  return (
    <section className={twMerge("columns-3 lg:columns-3 w-full gap-3 space-y-3", className)}>
        {images.map((img, i)=>(
            <div key={i+img} className="break-inside-avoid relative bg-slate-400">
                <img src={img} alt="" className="w-full object-cover cursor-pointer" onClick={()=>onSelectImage(i)} />
                {editMode && (
                  <Close onClick={()=>{
                    if(onDeleteImage) onDeleteImage(i)}
                    } className='absolute top-2 hover:shadow-lg cursor-pointer right-2 ' width={16} height={16} />
                )}
            </div>
        ))}
    </section>
  );
};

export default ImageGallery;
