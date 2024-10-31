"use client"

import Image from "next/image";
import React, {useEffect, useState} from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [status, setStatus] = React.useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Для отображения ошибки
    const [isSending, setIsSending] = useState(false); // Для блокировки кнопки отправки во время запроса

    const maxRows = 60;

    // Используем useEffect для работы с DOM элементами после рендеринга
    useEffect(() => {
        const textarea = document.getElementById('auto-resize');

        if (textarea) {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto'; // Сбрасываем высоту перед пересчётом
                this.style.height = `${textarea.scrollHeight}px`; // Устанавливаем высоту по содержимому
            });
        }

        // Очищаем слушатели событий при размонтировании компонента
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', null);
            }
        };
    }, [message]); // Пустой массив зависимостей, чтобы хук сработал только один раз после первого рендера

    const handleInput = (e) => {
        const textarea = e.target;
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
        const lines = Math.floor(textarea.scrollHeight / lineHeight);

        if (lines <= maxRows) {
            setMessage(e.target.value);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault(); // Prevents the form from reloading the page
        setIsSending(true); // Блокируем кнопку отправки
        setStatus("loading"); // Show loading animation
        setErrorMessage(""); // Сброс ошибки

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            const response = await fetch('/api/contact', { // Make sure this matches your backend route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }), // Sending form data as JSON
            });

            await delay(3000);

            if (response.ok) {
                setStatus("success"); // Success animation
                // Additional actions like showing a success message or clearing the form
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Виникла помилка.');
                setStatus("error"); // Error animation

            }
        } catch (error) {
            setErrorMessage("Виникла помилка під час надсилання вашого повідомлення.");
            setStatus("error");
        } finally {
            setIsSending(false); // Разблокируем кнопку отправки
        }
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
             style={{backgroundImage: "url('/images/contact-us.png')"}}>
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
            <div className="relative z-10 bg-neutral-700 p-6 rounded-lg shadow-md w-full max-w-md geologica-200">
                {status === "loading" && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="spinner-border animate-spin"></div>
                        <p className="text-gray-100 mt-4">Відправка...</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="text-center text-green-500">
                        <div className="checkmark-icon">&#10004;</div>
                        <p>Успішно відправлено!</p>
                        <button onClick={() => setStatus(null)} className="text-blue-500">Надіслати ще одне повідомлення</button>
                    </div>
                )}

                {status === "error" && (
                    <div className="text-center text-red-500">
                        <div className="crossmark-icon">&#10006;</div>
                        <p>{errorMessage}</p>
                        <button onClick={() => setStatus(null)} className="text-blue-500">Спробувати ще раз</button>
                    </div>
                )}
                {!status && (
                    <form onSubmit={sendMessage} className="">
                        <div  className="mb-4" >
                            <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">Зв'яжіться з нами</h2>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-100">
                                ПІБ
                            </label>
                            <input
                                type="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-100">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-100">
                                Повідомлення
                            </label>
                            <textarea
                                type="text"
                                id="auto-resize"
                                rows="1"
                                value={message}
                                onChange={handleInput}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-blue-500 resize-y"
                                required
                            />
                        </div>

                        {errorMessage && (
                            <div className="mb-4 text-red-500">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                        >
                            Відправити
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}