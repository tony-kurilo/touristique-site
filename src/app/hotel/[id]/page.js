import React from "react";
import HotelData from "./components/HotelData";


// Функция для получения данных отеля
async function getHotelData(id) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseURL}/api/hotel/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при получении данных отеля');
    }
    return await response.json();
}

// Генерация статических параметров
export async function generateStaticParams() {
    // Здесь вы можете загрузить все доступные ID отелей из базы данных
    try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseURL}/api/hotels`);

        return hotels.map((hotel) => ({
            id: hotel.id.toString(),
        }));
    } catch (error) {
        console.error('Ошибка при получении ID отелей:', error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

export default async function Page({ params  }) {
    const {id} = params;
    const data = await getHotelData(id);

    if (!data){
        return <p>Отель не знайдено!</p>;
    }
    return (
        <div>
            <HotelData data={data} /> {/* Передаем данные отеля в клиентский компонент */}
        </div>
    );
}
