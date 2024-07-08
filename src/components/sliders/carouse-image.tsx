import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '../icons/close';

interface CarouselImageProps {
  images: string[];
  className?: string
  editMode?: boolean
  onDeleteImage?: (index: number)=>void
}

const CarouselImage: React.FC<CarouselImageProps> = ({ images, className, editMode=false, onDeleteImage }) => {
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
        {images.map((image, index) => (
          <div key={index} className='relative w-full h-[30rem] flex-shrink-0'>
            <img  src={image} alt={`Slide ${index}`} className="w-full h-full object-cover " />
            {editMode && (
              <Close width={18} height={18} className='cursor-pointer absolute top-4 right-4' onClick={()=>{
                if(onDeleteImage) onDeleteImage(index)
              }}/>
            )}
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

export default CarouselImage;
