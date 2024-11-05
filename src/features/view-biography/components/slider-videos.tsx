import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface SliderVideosProps {
  videos: string[];
  className?: string;
}

const SliderVideos: React.FC<SliderVideosProps> = ({
    videos, 
    className, 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={twMerge("relative w-full  overflow-hidden", className)}>
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {videos.map((video, i) => (
          <div key={"slider-video-"+i} className='w-full bg-gray-light flex justify-center items-center relative flex-shrink-0 rounded-ms'>
            <video 
                src={video} 
                className="absolute z-0 inset-0 w-full h-full object-cover blur-md scale-y-80"
                aria-hidden="true" 
                muted 
            />
            <video  
                src={video} 
                controls 
                className="w-full h-[30rem] aspect-video z-10 " 
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

export default SliderVideos;
