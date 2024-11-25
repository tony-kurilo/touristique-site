"use server";

import React from "react";
import Image from "next/image";
import Footer from "../../components/Footer";


// Функция для получения данных конкретной статьи
async function getArticle(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/articles/${id}`, { cache: "no-store" }); // Замените на ваш API
        if (!res.ok) {
            throw new Error("Failed to fetch article");
        }
        const data = await res.json();
        return data.article; // Предполагается, что API возвращает объект `article`
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function ArticlePage({ params }) {
    const { id } = params;
    const article = await getArticle(id);

    if (!article) {
        return <div>Новина не знайдена.</div>;
    }

    // Функция для рендера текста и изображений
    const renderContent = () => {
        const sections = [];
        const imageUrls = article.images || []; // предполагается, что изображения находятся в article.images

        // Разделение текста на части, где будут изображения
        let textParts = article.text.map((part, index) => {
            // Если часть текста является ссылкой на изображение, вставляем картинку
            if (part.startsWith("http")) {
                return (
                    <div key={index} className="mb-6">
                        <Image src={part} alt={`Image ${index}`} width={800} height={400} className="w-full h-auto object-cover rounded-md" />
                    </div>
                );
            }
            // Если это обычный текст, то просто выводим его
            return <p key={index} className="mb-6">{part}</p>;
        });

        return textParts;
    };

    return (
        <div>
            <div className="w-full bg-neutral-900 object-cover" style={{
                backgroundImage: `url('/images/search-background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 h-[151px] bg-black opacity-30"></div>
                <nav className="relative flex items-center justify-between z-10">
                    <div className="flex items-center m-10 px-6">
                        <a href="/">
                            <Image className="" src={"/icons/promo1.png"} alt={"Logo"} width={"150"}
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
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist"} width={33}
                               height={33}/>
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Profile"} width={37}
                               height={37}/>
                    </div>
                </nav>
            </div>
            <h1 className="text-3xl font-bold max-w-screen-md mx-auto text-center mt-8">{article.title}</h1>
            <div className={"flex items-center justify-between max-w-screen-md mx-auto mt-2"}>
                <h2 className={"text-lg"}>{article.type}</h2>
                <h2 className={"text-lg"}>{article.date
                    ? new Date(article.date).toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })
                    : "Дата відсутня"}</h2>
            </div>
            <div className={"mt-10 mb-12 flex items-center justify-between max-w-screen-md mx-auto text-lg"}>
                <div>
                    {/* Рендерим контент статьи с картинками и текстом */}
                    {renderContent()}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
