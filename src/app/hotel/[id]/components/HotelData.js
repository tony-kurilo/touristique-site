"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HotelData ({ data  }) {
    const [hotel, setHotel] = useState(data);

    const position = [hotel.latitude, hotel.longitude];

    const [currentImage, setCurrentImage] = useState(0);
    const [roomCurrentImage, setRoomCurrentImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [roomData, setRoomData] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]); // Фильтрованные комнаты для отеля
    const [selectedRoomType, setSelectedRoomType] = useState(null);

    const [selectedButton, setSelectedButton] = useState('Пляж'); // Выбранный элемент инфраструктуры

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleNextHotelImage = () => {
        setCurrentImage((prev) => (prev + 1) % hotel.photos.length);
    };

    const handlePrevHotelImage = () => {
        setCurrentImage((prev) => (prev - 1 + hotel.photos.length) % hotel.photos.length);
    };

    const handleNextRoomImage = () => {
        setRoomCurrentImage((prev) => (prev + 1) % selectedRoomType.photos.length);
    };

    const handlePrevRoomImage = () => {
        setRoomCurrentImage((prev) => (prev - 1 + selectedRoomType.photos.length) % selectedRoomType.photos.length);
    };

    useEffect(() => {
        const fetchRoomData = async () => {
            const response = await fetch('/database/rooms.json');
            const data = await response.json();
            setRoomData(data.rooms); // Загружаем все комнаты
        };

        fetchRoomData();
    }, []);

    // Фильтрация комнат по hotelId
    useEffect(() => {
        if (hotel && roomData.length > 0) {
            const hotelRooms = roomData.filter(room => room.hotelId === hotel.id); // Фильтрация по hotelId
            setFilteredRooms(hotelRooms);
            setSelectedRoomType(hotelRooms[0]); // Выбор первой комнаты
        }
    }, [hotel, roomData]);

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10); // Преобразуем значение в число
        const selected = filteredRooms.find(room => room.id === value);
        setSelectedRoomType(selected);
        setRoomCurrentImage(0);
    };
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
    // Создаем кастомный икон-компонент
    const customMarkerIcon = L.divIcon({
        className: 'pin', // Класс для стилизации
        iconSize: [26, 26], // Размер иконки
        popupAnchor: [0,-20], // Позиция попапа относительно маркера
    });
    return (
        <div>
        <div className="w-full bg-neutral-900 object-cover" style={{
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
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"/search"}>Пункти призначення</a>
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Блог</a>
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Про нас</a>
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Зв`&apos;яжіться з нами</a>
                </div>
                <div className="flex items-center m-10 pr-10">
                    <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={33}
                           height={33}/>
                    <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Account icon"} width={37}
                           height={37}/>
                </div>
            </nav>
        </div>
        <main>
            <div className={"relative flex left-96 mt-4 text-lg "}>
                <a href={"#"} className={""} id={"returnText"}
                   onClick={() => {
                    const previousUrl = localStorage.getItem('searchPageUrl'); // Получаем URL предыдущей страницы
                    const visibleHotels = localStorage.getItem('visibleHotels'); // Получаем количество видимых отелей
                    const searchResults = localStorage.getItem('searchResults'); // Получаем результаты поиска

                    if (previousUrl && searchResults) {
                        // Восстанавливаем состояние, если данные сохранены
                        localStorage.setItem('visibleHotels', visibleHotels); // Перезаписываем в случае, если нужно
                        localStorage.setItem('searchResults', searchResults);

                        window.location.href = previousUrl; // Перенаправляем на сохраненную страницу
                    }
                }}
                >&#8249; Повернутися</a>
            </div>
            <div className={"relative flex items-center mt-12 text-2xl"}>
                <h1 className={"relative left-96"}>{hotel.name}</h1>
                <p className={"absolute right-96"}>{hotel.rating}</p>
            </div>
            <div className={"relative flex items-left mt-4 mb-10 text-2xl"}>
                <p className={"relative left-96"}>{hotel.address + ", " + hotel.country}</p>
                <p className={"absolute right-96"}>{hotel.reviewScore}</p>
            </div>
            <div
                className="flex items-center justify-center mx-auto py-4 bg-neutral-800 relative h-[700px] w-[1920px]">
                <button
                    className="absolute w-14 h-14 left-10 bg-neutral-700 text-white p-4 z-10 rounded-full"
                    onClick={handlePrevHotelImage}
                >
                    &#8249;
                </button>
                <div className="relative w-full h-full flex justify-center items-center">
                    <Image
                        src={hotel.photos[currentImage]}
                        alt="Hotel"
                        width={1920}
                        height={809}
                        className="object-contain max-h-full "
                    />
                </div>
                <button
                    className="absolute w-14 h-14 right-14 bg-neutral-700 text-white p-4 z-10 rounded-full"
                    onClick={handleNextHotelImage}
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
                            <td className="border border-gray-300 px-4 py-2 text-center">{hotel.yearBuilt}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{hotel.yearRenovated}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{hotel.roomCount}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{hotel.checkIn}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{hotel.checkOut}</td>
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
                        {filteredRooms.map(room => (
                            <option key={room.id} value={room.id}> {room.type}</option>
                        ))}
                    </select>
                </div>
                {selectedRoomType && (
                    <div className={"relative flex justify-center items-center mt-8"}>
                        <div className="relative group max-w-4xl mr-7">
                            <Image src={selectedRoomType.photos[roomCurrentImage]} width={"504"} height={"338"}
                                   className="max-h-[300px] object-cover "
                                   onClick={openModal}></Image>
                            <button
                                onClick={handlePrevRoomImage}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            > &#8249;
                            </button>
                            <button
                                onClick={handleNextRoomImage}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                &#8250;
                            </button>
                        </div>
                        <div className={"ml-7 mr-7"}>
                            <p className={"text-lg mb-5"}>площа номеру: {selectedRoomType.roomSize} кв.м</p>
                            <p className={"text-lg mb-10"}>максимальна кількість гостей у
                                номері: {selectedRoomType.maxOccupancy}</p>
                            <h1 className={"relative flex items-center justify-center text-xl mb-5"}>Опції</h1>
                            <div className={"relative flex"}>
                                <ul className={"list-disc pl-5 text-lg"}>
                                    <li>Wifi: {selectedRoomType.amenities.wifi ? 'Так' : 'Ні'} </li>
                                    <li>Кондиціонер: {selectedRoomType.amenities.airConditioning ? 'Так' : 'Ні'}</li>
                                    <li>Мініхолодильник: {selectedRoomType.amenities.refrigerator ? 'Так' : 'Ні'}</li>
                                    <li>Опалення: {selectedRoomType.amenities.heating ? 'Так' : 'Ні'}</li>
                                    <li>Телефон: {selectedRoomType.amenities.phone ? 'Так' : 'Ні'}</li>
                                </ul>
                                <ul className={"list-disc pl-32 pr-2 text-lg"}>
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
                                        src={selectedRoomType.photos[roomCurrentImage]}
                                        width={600} // Задайте желаемую ширину для большой версии
                                        height={350} // Задайте желаемую высоту для большой версии
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
                <div className="flex justify-center items-center mt-8">
                    <MapContainer center={position} zoom={15} style={{ height: '600px', width: '1000px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position} icon={customMarkerIcon}>
                            <Popup>
                                {hotel.name} <br /> {hotel.address}.
                            </Popup>
                        </Marker>
                    </MapContainer>

                </div>
            </div>
        </main>
        </div>
    );
};
// Конфигурация ISR
export const revalidate = 60;