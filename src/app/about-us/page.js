"use client"

import Image from "next/image";
import "../styles/about-us.css";
import {useEffect} from "react";
import ImageCarousel from "@/app/about-us/components/ImageCarousel";
import {useRouter} from "next/navigation";
import Footer from "../components/Footer";


export default function Page() {
    const router = useRouter(); // Инициализируем router


    const Redirect = async (e) =>{
        e.preventDefault();
        window.location.href = "/contact-us"; // Принудительный переход без сохранения стилей
    }

    useEffect(() => {
        const markers = [...document.querySelectorAll('mark')];

        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.8
        });

        markers.forEach(mark => {
            observer.observe(mark);
        });
    }, []); // пустой массив зависимостей означает, что код выполнится один раз на клиенте
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
                            <Image className="" src={"/icons/promo1.png"} alt={"Logo"} width={"150"} height={"150"}></Image>
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
            <div className="relative">
                <div className="mt-10 flex flex-col items-center justify-center">
                    <p className="text-xl font-medium text-red-600 ">Дізнайся Все ... Про Нас </p>
                    <h1 className={"text-4xl mt-2 font-bold geologica-300"}>Про Touristique</h1>
                    <p className={"text-lg font-extralight mt-7 max-w-3xl text-center geologica-200"}>
                        Ми організуємо комфортні та впевнені подорожі з ретельно підібраними
                        маршрутами та екскурсіями, щоб ви могли насолоджуватися новими горизонтами без турбот.
                    </p>
                </div>
                <div className="relative flex flex-col items-center justify-between mt-20">
                    <Image src={"/images/about-us.jpg"} alt={"Our Photo"} width={"1500"} height={"300"}></Image>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center">
                    <p className={"text-2xl font-extralight mt-7 max-w-5xl text-center geologica-200"}>
                        <mark>Touristique</mark> прагне забезпечити незабутні подорожі
                        з індивідуальним підходом та найвищим рівнем сервісу,
                        перетворюючи ваші бажання на <mark>яскраві враження та пригоди.</mark>
                    </p>
                </div>
                <div className={"bg-gray-100 mt-20  pb-20"}>
                    <p className={"relative justify-self-center text-3xl pt-8 mb-12 geologica-200"}>Те, про що ми дбаємо найбільше</p>
                    <div className={"flex items-center justify-between mx-96 pt-3 "}>
                        <div className="w-[188.06px] h-[152px] flex flex-col items-center justify-center">
                            <Image src={"/icons/promo-earth.png"} width={"128"} height={"128"} alt={"destinations image"}
                                   className={"justify-self-center"}></Image>
                            <p className={"text-center text-lg mt-2 font-bold"}>Широкий вибір напрямків</p>
                        </div>
                        <div className="w-[188.06px] h-[152px] flex flex-col items-center justify-center">
                            <Image src={"/icons/handshake.png"} width={"128"} height={"128"} alt={"best service image"}
                                   className={"justify-self-center"}></Image>
                            <p className={"text-center text-lg mt-2 font-bold"}>Надійність та якість</p>
                        </div>
                        <div className="w-[188.06px] h-[152px] flex flex-col items-center justify-center">
                            <Image src={"/icons/service-agent.png"} width={"128"} height={"128"} alt={"support image"}
                                   className={"justify-self-center"}></Image>
                            <p className={"text-center text-lg mt-2 font-bold"}>Підтримка 24/7</p>
                        </div>
                    </div>
                </div>
                <div className={"mt-20"}>
                    <p className={"text-center text-xl geologica-300"}>
                        Ми команда професіоналів, захоплених своєю справою.
                    </p>
                    <div className={"mb-20"}>
                        <div className={"mt-10 mb-10"}>
                            <ImageCarousel/>
                        </div>
                    </div>
                </div>
                <div className={"mt-32 Selfies pb-10"} >
                    <p className={"text-center text-xl mb-20 pt-20 geologica-300"}> Кожен із нас — це пристрасний мандрівник,
                        який точно знає, що потрібно для ідеальної відпустки.
                    </p>
                    <div className={"image-container flex-wrap mb-5"}>
                        <Image src={"/images/about-us/selfie1.jpg"} alt={"our photo #1"} width={"450"} height={"800"} className="image"></Image>
                        <Image src={"/images/about-us/selfie2.jpg"} alt={"our photo #2"} width={"400"} height={"600"} className="image"></Image>
                        <Image src={"/images/about-us/selfie3.jpg"} alt={"our photo #3"} width={"425"} height={"750"} className="image"></Image>
                    </div>
                </div>
                <div className={"mb-10 pt-10 Global1Color"}>
                    <div className={"relative flex  left-80"}>
                        <div>
                            <p className={"relative top-4 pt-24 text-2xl font-bold"}>Touristique є частиною Global Pledge 1%
                                Movement</p>
                            <p className={"relative pt-8 text-lg top-12 max-w-xl geologica-200"}>
                                Touristique разом з іншими підприємцями та
                                компаніями по всьому
                                світу <a href={"https://pledge1percent.org/"}>взяли на себе зобов’язання благодійницьких зусиль,
                                пожертвувавши 1% </a> свого капіталу, часу, продукту та прибутку
                                для покращення наших спільнот.</p>
                        </div>
                        <div className={"z-0"}>
                            <Image src={"/images/about-us/GroupAbout1.png.webp"} alt={"our photo"} width={"700"} height={"400"}
                                   className={"relative left-1/4 top-32 z-10"}></Image>
                        </div>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <Image src={"/images/about-us/global-pledge.png"} width={"1000"} height={"400"} alt={"global pledge logo"}
                               className={"relative bottom-48 z-10 horisontal-image"}></Image>
                    </div>
                </div>
                <div className={"mb-10"}>
                    <div className={"rounded-xl flex Contact-Us-Widget px-32 mx-72 "}>
                        <div>
                            <h1 className={"pt-20 text-2xl font-bold text-white geologica-300"}>
                                Приєднуйся до нашої команди!
                            </h1>
                            <p className={"max-w-xl mt-10 text-white geologica-200"}>
                                Створюй унікальні подорожі, змінюючи підхід до
                                організації відпочинку та надаючи нашим клієнтам можливість легко
                                планувати, керувати та насолоджуватися своїми подорожами.
                            </p>
                            <button className={"mb-20 mt-10 geologica-200"} onClick={Redirect}>
                                Повідомте нас !
                            </button>
                        </div>
                        <div className={"flex"}>
                            <Image src={"/images/about-us/Customer-4.png.webp"} className={"relative left-72 z-10"} width={"400"} height={"800"} ></Image>
                            <Image src={"/images/about-us/GroupAbout1.png.webp"} width={"500"} height={"400"} className={"rotate-90 rotate-45 scale-150 -left-96 z-0"}></Image>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}