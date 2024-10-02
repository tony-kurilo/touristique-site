"use client"

import React, { useState } from "react";
import Image from "next/image";
import MapComponent from '../components/MapComponent';

export default function Page() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const images = [
        "/images/hotel-example.jpg",
        "/images/castle.png",
        "/images/elephants.png"
    ];
    const images1 = [
        "/images/hotel-example.jpg",
        "/images/castle.png",
        "/images/elephants.png"
    ];
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <body>
            <header className="w-full bg-neutral-900 object-cover" style={{
                backgroundImage: `url('/images/search-background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 h-[146px] bg-black opacity-30"></div>
                <nav className="relative flex items-center justify-between z-10">
                    <div className="flex items-center m-10 px-6">
                        <a href="/">
                            <Image src="/icons/earth.png" alt="Earth icon" width={66} height={66}/>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a className={"m-4 pb-1 text-xl text-outline"} href={""}>Пункти призначення</a>
                        <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Блог</a>
                        <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Про нас</a>
                        <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Зв'яжіться з нами</a>
                    </div>
                    <div className="flex items-center m-10 pr-10">
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={33}
                               height={33}/>
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Account icon"} width={37}
                               height={37}/>
                    </div>
                </nav>
            </header>
            <main>
                <div
                    className="flex items-center justify-center mx-auto py-4 bg-neutral-800 relative h-[700px] w-[1920px]">
                    <button
                        className="absolute w-14 h-14 left-10 bg-neutral-700 text-white p-4 z-10 rounded-full"
                        onClick={handlePrev}
                    >

                    </button>
                    <div className="relative w-full h-full flex justify-center items-center">
                        <Image
                            src={images[currentImage]}
                            alt="Hotel"
                            width={1920}
                            height={809}
                            className="object-contain max-h-full "
                        />
                    </div>
                    <button
                        className="absolute w-14 h-14 right-14 bg-neutral-700 text-white p-4 z-10 rounded-full"
                        onClick={handleNext}

                    >
                    </button>
                </div>
                <div className={"relative flex left-96 mt-4 text-lg "}>
                    <p className={""} id={"returnText"}>Повернутися</p>
                </div>
                <div className={"relative flex items-center mt-12 text-2xl"}>
                    <h1 className={"relative left-96"}>Hotel Name</h1>
                    <p className={"absolute right-96"}>рейтинг</p>
                </div>
                <div className={"relative flex items-left mt-4 text-2xl"}>
                    <p className={"relative left-96"}>Адреса</p>
                    <p className={"absolute right-96"}>оцінка</p>
                </div>
                <hr className="border-t-1 border-gray-500 mx-80 my-10"/>
                <div>
                    <h1 className={"relative flex justify-center items-center mt-12 text-2xl"}>Загальна інформація</h1>
                    <div className={"flex items-center justify-center"}>
                        <table className="mt-8 w-8/12 relative border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Рік будівництва</th>
                                <th className="border border-gray-300 px-4 py-2">Рік реновації</th>
                                <th className="border border-gray-300 px-4 py-2">Кількість номерів</th>
                                <th className="border border-gray-300 px-4 py-2">Check-in</th>
                                <th className="border border-gray-300 px-4 py-2">Check-out</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-center">1918</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">2014</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">103</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">12:00-14:00</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">14:00-16:00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className="border-t-1 border-gray-500 mx-80 my-12"/>
                <div>
                    <div className={"flex items-center justify-center"}>
                        <h1 className={"relative mr-[700px] text-2xl"}>Номери</h1>
                        <select id={"roomSelect"}>
                            <option value="Standard Room">Standard Room</option>
                            <option value="Superior Room">Superior Room</option>
                            <option value="Junior Suite">Junior Suite</option>
                            <option value="Suite">Suite</option>
                            <option value="Presidential Suite">Presidential Suite</option>
                        </select>
                    </div>
                    <div className={"relative flex justify-center items-center mt-8"}>
                        <div className="relative group max-w-4xl mr-14">
                            <Image src={images1[currentImage]} width={"504"} height={"338"}
                                   className="max-h-[300px] object-cover "
                                   onClick={openModal}></Image>
                            <button
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            > Назад
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                Вперед
                            </button>
                        </div>
                        <div>
                            <p className={"text-lg mb-5"}>площа номеру : 30 кв.м</p>
                            <p className={"text-lg mb-10"}>максимальна кількість гостей у номері : 2</p>
                            <h1 className={"relative flex items-center justify-center text-xl mb-5"}>Опції</h1>
                            <div className={"relative flex "}>
                                <ul className={"list-disc pl-5 text-lg"}>
                                    <li>WiFi</li>
                                    <li>Кондиціонер</li>
                                    <li>Мініхолодильник</li>
                                    <li>Опалення</li>
                                    <li>Телефон</li>
                                </ul>
                                <ul className={"list-disc pl-32 text-lg"}>
                                    <li>Ванна/Душ</li>
                                    <li>Туалет</li>
                                    <li>Тераса/Балкон</li>
                                    <li>Кухня</li>
                                </ul>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                                <div className="relative">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-0 right-0 p-4 text-white"
                                    >
                                        Х
                                    </button>
                                    <Image
                                        src={images1[currentImage]}
                                        width={1000} // Задайте желаемую ширину для большой версии
                                        height={750} // Задайте желаемую высоту для большой версии
                                        className="object-cover" // Используйте object-cover, чтобы сохранить пропорции
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="border-t-1 border-gray-500 mx-80 my-12"/>
                <div>
                    <h1 className={"relative left-96 text-2xl"}>Інфраструктура та послуги</h1>
                    <div className={"relative flex items-center left-96 mt-8"}>
                        <button id={"submitButton"} className={"mr-2"}>Пляж</button>
                        <button id={"submitButton"} className={"mr-2"}>Басейни</button>
                        <button id={"submitButton"} className={"mr-2"}>Розваги та спорт</button>
                        <button id={"submitButton"} className={"mr-2"}>Харчування</button>
                        <button id={"submitButton"} className={"mr-2"}>Послуги отелю</button>
                        <button id={"submitButton"} className={"mr-2"}>Для дітей</button>
                    </div>
                    <div>
                        <div className={"flex items-center justify-center mt-10  space-x-40"}>
                            <p className={""}>тип пляжу : міський</p>
                            <p className={""}>шезлонги : за додаткову плату</p>
                            <p className={""}>вхід у море : піщаний</p>
                        </div>
                        <div className={"flex items-center justify-center mt-5  space-x-40"}>
                            <p className={""}>парасольки : за додаткову плату</p>
                            <p className={""}>Місце розташування</p>
                            <p className={""}>Місце розташування</p>
                        </div>
                    </div>
                </div>
                <hr className="border-t-1 border-gray-500 mx-80 my-12"/>
                <div>
                    <h1 className={"relative left-96 text-2xl"}>Місцерозташування</h1>
                    <MapComponent></MapComponent>
                </div>
            </main>
        </body>
    );
}
