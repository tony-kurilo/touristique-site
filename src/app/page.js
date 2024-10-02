import Image from 'next/image';
import VideoBackground from './components/VideoBackground';
import ImageCarousel from "./components/ImageCarousel";
import ClientTestimonials from "@/app/components/ClientTestimonials";

export default function Home() {
    return (
    <body>
        <VideoBackground/>
        <header className="absolute top-0 left-0 w-full bg-opacity-10 z-10">
            <nav className="flex items-center justify-between">
                <div className="flex items-center m-10 px-6">
                    <Image className="" src={"/icons/earth.png"} alt={"Earth icon"} width={"66"} height={"66"}></Image>
                </div>
                <div className="flex items-center">
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"/search"}>Пункти призначення</a>
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Блог</a>
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Про нас</a>
                    <a className={"m-4 pb-1 text-xl text-outline"} href={"#"}>Зв'яжіться з нами</a>
                </div>
                <div className="flex items-center m-10 pr-10">
                    <a href="/basket">
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={"33"}
                               height={"33"}></Image>
                    </a>
                    <a href="/my-profile">
                        <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Whishlist icon"} width={"37"}
                               height={"37"}></Image>
                    </a>
                </div>
            </nav>
        </header>
        <main>
            <div className="flex items-center">
                <Image className={"relative top-32 left-80 z-10"} src={"/images/plains.png"} alt={"plains"}
                       width={"678"} height={"675"}></Image>
                <article className={"relative left-96 w-96"}>
                    <section>Magical memories, <br></br> Bespoke experiences</section>
                    <br></br>
                    <section className={"mt-3"}>Once you have travelled the voyage never ends. Adams & Butler will open
                        a world of wonders and
                        create magical memories that will stay with you far beyond your travels.
                    </section>

                    <section className={"mt-3"}>Diverge from the
                        typical tourist destinations in favour of unique, authentic experiences. Experiences designed in
                        the most inspiring surroundings that will be yours, and yours only. Journeys that create
                        memorable moments and Adams & Butler’s bespoke itineraries will make this happen. The wonders of
                        the world are within your reach.
                    </section>
                </article>
                <Image className={"relative -top-100 right-80 z-0 "} src={"/images/elephants.png"} width={"696"}
                       height={"403"}></Image>
            </div>
            <div className={"bg-gray-100 mt-36"}>
                <article className={"ml-96 pb-72 pt-80 flex items-center"}>
                    <section className={"pl-2 text-3xl"}>Tailor Made Journeys</section>
                    <br></br>
                    <section className={"pl-16 w-100"}>
                        <section className={"text-xl"}>
                            A&B design itineraries for our clients that others simply cannot,
                            whether around a theme or a private experience. Our team of highly
                            experienced consultants listen, understand and then create a tailor-made journey for you.
                            We believe that travel should not only enrich your perception, understanding,
                            and appreciation of the World, but that it should also allow you to support
                            the local communities you visit. We enable you to explore with purpose, enthusiasm,
                            and a new-found appreciation for the art of travel. Experience diverse cultures;
                            immerse yourself in authentic experiences; take back the moment and reconnect with a
                            joyous attitude towards life.
                        </section>
                        <section className={"mt-5 text-2xl underline"}>
                            <a href={"#"}>Наші путівки</a>
                        </section>
                    </section>
                </article>
            </div>
            <div className={"pl-96 relative -top-48"}>
                <ImageCarousel/>
            </div>
            <div>
                <article className={"text-3xl mb-10 relative left-44"}>News & Press</article>
                <div className={"flex justify-center "}>
                    <div
                        className={"ml-1 w-[507px] h-[527px] border border-gray-300 shadow-2xl "}> {/* Задайте фиксированную ширину */}
                        <Image src={"/images/castle.png"} width={"507"} height={"338"}/>
                        <p className={"w-full h-[189px] overflow-hidden text-ellipsis mt-4 ml-4 pb-10 pr-4 whitespace-normal"}>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div
                        className={"ml-10 mr-10 w-[507px] h-[527px] border border-gray-300 shadow-2xl"}> {/* Задайте фиксированную ширину */}
                        <Image src={"/images/castle.png"} width={"507"} height={"338"}/>
                        <p className={"w-full h-[189px] pt-4 pl-4 pr-4 text-xl overflow-hidden text-ellipsis whitespace-normal "}>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div
                        className={"mr-1 w-[507px] h-[527px] border border-gray-300 shadow-2xl "}> {/* Задайте фиксированную ширину */}
                        <Image src={"/images/castle.png"} width={"507"} height={"338"}/>
                        <p className={"w-full h-[189px] overflow-hidden text-ellipsis mt-4 ml-4 pb-10 pr-4 whitespace-normal"}>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <blockquote>
                    <ClientTestimonials/>
                </blockquote>
            </div>
        </main>
        <footer className={"mt-1"}>
            <div className={"mb-96 bg-gray-900 "}>
                <div>
                    <p className={"text-white"}>
                        asdasdasdsaaaaaaaaaaaaa
                    </p>
                </div>
            </div>
        </footer>
    </body>
    );
}
