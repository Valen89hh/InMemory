"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "./caroulsel";
import { useRef, useState } from "react";


interface TabSliderProps{
    children: React.ReactNode,
    tabs: string[]
}

const TabSlider: React.FC<TabSliderProps> = ({
    children,
    tabs
}) => {
    const [slideIndex, setSlideIndex] = useState(0);
    let sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow visible="none" width="1.8rem" height="1.8rem" />,
        prevArrow: <SamplePrevArrow visible="none" width="1.8rem" height="1.8rem" />,
        beforeChange: (current: number, next: number) => setSlideIndex(next)
      }
    
      return (
        <div className="">
            <div className="flex">
                {tabs.map((tab, i)=>(
                    <button type="button" onClick={()=>sliderRef.current?.slickGoTo(i)} key={tab+i} className={`${slideIndex === i ? "bg-primary text-white" : "bg-gray-light text-primary"} w-full   p-2  uppercase`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div style={{width: "100%"}} className="slider-container w-fit overflow-hidden py-2 mt-4 border-t-2 border-[#1515151f] border-solid">
                <Slider ref={sliderRef}
                    {...settings}>
                    {children}
                </Slider>
            </div>
        </div>
      );
}
 
export default TabSlider;