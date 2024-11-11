import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Image from "next/image";
import Cookies from 'js-cookie'; // Importing js-cookie

const AuthForm = () => {
    const router = useRouter();
    const [isLoginForm, setIsLoginForm] = useState(true); // Управление состоянием

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm); // Переключение между формами
    };

    useEffect(() => {
        // Check if token exists in cookies
        const token = Cookies.get('authToken'); // Replace with the correct cookie name

        if (token) {
            // If user is already logged in, redirect to another page (e.g., profile)
            router.push('/my-profile'); // Adjust this path as needed
        }
    }, [router]);


    return (
        <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
             style={{backgroundImage: "url('/images/search-background.png')"}}>
            {/* Затемняющий слой */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

            {/* Контент поверх фона и затемнения */}
            <div className="absolute top-0 left-0 right-0">
                <nav className="relative flex items-center justify-between z-10">
                    <div className="flex items-center m-10 px-6">
                        <a href="/">
                            <Image className="" src={"/icons/promo1.png"} alt={"Earth icon"} width={"150"} height={"150"}></Image>
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
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={33}
                               height={33}/>
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Account icon"} width={37}
                               height={37}/>
                    </div>
                </nav>
            </div>

            {/* Центрированная форма */}
            <div className="relative z-10 bg-neutral-700 p-6 rounded-lg shadow-md w-full max-w-md geologica-200">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">
                    {isLoginForm ? 'Вхід' : 'Реєстрація'}
                </h2>

                {/* Условный рендеринг: форма входа или регистрация */}
                {isLoginForm ? <LoginForm/> : <RegisterForm/>}

                {/* Кнопка переключения между формами */}
                <div className="text-center mt-4">
                    <button
                        onClick={toggleForm}
                        className="text-red-500 hover:underline"
                    >
                        {isLoginForm ? 'Немає аккаунта? Зареєструватися' : 'Вже є аккаунт? Увійти'}
                    </button>
                </div>
            </div>
        </div>
    );

};

export default AuthForm;
