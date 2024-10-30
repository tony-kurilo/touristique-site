"use client"

import {useEffect, useRef, useState} from 'react';

import Image from 'next/image';
import VideoBackground from './components/VideoBackground';
import ImageCarousel from "./components/ImageCarousel";
import ClientTestimonials from "@/app/components/ClientTestimonials";
import Footer from "@/app/components/Footer";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true); // Показать текст
                    observer.unobserve(entry.target); // Отменить наблюдение, если элемент виден
                }
            },
            {
                threshold: 0.1, // Процент видимости, который будет отслеживаться
            }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, [isVisible]); // Добавляем isVisible в зависимости
    return (
    <body>
        <VideoBackground/>
        <header className="absolute top-0 left-0 w-full bg-opacity-10 z-10">
            <nav className="flex items-center justify-between">
                <div className="flex items-center m-10 px-6">
                    <Image className="" src={"/icons/promo1.png"} alt={"Earth icon"} width={"150"} height={"150"}></Image>
                </div>
                <div className="flex items-center">
                    <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/search"}>Пункти призначення</a>
                    <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/blog"}>Блог</a>
                    <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/about-us"}>Про нас</a>
                    <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/contact-us"}>Зв&apos;яжіться з нами</a>
                </div>
                <div className="flex items-center m-10 pr-10">
                    <a href="/basket">
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={"33"}
                               height={"33"}></Image>
                    </a>
                    <a href="/my-profile">
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Whishlist icon"} width={"37"}
                               height={"37"}></Image>
                    </a>
                </div>
            </nav>
        </header>
        <main>
            <div className="flex items-center">
                <Image className={`relative top-32 left-80 z-10 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} src={"/images/plains.png"} alt={"plains"}
                       width={"678"} height={"675"}></Image>
                <article className={"relative left-96 w-96"}>
                    <section className={`dela-gothic-one-regular text-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Чарівні спогади, <br></br> Індивідуальний досвід</section>
                    <br></br>
                    <section className={`mt-3 geologica-200 text-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Щойно вирушивши у подорож, вона ніколи не закінчується.
                        Touristique відкриють вам світ чудес і створять чарівні спогади, які залишаться з вами надовго після
                        повернення..
                    </section>

                    <section ref={textRef} className={`mt-3 geologica-200 text-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Відхиліться від типових туристичних напрямків
                        на користь унікальних, автентичних вражень. Враження, створені в найнадихаючих місцях, які
                        стануть лише вашими. Подорожі, що створюють незабутні моменти, а індивідуальні маршрути
                        Touristique зроблять це можливим. Чудеса світу в межах досяжності.
                    </section>
                </article>
                <Image className={`relative -top-100 right-80 z-0 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} src={"/images/elephants.png"} width={"696"}
                       height={"403"}></Image>
            </div>
            <div className={"bg-gray-100 mt-36"}>
                <article className={"ml-96 pb-72 pt-80 flex items-center"}>
                    <section className={"pl-2 text-3xl dela-gothic-one-regular"}>Індивідуальні подорожі</section>
                    <br></br>
                    <section className={"pl-16 w-100"}>
                        <section className={"text-xl geologica-200"}>
                            Touristique розробляє маршрути для наших клієнтів, які інші просто не можуть запропонувати,
                            чи то навколо теми, чи то в рамках приватного досвіду. Наша команда досвідчених
                            консультантів уважно слухає, розуміє та створює подорож, адаптовану спеціально для вас.
                            Ми віримо, що подорож повинна не лише збагачувати ваше сприйняття, розуміння та оцінку світу,
                            а й дозволяти вам підтримувати місцеві спільноти, які ви відвідуєте. Ми даємо вам можливість
                            досліджувати з метою, ентузіазмом і новим розумінням мистецтва подорожей. Відчуйте різноманітні
                            культури; пориньте в автентичні враження; заберіть з собою моменти та відновіть радісний погляд на життя.
                        </section>
                        <section className={"mt-5 text-2xl underline geologica-200 "}>
                            <a href={"/search"}>Наші путівки</a>
                        </section>
                    </section>
                </article>
            </div>
            <div className={"pl-96 relative -top-48"}>
                <ImageCarousel/>
            </div>
            <div>
                <article className={"text-3xl mb-10 relative left-44 geologica-300"}>Останні новини</article>
                <div className={"grid-container px-40 "}>
                    <div
                        className={"news-item"}> {/* Задайте фиксированную ширину */}
                        <Image src={"/images/europe30.png"} width={"507"} height={"338"}/>
                        <div className={"flex justify-between geologica-300"}>
                            <p className={"mt-4"}>Акція</p>
                            <p className={"mt-4"}>29.10.2024</p>
                        </div>
                        <p className={"geologica-300 text-lg"}>
                            Знижка до 30% на тури до Європи: встигніть забронювати відпустку мрії у Парижі,
                            Римі та Барселоні!
                        </p>
                    </div>
                    <div
                        className={"news-item"}> {/* Задайте фиксированную ширину */}
                        <Image src={"/images/maya.png"} width={"507"} height={"338"}/>
                        <div className={"flex justify-between geologica-300"}>
                            <p className={"mt-4"}>Стаття</p>
                            <p className={"mt-4"}>25.10.2024</p>
                        </div>
                        <p className={"geologica-300 text-lg"}>
                            Загадки цивілізацій: чому вивчення культури народів
                            Південної Америки, таких як майя та ацтеки, захоплює уяву?
                        </p>
                    </div>
                    <div
                        className={"news-item"}> {/* Задайте фиксированную ширину */}
                        <Image src={"/images/hiking.png"} width={"507"} height={"338"}/>
                        <div className={"flex justify-between geologica-300"}>
                            <p className={"mt-4"}>Стаття</p>
                            <p className={"mt-4"}>23.10.2024</p>
                        </div>
                        <p className={"geologica-300 text-lg"}>
                            10 важливих порад для початківців хайкерів: на що звернути увагу перед виходом на природу
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <blockquote>
                    <ClientTestimonials/>
                </blockquote>
            </div>
        </main>
        <Footer></Footer>
    </body>
    );
}
