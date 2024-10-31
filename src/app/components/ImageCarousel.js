"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Loop } from 'swiper/core';
import { useRef, useEffect } from 'react';

// Установка модулей Swiper
SwiperCore.use([Autoplay, Loop]);

export default function ImageCarousel() {
    const swiperRef = useRef(null);
    const images = [
        "/images/microchel1.png",
        "/images/house1.png",
        "/images/microchel2.png",
        "/images/house2.png",
        "/images/microchel3.png",
        "/images/house3.png",
        "/images/microchel4.png",
        "/images/house4.png",
    ];
    const texts = [
        "Унікальний Мадагаскар лемурів",
        "Давня Греція",
        "Безмежні простори Африки сурикатів",
        "Велична сіднейська опера Австралії",
        "Південна Америка",
        "Неперевершена архітектура Італії",
        "Дика Африка",
        "Мальовнича Ірландія",
    ];

    const handleWheel = (event) => {
        event.preventDefault(); // предотвращает прокрутку страницы
        if (swiperRef.current) {
            if (event.deltaY > 0) {
                swiperRef.current.swiper.slideNext(); // прокрутка вправо
            } else {
                swiperRef.current.swiper.slidePrev(); // прокрутка влево
            }
        }
    };

    const lockScroll = () => {
        // Вычисляем ширину скроллбара
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden'; // Блокируем глобальный скролл
        document.body.style.paddingRight = `${scrollbarWidth}px`; // Добавляем padding для компенсации ширины скроллбара
    };

    const unlockScroll = () => {
        document.body.style.overflow = ''; // Разблокируем глобальный скролл
        document.body.style.paddingRight = ''; // Убираем добавленный padding
    };

    useEffect(() => {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', lockScroll);
            carouselContainer.addEventListener('mouseleave', unlockScroll);
        }
        return () => {
            if (carouselContainer) {
                carouselContainer.removeEventListener('mouseenter', lockScroll);
                carouselContainer.removeEventListener('mouseleave', unlockScroll);
            }
        };
    }, []);

    return (
        <div className="carousel-container" onWheel={handleWheel}>
            <Swiper
                ref={swiperRef}
                spaceBetween={0}
                slidesPerView={3.5} // Показывать 3.5 изображения
                loop={true} // Бесконечная прокрутка
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-container relative">
                            <img src={image} alt={`Slide ${index}`} className="carousel-image"/>
                            <div className="absolute bottom-4 left-4 text-white rounded z-10 p-3 text-xl geologica-300">
                                {texts[index]}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
