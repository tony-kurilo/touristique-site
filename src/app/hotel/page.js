"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MapComponent from '../components/MapComponent';

export default function Page() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [roomData, setRoomData] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);

    const [selectedButton, setSelectedButton] = useState('Пляж'); // Выбранный элемент инфраструктуры
    const [content, setContent] = useState(null); // Состояние для данных
    const [hotel, setHotel] = useState(null); // Для хранения конкретного отеля

    const images = [
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

    useEffect(() => {
        fetch('/database/roomTypes.json')
        .then(res => res.json())
            .then(data => {
                setRoomData(data.roomData);
                setSelectedRoomType(data.roomData[0]);
            })
            .catch(error => console.error("Error fetching room data:", error));
    }, []);
    const handleChange = (event) => {
        const value = event.target.value;
        const selected = roomData.find(room => room.value === value);
        setSelectedRoomType(selected);
    }

    // Загрузка данных из JSON-файла
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/database/hotels1.json'); // Путь к вашему JSON-файлу
            const data = await response.json();
            setContent(data);
            setHotel(data.hotels[0]); // Устанавливаем первый отель как текущий (можно изменить на выбор отеля)
        };
        fetchData();
    }, []);
    // Функция для обработки нажатий на кнопки инфраструктуры
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };
    if (!hotel) {
        return <p></p>; // Пока данные загружаются
    }

    const infrastructure = hotel.infrastructure;

    const renderColumns = (entries) => {
        // Разделяем ключи на 2 части
        const half = Math.ceil(entries.length / 2);
        const firstHalf = entries.slice(0, half);
        const secondHalf = entries.slice(half);

        return (
            <div className="grid grid-cols-2 gap-4"> {/* Используем Grid для 2 колонок */}
                <div>
                    {firstHalf.map(([key, value]) => (
                        <p key={key} className="text-lg mb-4">
                            {key}: {value}
                        </p>
                    ))}
                </div>
                <div>
                    {secondHalf.map(([key, value]) => (
                        <p key={key} className="text-lg mb-4">
                            {key}: {value}
                        </p>
                    ))}
                </div>
            </div>
        );
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
                <div className={"relative flex left-96 mt-4 text-lg "}>
                    <p className={""} id={"returnText"}>&#8249; Повернутися</p>
                </div>
                <div className={"relative flex items-center mt-12 text-2xl"}>
                    <h1 className={"relative left-96"}>Hotel Name</h1>
                    <p className={"absolute right-96"}>рейтинг</p>
                </div>
                <div className={"relative flex items-left mt-4 mb-10 text-2xl"}>
                    <p className={"relative left-96"}>Адреса</p>
                    <p className={"absolute right-96"}>оцінка</p>
                </div>
                <div
                    className="flex items-center justify-center mx-auto py-4 bg-neutral-800 relative h-[700px] w-[1920px]">
                    <button
                        className="absolute w-14 h-14 left-10 bg-neutral-700 text-white p-4 z-10 rounded-full"
                        onClick={handlePrev}
                    >
                        &#8249;
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
                        &#8250;
                    </button>
                </div>
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
                        <select id={"roomSelect"} onChange={handleChange}>
                            {roomData.map(roomData => (
                                <option key={roomData.value} value={roomData.value}> {roomData.label}</option>
                            ))}
                        </select>
                    </div>
                    {selectedRoomType && (
                        <div className={"relative flex justify-center items-center mt-8"}>
                            <div className="relative group max-w-4xl mr-14">
                                <Image src={images[currentImage]} width={"504"} height={"338"}
                                       className="max-h-[300px] object-cover "
                                       onClick={openModal}></Image>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                > &#8249;
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    &#8250;
                                </button>
                            </div>
                            <div>
                                <p className={"text-lg mb-5"}>площа номеру: {selectedRoomType.square} кв.м</p>
                                <p className={"text-lg mb-10"}>максимальна кількість гостей у
                                    номері: {selectedRoomType.maxGuests}</p>
                                <h1 className={"relative flex items-center justify-center text-xl mb-5"}>Опції</h1>
                                <div className={"relative flex"}>
                                    <ul className={"list-disc pl-5 text-lg"}>
                                        <li>Wifi: {selectedRoomType.amenities.wifi ? 'Так' : 'Ні'} </li>
                                        <li>Кондиціонер: {selectedRoomType.amenities.airConditioning ? 'Так' : 'Ні'}</li>
                                        <li>Мініхолодильник: {selectedRoomType.amenities.refrigerator ? 'Так' : 'Ні'}</li>
                                        <li>Опалення: {selectedRoomType.amenities.heating ? 'Так' : 'Ні'}</li>
                                        <li>Телефон: {selectedRoomType.amenities.phone ? 'Так' : 'Ні'}</li>
                                    </ul>
                                    <ul className={"list-disc pl-32 text-lg"}>
                                        <li>Ванна/Душ: {selectedRoomType.amenities.shower ? 'Так' : 'Ні'}</li>
                                        <li>TV: {selectedRoomType.amenities.tv ? 'Так' : 'Ні'}</li>
                                        <li>Тераса/Балкон: {selectedRoomType.amenities.terrace ? 'Так' : 'Ні'}</li>
                                        <li>Мінібар: {selectedRoomType.amenities.minibar ? 'Так' : 'Ні'}</li>
                                    </ul>
                                </div>
                            </div>
                            {isOpen && (
                                <div
                                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                                    <div className="relative">
                                        <button
                                            onClick={closeModal}
                                            className="absolute top-0 right-0 p-4 text-white z-50"
                                        >
                                            Х
                                        </button>
                                        <Image
                                            src={images[currentImage]}
                                            width={1000} // Задайте желаемую ширину для большой версии
                                            height={750} // Задайте желаемую высоту для большой версии
                                            className="object-cover" // Используйте object-cover, чтобы сохранить пропорции
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <hr className="border-t-1 border-gray-500 mx-80 my-12"/>
                <div>
                    <h1 className={"relative left-96 text-2xl"}>Інфраструктура та послуги</h1>
                    <div className={"relative flex items-center left-96 mt-8 "}>
                        {Object.keys(infrastructure)
                            .filter((key) => infrastructure[key].isAvailable) // Показываем только доступную инфраструктуру
                            .map((infrastructureKey) => (
                                <button
                                    key={infrastructureKey}
                                    onClick={() => handleButtonClick(infrastructureKey)}
                                    className={`mr-3 p-2 rounded ${
                                        selectedButton === infrastructureKey ? 'bg-red-500 text-white' : 'bg-white text-black border-2'
                                    }`}
                                >
                                    {infrastructureKey}
                                </button>
                            ))}
                    </div>
                    <div>
                        <div className={"relative flex items-center mt-10 left-96"}>
                            {selectedButton && infrastructure[selectedButton].isAvailable && (
                                <div>
                                    {renderColumns(
                                        Object.entries(infrastructure[selectedButton])
                                            .filter(([key]) => key !== 'isAvailable') // Пропускаем isAvailable
                                    )}
                                </div>
                            )}
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
