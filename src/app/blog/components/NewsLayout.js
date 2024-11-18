"use client"

import React, {useState} from "react";
import Image from "next/image";
import "../../styles/blog.css";
import Link from "next/link";
import Footer from "../../components/Footer";

const Redirect = async (e, targetUrl) => {
    e.preventDefault();  // Отменяет стандартное поведение перехода
    window.location.href = targetUrl; // Принудительный переход на новый URL
};

export default function NewsLayout({articles}) {

    const [news, setNews] = useState(articles);

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
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={33}
                               height={33}/>
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Account icon"} width={37}
                               height={37}/>
                    </div>
                </nav>
            </div>
            <div className={" blog-title mt-10"}>
                <h1 className={"text-3xl relative flex items-center justify-center geologica-300"}>Новини та акції</h1>
                {news.length > 0 ? (
                    <div className={"mt-8"}>
                        {news.map((article) => {
                            const imageUrl = article.images && article.images[0];
                            return (
                                <Link key={article.id} href={`/blog/${article.id}`} onClick={(e) => Redirect(e, `/blog/${article.id}`)} >
                                    <div className="cursor-pointer hover:bg-gray-100 py-8 px-10 mx-10 mt-10 border rounded-md flex items-center">
                                        <div className="overflow-hidden">
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    width={450}
                                                    height={450}
                                                    alt={article.title}
                                                    className=" object-cover rounded-md mr-10"
                                                />
                                            ) : (
                                                <div className="bg-gray-300 flex items-center justify-center text-gray-700">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className={"px-6 pt-10"}>
                                            <div className={"flex justify-between relative -top-14"}>
                                                <p className="text-gray-600 line-clamp-3 text-lg">
                                                    {article.type || "Новина"}
                                                </p>
                                                <p className="text-gray-600 line-clamp-3 text-lg">
                                                    {article.date
                                                        ? new Date(article.date).toLocaleDateString("uk-UA", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })
                                                        : "Дата відсутня"}
                                                </p>
                                            </div>
                                            <h2 className="text-2xl font-bold relative -top-6 max-w-screen-md">{article.title}</h2>
                                            <p className={"text-lg  -top-6 max-w-screen-md"}>{article.text.slice(0, 1)} &rarr;</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center mt-4">Новини відсутні.</p>
                )}
            </div>
            <div className={"mt-10"}>
                <Footer/>
            </div>

        </div>
    );
}


