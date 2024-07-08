import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '../icons/close';

interface VideoGalleryProps {
  videos: string[];
  onSelectVideo: (index: number) => void;
  className?: string,
  onDeleteVideo?: (index: number)=>void
  editMode?: boolean
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, onSelectVideo, className, editMode = false, onDeleteVideo }) => {
  return (
    <section className={twMerge("columns-3 lg:columns-3 w-full gap-3 space-y-3", className)}>
        {videos.map((vid, i)=>(
            <div key={i+vid} className="break-inside-avoid relative bg-slate-400">
                <video controls src={vid}className="w-full object-cover cursor-pointer" onClick={()=>onSelectVideo(i)} />
                {editMode && (
                  <Close onClick={()=>{
                    if(onDeleteVideo) onDeleteVideo(i)}
                    } className='absolute top-2 hover:shadow-lg cursor-pointer right-2 ' width={16} height={16} />
                )}
            </div>
        ))}
    </section>
  );
};

export default VideoGallery;
