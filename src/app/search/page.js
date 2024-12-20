import React, { Suspense } from 'react';
import Image from "next/image";
import SearchHotel from "./components/SearchHotel";

export default function Page() {
    return(
        <body>
            <div className="relative">
                <Image src={"/images/search-background.png"} alt="Background" width={"1920"} height={"809"}
                       className={"object-cover"}/>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div
                    className="absolute top-96 left-100 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl z-20 geologica-300">
                    Заплануйте Вашу подорож зараз !
                </div>
            </div>
        <header className="absolute top-0 left-0 w-full bg-opacity-10 z-10">
            <nav className="flex items-center justify-between">
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
                    <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/about-us"}>Про нас</a>
                    <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"}
                       href={"/contact-us"}>Зв&apos;яжіться з нами</a>
                </div>
                <div className="flex items-center m-10 pr-10">
                    <a href="/basket">
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist"} width={"33"}
                               height={"33"}></Image>
                    </a>
                    <a href="/my-profile">
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Profile"} width={"37"}
                               height={"37"}></Image>
                    </a>
                </div>
            </nav>
        </header>
            <main className={""}>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchHotel/>
                </Suspense>
            </main>
        </body>
    );
}