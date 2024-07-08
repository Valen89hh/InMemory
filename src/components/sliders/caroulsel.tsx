"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function SampleNextArrow(props: any) {
  const { className, width, height, visible, onClick } = props;
  return (
      <svg className={className + " rounded-full cursor-pointer"} style={{ display: visible, width, height, padding: "4px", background: "#003F5F"}}
          onClick={onClick}
          width="36" height="106" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5312 19.3229L21.8542 13L15.5312 6.67704" stroke="white" />
          <path d="M4.14584 13L21.6771 13" stroke="white" />
      </svg>

  );
}

function SamplePrevArrow(props: any) {
  const { className, width, height, visible, onClick } = props;
  return (
      <svg className={className + " rounded-full cursor-pointer"} style={{ display: visible, width, height, padding: "4px", background: "#003F5F"}}
          onClick={onClick}
          width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4688 6.67712L4.14587 13L10.4688 19.323" stroke="white" />
          <path d="M21.8541 13H4.32288" stroke="white" />
      </svg>
  );
}

export { SampleNextArrow, SamplePrevArrow }

const Carousel = ({
  children
}: {children: React.ReactNode}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <SampleNextArrow width="1.8rem" height="1.8rem" />,
    prevArrow: <SamplePrevArrow width="1.8rem" height="1.8rem" />
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;