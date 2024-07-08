import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '../icons/close';

interface CarouselVideoProps {
  videos: string[];
  className?: string;
  onDeleteVideo?: (index: number)=>void
  editMode?: boolean
}

const CarouselVideo: React.FC<CarouselVideoProps> = ({ videos, className, onDeleteVideo, editMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Mueve el carrusel al último video añadido cuando el array de videos cambie
    if (videos.length > 0) {
      setCurrentIndex(videos.length - 1);
    }
  }, [videos]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={twMerge("relative w-full xs:h-[40rem] md:h-[30rem]  overflow-hidden", className)}>
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {videos.map((video, index) => (
          <div key={index} className='w-full relative xs:h-[40rem] md:h-[30rem] flex-shrink-0'>
            <video  src={video} controls className="w-full h-full object-cover " />
            {editMode && (
              <Close width={18} height={18} className='cursor-pointer absolute top-4 right-4' onClick={()=>{
                if(onDeleteVideo) onDeleteVideo(index)
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

export default CarouselVideo;
