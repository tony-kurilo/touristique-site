"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const quotes = [
    {
        title: "Неймовірна подорож до Барселони!",
        text: "“ Моя подорож до Барселони була просто фантастичною! Архітектура Гауді вразила, а смачні тапаси стали справжнім відкриттям. Рекомендую відвідати парк Гуель і Ла Саграду Фамілію. ”",
        author: "— Олена Коваленко",
        rating: "5"
    },
    {
        title: "Чарівні пейзажі Ісландії",
        text: "“ Відвідування Ісландії стало моїм найкращим досвідом! Вражаючі водоспади, гейзери та льодовики — це щось незабутнє. Я в захваті від краси природи! ”",
        author: "— Сергій Мельник",
        rating: "5"
    },
    {
        title: "Романтична відпустка в Парижі",
        text: "“ Париж виявився справжнім раєм для закоханих. Прогулянки на набережній Сени, вечері в затишних ресторанах і, звичайно, Ейфелева вежа. Це місто наповнене романтикою! ”",
        author: "— Катерина Левченко",
        rating: "5"
    },
    {
        title: "Авантюра в Коста-Риці",
        text: "“  Поїздка в Коста-Рику була справжньою авантюрою! Ми каталися на зиплайні через тропічний ліс, спостерігали за дельфінами і насолоджувалися пляжами. Рекомендую для любителів природи! ”",
        author: "— Наталія Смирнова",
        rating: "5"
    },
    {
        title: " Враження від подорожі в Токіо",
        text: "“ Токіо — місто, де зустрічається традиція і сучасність. Вражаюча культура, смачна їжа і привітні люди. Обов'язково відвідайте храм Сэнсодзі! Я був дуже вражений ”",
        author: "— Андрій Петров",
        rating: "4"
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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="text-gold">★</span>); // Полные звезды
            } else {
                stars.push(<span key={i} className="text-gray-400">☆</span>); // Пустые звезды
            }
        }
        return stars;
    };

    return (
        <div
            className={"mt-60 mb-1 relative"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article className={"flex items-center justify-center h-full text-4xl mb-10 geologica-300"}>
                Відгуки Клієнтів
            </article>
            <div className="relative">
                <Image src={"/images/mountains.png"} alt={"reviews Image Background"} width={"1922"} height={"582"} className={"object-cover"} />
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <blockquote
                className={`relative flex flex-col items-center justify-center h-full -top-96 text-white text-2xl text-center transition-opacity duration-500 ${isExiting ? 'quote-exit' : 'quote-enter quote-enter-active'}`}>
                <p className={"mb-2 geologica-300"}>
                    {quotes[currentQuoteIndex].title}
                </p>
                <p className="max-w-[900px] mx-auto geologica-200">
                    {quotes[currentQuoteIndex].text}
                </p>
                <footer className="mt-2 text-xl text-gray-300 geologica-200">{quotes[currentQuoteIndex].author}</footer>
                <div className="mt-2">
                    {renderStars(parseInt(quotes[currentQuoteIndex].rating))} {/* Передаем рейтинг как число */}
                </div>
            </blockquote>
        </div>
    );
}
