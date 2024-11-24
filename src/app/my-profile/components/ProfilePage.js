"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState }  from "react";

const ProfilePage = ({ userData }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("orders");

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                // Очищаем localStorage и перенаправляем на главную
                localStorage.removeItem('accessToken');
                router.replace('/');
            } else {
                console.error('Ошибка при выходе из системы');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    if (!userData) {
        return <p>Загрузка данных...</p>;
    }


    return (
        <div>
            <div className="w-full bg-neutral-900 object-cover" style={{
                backgroundImage: `url('/images/search-background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 h-[150px] bg-black opacity-30"></div>
                <nav className="relative flex items-center justify-between z-10">
                    <div className="flex items-center m-10 px-6">
                        <a href="/">
                            <Image className="" src={"/icons/promo1.png"} alt={"Earth icon"} width={"150"}
                                   height={"150"}></Image>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/search"}>Пункти
                            призначення</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/blog"}>Блог</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/about-us"}>Про
                            нас</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"}
                           href={"/contact-us"}>Зв&apos;яжіться з нами</a>
                    </div>
                    <div className="flex items-center m-10 pr-10">
                        <a href="/basket">
                            <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={"33"}
                                   height={"33"}></Image>
                        </a>
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Whishlist icon"}
                                   width={"37"}
                                   height={"37"}>
                        </Image>
                    </div>
                </nav>
            </div>
            <h1 className={"text-xl flex justify-center items-center mt-10"}>Добро пожаловать, {userData.username}!</h1>

            <div className="mt-4 flex flex-row">
                <div className="w-64 text-white p-4 mr-32">
                    <div className="flex flex-col space-y-4 text-center pl-14">
                        <div>
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`px-4 py-2 ${activeTab === "personal" ? "text-red-600 underline" : "text-black hover:text-red-600 transition duration-150"} rounded`}
                            >
                                Личные данные
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`px-4 py-2 ${activeTab === "orders" ? "text-red-600 underline" : "text-black hover:text-red-600 transition duration-150"} rounded`}
                            >
                                Заказы
                            </button>
                        </div>
                        <div className={"mb-96 pt-96 space-y-4"}>
                            <button
                                onClick={handleLogout}
                                className="px-12 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 ">
                    {activeTab === "personal" && (
                        <div className={"center"}>
                            <h2 className={""}>Личные данные</h2>
                            <p>Имя пользователя: {userData.username}</p>
                            <p>Email: {userData.email}</p>

                        </div>
                    )}
                    {activeTab === "orders" && (
                        <div>
                            <h2>Ваши заказы</h2>
                            <p>Здесь будет информация о ваших заказах</p>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
