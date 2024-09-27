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
        const savedSearchResults = localStorage.getItem('searchResults');
        const savedSearchParams = localStorage.getItem('searchParams');

        if (savedSearchResults && savedSearchParams && searchParams.toString()) {
            setSearchResults(JSON.parse(savedSearchResults));

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
                            onChange={(e) => setAdults(e.target.value)}
                            id={"AdultsInput"}
                        />
                    </div>
                    <div className={"flex items-center ml-5"}>
                        <p className={"mr-4 w-20 text-right leading-tight break-words"}>ціна від</p>
                        <input
                            type={"number"}
                            value={priceFrom}
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
                {searchResults.length > 0 ? (
                    searchResults.map((hotel, index) => (
                        <div key={index} className=" p-4 m-2 flex items-center">
                            <div className={"mr-10"}>
                                <Image src={hotel.image} width={"510"} height={"333"}></Image>
                            </div>
                            <div className={""}>
                                <h2 className={"text-3xl"}>{hotel.name}</h2>
                                <p className={"mb-8"}>Оцінка</p>
                                <p className={"text-xl mb-2"}>Адреса</p>
                                <p className={"text-xl"}>Виліт від: {hotel.dateFrom}</p>
                                <p className={"text-xl"}>Ночей: 4 </p>
                                <p className={"text-xl mb-2"}>Тур закінчується: 2024-09-05 </p>
                                <p className={"text-xl"}>Тип номеру: двомісний</p>
                                <p className={"text-xl mb-2"}>Тип харчування: all-inclusive</p>
                                <p className={"text-xl"}>Відправка з: <br/> місто АЛлалал, аеропорт ТАІА </p>
                            </div>
                            <div className={"ml-72 mr-2 relative"}>
                                <p className={"text-xl mb-64"}>{convertPrice(hotel.price, currency)} {currency}</p>
                                <button id={"submitButton"}>Додати</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}

            </div>
        </div>
    );
}
