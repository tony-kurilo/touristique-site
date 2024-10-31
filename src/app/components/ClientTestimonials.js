"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const quotes = [
    {
        text: "“БАББАБАБАБАБ БЕББЕБЕБЕБЕБЕ фывфывфывфывфывфывфывфывфыв фывфыфывфыфывфывффывфыфывфыв ыфвфывыыфвфывфыфывыфв”",
        author: "— Имя Фамилия 1"
    },
    {
        text: "“Цитата номер два, которая тоже будет длинной и перенесётся на новую строку, если нужно.”",
        author: "— Имя Фамилия 2"
    },
    {
        text: "“Цитата номер три, которая также будет отображаться красиво.”",
        author: "— Имя Фамилия 3"
    }
];

export default function ClientTestimonials() {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalDuration = 5000; // Время пролистывания в миллисекундах
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                nextQuote();
            }
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [isHovered, currentQuoteIndex]);

    const nextQuote = () => {
        setIsExiting(true);
        setTimeout(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
            setIsExiting(false);
        }, 500); // Время анимации
    };

    const prevQuote = () => {
        setIsExiting(true);
        setTimeout(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
            setIsExiting(false);
        }, 500); // Время анимации
    };

    return (
        <div
            className={"mt-60 mb-1 relative"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article className={"flex items-center justify-center h-full text-4xl mb-10"}>
                Що кажуть наші Клієнти
            </article>
            <div className="relative">
                <Image src={"/images/mountains.png"} width={"1922"} height={"582"} className={"object-cover"} />
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <blockquote className={`relative flex flex-col items-center justify-center h-full -top-96 text-white text-2xl text-center transition-opacity duration-500 ${isExiting ? 'quote-exit' : 'quote-enter quote-enter-active'}`}>
                <p className="max-w-xl mx-auto">
                    {quotes[currentQuoteIndex].text}
                </p>
                <footer className="mt-2 text-sm text-gray-300">{quotes[currentQuoteIndex].author}</footer>
            </blockquote>

        </div>
    );
}
