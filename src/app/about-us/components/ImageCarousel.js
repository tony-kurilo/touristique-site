"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Loop } from 'swiper';
import { useRef} from 'react';

// Установка модулей Swiper
SwiperCore.use([Autoplay, Loop]);

export default function ImageCarousel() {
    const swiperRef = useRef(null);
    const images = [
        "/images/about-us/award-2022-1.png",
        "/images/about-us/award-2022-2.png",
        "/images/about-us/award-2022-3.png",
        "/images/about-us/award-2022-4.png",
        "/images/about-us/award-2022-5.png",
        "/images/about-us/award-2023-1.png",
        "/images/about-us/award-2023-2.png",
        "/images/about-us/award-2023-3.png",
        "/images/about-us/award-2023-4.png",
        "/images/about-us/award-2023-5.png",
        "/images/about-us/award-2024-1.png",
        "/images/about-us/award-2024-2.png",
        "/images/about-us/award-2024-3.png",
    ];


    return (
        <div className="carousel-container">
            <Swiper
                ref={swiperRef}
                spaceBetween={0}
                slidesPerView={6.5} // Показывать 6.5 изображений
                loop={true} // Бесконечная прокрутка
                autoplay={{
                    delay: 3000, // Задержка между прокрутками (3 секунды)
                    disableOnInteraction: false // Прокрутка не останавливается при взаимодействии
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-container relative">
                            <div className={"mt-10 mb-10 mx-2"}>
                                <img src={image} alt={`Slide ${index}`} className="carousel-image"/>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
