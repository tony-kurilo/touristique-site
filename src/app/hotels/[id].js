"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from "next/image";

export default function HotelDetails() {
    const [hotel, setHotel] = useState(null);
    const router = useRouter();
    const { id } = useParams();

    // Загружаем данные из JSON файла при монтировании компонента
    useEffect(() => {
        const fetchHotelData = async () => {
            const response = await fetch('/database/hotels.json');
            const hotels = await response.json();
            const selectedHotel = hotels.find(h => h.id === parseInt(id));
            setHotel(selectedHotel);
        };

        fetchHotelData();
    }, [id]);

    // Обработчик кнопки возврата
    const handleBack = () => {
        const savedSearchURL = localStorage.getItem('previousSearchURL');
        if (savedSearchURL) {
            router.push(savedSearchURL);  // Возврат на страницу поиска
        } else {
            router.push('/search');  // По умолчанию переходим на страницу поиска
        }
    };

    if (!hotel) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center mt-16">
            <h1 className="text-4xl mb-8">{hotel.name}</h1>
            <div className="flex">
                <Image src={hotel.image} alt={hotel.name} width={600} height={400} />
                <div className="ml-10">
                    <p><strong>Country:</strong> {hotel.country}</p>
                    <p><strong>City:</strong> {hotel.city}</p>
                    <p><strong>Price:</strong> {hotel.price} UAH</p>
                    <p><strong>Adults:</strong> {hotel.adults}</p>
                    <p><strong>Children:</strong> {hotel.children}</p>
                    <p><strong>Date From:</strong> {hotel.dateFrom}</p>
                    <p><strong>Date To:</strong> {hotel.dateTo}</p>
                    <p><strong>Rating:</strong> {hotel.rating}</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={handleBack}>
                        Повернутися назад
                    </button>
                </div>
            </div>
        </div>
    );
}
