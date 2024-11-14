"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";


export default function HotelSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currency, setCurrency] = useState('UAH');
    const [vouchers, setVouchers] = useState([]);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [adults, setAdults] = useState('');
    const [children, setChildren] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [nightsFrom, setNightsFrom] = useState('');
    const [nightsTo, setNightsTo] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [visibleVouchers, setVisibleVouchers] = useState(8);
    const [loading, setLoading] = useState(false);

    const [roomType, setRoomType] = useState('Стандарт');

    const currencyRates = {
        UAH: 1,
        USD: 0.027,
        EUR: 0.025
    };
    // Функция конвертации валюты
    const convertPrice = (price, currency) => {
        return Math.round(price * currencyRates[currency]);
    };

    // Функция для вычисления стоимости с учетом количества ночей
    const calculatePrice = (voucher) => {
        let price = voucher.price_per_night;

        // Если указано количество ночей
        if (nightsFrom || nightsTo) {
            const nights = nightsFrom || nightsTo;  // Используем значение nightsFrom или nightsTo
            price = voucher.price_per_night * nights;
        }

        // Возвращаем цену в нужной валюте
        return convertPrice(price, currency);
    };
    useEffect(() => {
        const roomTypeFromURL = searchParams.get('roomType'); // Получаем roomType из URL
        if (roomTypeFromURL) {
            setRoomType(roomTypeFromURL); // Если есть, устанавливаем значение roomType
        }

        const hasSearchParams = searchParams.has('country') ||
            searchParams.has('city') || searchParams.has('priceFrom') ||
            searchParams.has('priceTo') || searchParams.has('adults') ||
            searchParams.has('children') || searchParams.has('dateFrom') ||
            searchParams.has('dateTo') || searchParams.has('nightsFrom') ||
            searchParams.has('nightsTo');

        if (hasSearchParams) {
            fetchVouchers();
        }
    }, [searchParams]);

    const fetchVouchers = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (country) queryParams.append('country', country);
            if (city) queryParams.append('city', city);
            if (priceFrom) queryParams.append('priceFrom', priceFrom);
            if (priceTo) queryParams.append('priceTo', priceTo);
            if (adults) queryParams.append('adults', adults);
            if (children) queryParams.append('children', children);
            if (dateFrom) queryParams.append('dateFrom', dateFrom);
            if (dateTo) queryParams.append('dateTo', dateTo);
            if (nightsFrom) queryParams.append('nightsFrom', nightsFrom);
            if (nightsTo) queryParams.append('nightsTo', nightsTo);

            const response = await fetch(`/api/searchHotel?${queryParams.toString()}`);
            const data = await response.json();
            setVouchers(data);
            setSearchResults(data);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        const savedSearchResults = localStorage.getItem('searchResults');
        const savedSearchParams = localStorage.getItem('searchParams');

        if (savedSearchResults && savedSearchParams && searchParams.toString()) {
            setSearchResults(JSON.parse(savedSearchResults));
            setVisibleVouchers(8);

            const params = JSON.parse(savedSearchParams);
            setCountry(params.country || '');
            setCity(params.city || '');
            setPriceFrom(params.priceFrom || '');
            setPriceTo(params.priceTo || '');
            setAdults(params.adults || '');
            setChildren(params.children || '');
            setDateFrom(params.dateFrom || '');
            setDateTo(params.dateTo || '');
            setNightsFrom(params.nightsFrom || '');
            setNightsTo(params.nightsTo || '');
        }
    }, [searchParams]);

    const handleSearch = async () => {
        // Проверяем, если количество ночей указано, но начальная дата не указана
        if (nightsFrom && !dateFrom) {
            alert('Будь ласка, введіть початкову дату!');
            return;
        }

        // Прочие проверки, если нужно
        if (nightsFrom && (isNaN(nightsFrom) || nightsFrom <= 0)) {
            alert('Будь ласка, введіть правильну кількість ночей!');
            return;
        }


        // Очистка предыдущих данных
        localStorage.removeItem('searchPageUrl');
        localStorage.removeItem('visibleHotels');
        localStorage.removeItem('searchResults');

        // Выполнение поиска
        fetchVouchers();
    };

    const updateURLWithSearchParams = () => {
        const queryParams = new URLSearchParams({
            country,
            city,
            priceFrom,
            priceTo,
            adults,
            children,
            dateFrom,
            dateTo,
            nightsFrom,
            nightsTo,
            roomType
        });

        for (const [key, value] of queryParams.entries()) {
            if (!value) queryParams.delete(key);
        }

        router.replace(`?${queryParams.toString()}`, { shallow: true });
    };

    useEffect(() => {
        if (searchResults) {
            localStorage.setItem('searchResults', JSON.stringify(searchResults));
            localStorage.setItem('searchParams', JSON.stringify({
                country,
                city,
                priceFrom,
                priceTo,
                adults,
                children,
                dateFrom,
                dateTo,
                nightsFrom,
                nightsTo,
                roomType
            }));
        }
    }, [searchResults]);

    // Функция перенаправления на страницу отеля
    const handleRedirect = (voucher) => {
        const currentUrl = window.location.href; // Получаем текущий URL
        localStorage.setItem('searchPageUrl', currentUrl);
        localStorage.setItem('visibleVouchers', visibleVouchers);
        localStorage.setItem('searchResults', JSON.stringify(searchResults));

        // Используем hotel_id из объекта voucher для перенаправления
        router.push(`/hotel/${voucher.hotel_id}`);
    };

    const loadMoreVouchers = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleVouchers(prevVisible => prevVisible + 8);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className={"flex flex-col items-center mt-16"}>
            <div className={"flex items-center"}>
                <div className={"flex items-center mr-12"}>
                    <p className={"mr-4 w-24 text-right leading-tight break-words"}>країна прибуття</p>
                    <input
                        type={"text"}
                        placeholder={"Введіть країну"}
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        id={"countryInput"}
                    />
                </div>
                <div className={"flex items-center"}>
                    <p className={"mr-4 w-32 text-right leading-tight break-words"}>місто прибуття</p>
                    <input
                        type={"text"}
                        placeholder={"Введіть місто"}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        id={"cityInput"}
                    />
                </div>
            </div>
            <div className={"flex items-center mt-8"}>
                <div className={"flex items-center mr-48"}>
                    <div className={"flex items-center mr-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>виліт від</p>
                        <input
                            type={"date"}
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            id={"DepartureFromInput"}
                        />
                        {nightsFrom && !dateFrom && <span className="text-red-500 ml-2">Введіть дату</span>}
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>ночей від</p>
                        <input
                            type={"number"}
                            placeholder={"0"}
                            value={nightsFrom}
                            onChange={(e) => setNightsFrom(e.target.value)}
                            id={"NightsFromInput"}
                            min="0"
                        />
                    </div>
                </div>
                <div className={"flex items-center"}>
                    <div className={"flex items-center mr-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>дорослих</p>
                        <input
                            type={"number"}
                            value={adults}
                            placeholder={"0"}
                            onChange={(e) => setAdults(e.target.value)}
                            id={"AdultsInput"}
                            min="1"
                        />
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>ціна від</p>
                        <input
                            type={"number"}
                            value={priceFrom}
                            placeholder={"0"}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            id={"PriceFromInput"}
                            min="0"
                        />
                    </div>
                </div>
            </div>
            <div className={"flex items-center mt-8"}>
                <div className={"flex items-center mr-48"}>
                    <div className={"flex items-center mr-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>до</p>
                        <input
                            type={"date"}
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            id={"DepartureToInput"}
                            min="0"
                        />
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>до</p>
                        <input
                            type={"number"}
                            value={nightsTo}
                            onChange={(e) => setNightsTo(e.target.value)}
                            id={"nightsToInput"}
                            min="0"
                        />
                    </div>
                </div>
                <div className={"flex items-center"}>
                    <div className={"flex items-center mr-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>дітей</p>
                        <input
                            type={"number"}
                            value={children}
                            placeholder={"0"}
                            onChange={(e) => setChildren(e.target.value)}
                            id={"childrenInput"}
                            min="0"
                        />
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>до</p>
                        <input
                            type={"number"}
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            id={"priceToInput"}
                            min="0"
                        />
                    </div>
                </div>
            </div>
            <div className={"flex items-center mt-10"}>
                <p className={"mr-4  text-right leading-tight break-words"}>Клас кімнати</p>
                <select
                    id={"currency"}
                    className={"mr-10"}
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}>
                    <option value={"Standard Room"}>Стандарт</option>
                    <option value={"Premium Room"}>Комфорт</option>
                    <option value={"Honeymoon Suite"}>Номер для наречених</option>
                    <option value={"Family Room"}>Сімейний номер</option>
                    <option value={"Suite"}>Люкс</option>
                    <option value={"Super Suite"}>Президентський Люкс</option>
                </select>
                <p className={"mr-4 w-20 text-right leading-tight break-words"}>Валюта</p>
                <select name="currency"
                        className={"mr-24"}
                        id={"currency"}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <button onClick={handleSearch} id={"submitButton"}>Пошук</button>
            </div>
            <div className="mt-8">
                {Array.isArray(searchResults) && searchResults.slice(0, visibleVouchers).map((voucher, index) => (
                        <div key={index} className=" p-4 mt-2 mb-7 flex items-center border rounded-md cursor-pointer shadow-md" id={"hotelDiv"}
                             onClick={() => handleRedirect(voucher)}>
                            <div className={"mr-10"}>
                                {voucher.hotel_image && (
                                    <Image src={voucher.hotel_image} width={510} height={333} className={"border rounded cursor-pointer"} />
                                )}
                            </div>
                            <div className={""}>
                                <h2 className={"text-3xl mb-1 geologica-300"} onClick={(e) => e.stopPropagation()}>{voucher.hotel_name}</h2>
                                <p className={"mb-10"} onClick={(e) => e.stopPropagation()}>{voucher.rating}</p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>{voucher.hotel_address}</p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>{voucher.date_from} </p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Ночей: </p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Тур закінчується: </p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Тип номеру: {voucher.room_type} </p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Тип харчування: </p>
                            </div>
                            <div className={"ml-72 mr-2 relative"}>
                                <p className={"text-xl mb-64"} onClick={(e) => e.stopPropagation()}>{nightsFrom || nightsTo ? `від ${calculatePrice(voucher)} ${currency}` : `від ${convertPrice(voucher.price_per_night, currency)} ${currency}`}</p>
                                <button id={"submitButton"} onClick={(e) => e.stopPropagation()}>Додати</button>
                            </div>
                        </div>
                ))}
            </div>
            {visibleVouchers < searchResults.length && (
                <button onClick={loadMoreVouchers} className="mt-4" disabled={loading} id={"loadingButton"}>
                    {loading ? "Завантаження..." : "Завантажити ще"}
                </button>
            )}
                </div>
    );
}
