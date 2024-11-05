import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface SliderPhotosProps {
  images: string[];
  className?: string
}

const SliderPhotos: React.FC<SliderPhotosProps> = ({ 
    images, 
    className, 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={twMerge("relative w-full h-[30rem] overflow-hidden", className)}>
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, i) => (
          <div key={"slide-image-"+i} className='relative w-full h-[30rem] flex-shrink-0 rounded-ms border-dashed border-2 border-gray-dark'>
            <Image
                src={img} 
                alt={img} 
                width={600}
                height={400}
                className="w-full h-full object-coverr" 
            />
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
