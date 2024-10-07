"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";


export default function HotelSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currency, setCurrency] = useState('UAH');
    const [hotels, setHotels] = useState([]);
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

    const [visibleHotels, setVisibleHotels] = useState(8); // Количество отелей, которые отображаются
    const [loading, setLoading] = useState(false);

    const currencyRates = {
        UAH: 1,
        USD: 0.027,
        EUR: 0.025
    };
    // Функция конвертации валюты
    const convertPrice = (price, currency) => {
        return Math.round(price * currencyRates[currency]);
    };
    // Загружаем данные из JSON файла при монтировании компонента
    useEffect(() => {
        const hasSearchParams = searchParams.has('country') || searchParams.has('city')
            || searchParams.has('priceFrom') || searchParams.has('priceTo') || searchParams.has('adults')
            || searchParams.has('children')|| searchParams.has('dateFrom')|| searchParams.has('dateTo')
            || searchParams.has('nightsFrom')|| searchParams.has('nightsTo');

        if (hasSearchParams) {
            const fetchHotels = async () => {
                const response = await fetch('/database/hotels.json');
                const data = await response.json();
                setHotels(data);
            };

            fetchHotels();
        }
    }, [searchParams]);


    // Восстановление параметров и результатов при загрузке страницы
    useEffect(() => {
        // Проверяем наличие сохраненных данных
        const savedSearchPageUrl = localStorage.getItem('searchPageUrl');
        const savedVisibleHotels = localStorage.getItem('visibleHotels');
        const savedSearchResults = localStorage.getItem('searchResults');
        const savedSearchParams = localStorage.getItem('searchParams');

        if (savedSearchPageUrl && savedSearchResults && savedSearchParams && searchParams.toString()) {
            setSearchResults(JSON.parse(savedSearchResults));
            setVisibleHotels(Number(savedVisibleHotels) || 8);

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
        localStorage.removeItem('searchPageUrl'); // Очищаем URL поиска
        localStorage.removeItem('visibleHotels'); // Очищаем количество отелей
        localStorage.removeItem('searchResults'); // Очищаем результаты поиска

        if (hotels.length === 0) {
            // Загружаем отели, если они еще не загружены
            const response = await fetch('/database/hotels.json');
            const data = await response.json();
            setHotels(data);
            // После загрузки данных выполняем фильтрацию
            filterHotels(data);
        } else {
            // Если данные уже загружены, сразу выполняем фильтрацию
            filterHotels(hotels);
        }
    };

    const filterHotels = (hotelData) => {
        const filteredHotels = hotelData.filter(hotel => {
            const departureDateFrom = dateFrom ? new Date(dateFrom) : null;
            const departureDateTo = dateTo ? new Date(dateTo) : null;

            const hotelDepartureDateFrom = new Date(hotel.dateFrom);
            const hotelDepartureDateTo = new Date(hotel.dateTo);

            const hotelReturnDate = departureDateFrom ? new Date(departureDateFrom) : null;
            if (hotelReturnDate && nightsFrom) {
                hotelReturnDate.setDate(hotelReturnDate.getDate() + Number(nightsFrom));
            }

            return (
                (country ? hotel.country.toLowerCase() === country.toLowerCase() : true) &&
                (city ? hotel.city.toLowerCase() === city.toLowerCase() : true) &&
                (priceFrom ? hotel.price >= Number(priceFrom) : true) &&
                (priceTo ? hotel.price <= Number(priceTo) : true) &&
                (adults ? hotel.adults === Number(adults) : true) &&
                (children ? hotel.children === Number(children) : true) &&
                (!departureDateFrom || hotelDepartureDateFrom <= departureDateFrom) &&
                (!departureDateTo || hotelDepartureDateTo >= departureDateTo) &&
                (!nightsFrom || hotelDepartureDateTo >= hotelReturnDate) &&
                (!nightsTo || hotelDepartureDateFrom <= new Date(hotelDepartureDateFrom.getTime() + nightsTo * 86400000))
            );
        });

        setSearchResults(filteredHotels);
        setVisibleHotels(8);

        // Сохраняем результаты поиска и параметры в localStorage
        localStorage.setItem('searchResults', JSON.stringify(filteredHotels));
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
        }));

        // Обновляем URL
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
            nightsTo
        });

        for (const [key, value] of queryParams.entries()) {
            if (!value) {
                queryParams.delete(key);
            }
        }

        router.replace(`?${queryParams.toString()}`, { shallow: true });
    };

    // Функция перенаправления на страницу отеля
    const handleRedirect = (hotelId) => {
        const currentUrl = window.location.href; // Получаем текущий URL
        localStorage.setItem('searchPageUrl', currentUrl); // Сохраняем URL в localStorage
        localStorage.setItem('visibleHotels', visibleHotels); // Сохраняем количество видимых отелей
        localStorage.setItem('searchResults', JSON.stringify(searchResults)); // Сохраняем результаты поиска
        router.push(`/hotel/${hotelId}`); // Перенаправляем на страницу отеля
    };

    // Функция загрузки дополнительных отелей
    const loadMoreHotels = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleHotels(prevVisible => prevVisible + 8); // Увеличиваем количество отображаемых отелей
            setLoading(false);
        }, 1000); // Имитация задержки для демонстрации загрузки
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
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>ночей від</p>
                        <input
                            type={"number"}
                            placeholder={"0"}
                            value={nightsFrom}
                            onChange={(e) => setNightsFrom(e.target.value)}
                            id={"NightsFromInput"}
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
                        />
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>до</p>
                        <input
                            type={"number"}
                            value={nightsTo}
                            onChange={(e) => setNightsTo(e.target.value)}
                            id={"nightsToInput"}
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
                        />
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>до</p>
                        <input
                            type={"number"}
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            id={"priceToInput"}
                        />
                    </div>
                </div>
            </div>
            <div className={"flex items-center mt-10"}>
                <p className={"mr-4 w-20 text-right leading-tight break-words"}>Валюта</p>
                <select name="currency" className={"mr-24"} id={"currency"} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <button onClick={handleSearch} id={"submitButton"}>Пошук</button>
            </div>
            <div className="mt-8">
                {searchResults.slice(0, visibleHotels).map((hotel, index) => (
                        <div key={index} className=" p-4 mt-2 mb-7 flex items-center border rounded-md cursor-pointer shadow-md" id={"hotelDiv"}
                             onClick={() => handleRedirect(parseInt(hotel.id))}>
                            <div className={"mr-10"}>
                                <Image src={hotel.image} width={"510"} height={"333"} className={"border rounded cursor-pointer"}></Image>
                            </div>
                            <div className={""}>
                                <h2 className={"text-3xl mb-1"} onClick={(e) => e.stopPropagation()}>{hotel.name}</h2>
                                <p className={"mb-10"} onClick={(e) => e.stopPropagation()}>Оцінка</p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Адреса</p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Виліт від: {hotel.dateFrom}</p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Ночей: 4 </p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Тур закінчується: 2024-09-05 </p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Тип номеру: двомісний</p>
                                <p className={"text-xl mb-2"} onClick={(e) => e.stopPropagation()}>Тип харчування: all-inclusive</p>
                            </div>
                            <div className={"ml-72 mr-2 relative"}>
                                <p className={"text-xl mb-64"} onClick={(e) => e.stopPropagation()}>{convertPrice(hotel.price, currency)} {currency}</p>
                                <button id={"submitButton"} onClick={(e) => e.stopPropagation()}>Додати</button>
                            </div>
                        </div>
                ))}
            </div>
            {visibleHotels < searchResults.length && (
                <button onClick={loadMoreHotels} className="mt-4" disabled={loading} id={"loadingButton"}>
                    {loading ? "Завантаження..." : "Завантажити ще"}
                </button>
            )}
                </div>
    );
}
