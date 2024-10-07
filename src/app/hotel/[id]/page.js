import fs from 'fs';
import path from 'path';
import React from "react";
import HotelData from "./components/HotelData";

// Функция для получения данных отеля
async function getHotelData(id) {
    const hotelsFilePath = path.join(process.cwd(), 'public/database/hotels1.json');
    const hotelsData = JSON.parse(fs.readFileSync(hotelsFilePath, 'utf8'));
    return hotelsData.hotels.find(hotel => hotel.id.toString() === id);
}

// Функция для генерации статических параметров
export async function generateStaticParams() {
    const hotelsFilePath = path.join(process.cwd(), 'public/database/hotels1.json');
    const hotelsData = JSON.parse(fs.readFileSync(hotelsFilePath, 'utf8'));

    return hotelsData.hotels.map((hotel) => ({
        id: hotel.id.toString(),
    }));
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
