import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { DataResultUpload } from '../actions';

interface SliderPhotosProps {
  images: DataResultUpload[];
  className?: string
  onDeleteImage: (img: DataResultUpload)=>void
}

const SliderPhotos: React.FC<SliderPhotosProps> = ({ 
    images, 
    className, 
    onDeleteImage 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Mueve el carrusel a la última imagen añadida cuando el array de imágenes cambie
    if (images.length > 0) {
      setCurrentIndex(images.length - 1);
    }
  }, [images]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={twMerge("relative w-full h-[30rem] overflow-hidden", className)}>
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img) => (
          <div key={"slide-"+img.path} className='relative w-full h-[30rem] flex-shrink-0 rounded-ms border-dashed border-2 border-gray-dark'>
            <Image
                src={img.url} 
                alt={img.path} 
                width={600}
                height={400}
                className="w-full h-full object-coverr" 
            />
            <div className="transition-all h-fit z-0  absolute top-2 right-2">
                <button type="button" onClick={(e)=>onDeleteImage(img)} className="text-white bg-red-500 p-1 rounded-ms">
                    <Trash2 size={16}/>
                </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white w-[2rem] h-[2rem] rounded-full">
        ❮
      </button>
      <button type="button" onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white w-[2rem] h-[2rem] rounded-full">
        ❯
      </button>
    </div>
  );
};

export default SliderPhotos;
