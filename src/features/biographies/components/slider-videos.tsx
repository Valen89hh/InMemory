import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { DataResultUpload } from '../actions';

interface SliderVideosProps {
  videos: DataResultUpload[];
  className?: string;
  onDeleteVideo: (video: DataResultUpload)=>void
}

const SliderVideos: React.FC<SliderVideosProps> = ({
    videos, 
    className, 
    onDeleteVideo 
}) => {
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
    <div className={twMerge("relative w-full  overflow-hidden", className)}>
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {videos.map((video) => (
          <div key={"slider-"+video.path} className='w-full bg-gray-light flex justify-center items-center relative flex-shrink-0 rounded-ms border-dashed border-2 border-gray-dark'>
            <video 
                src={video.url} 
                className="absolute z-0 inset-0 w-full h-full object-cover blur-md scale-y-80"
                aria-hidden="true" 
                muted 
            />
            <video  
                src={video.url} 
                controls 
                className="w-full h-[30rem] aspect-video z-10 " 
            />
            <div className="transition-all h-fit z-10  absolute top-2 right-2">
                <button type="button" onClick={(e)=>onDeleteVideo(video)} className="text-white bg-red-500 p-1 rounded-ms">
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

export default SliderVideos;
