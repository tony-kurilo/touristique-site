import Image from "next/image";

export default function Footer() {
    return (
        <div className={"bg-neutral-800 text-white pt-12 pb-8"}>
            <div className={"flex items-center justify-center"}>
                <div className={"flex flex-col items-center justify-center geologica-200 text-lg"}>
                    <a href={"/"} className={"pb-4"}>Головна</a>
                    <a href={"/search"} className={"pb-4"}>Пошук турів</a>
                    <a href={"/blog"} className={"pb-4"}>Блог</a>
                    <a href={"/about-us"} className={"pb-4"}>Про нас</a>
                    <a href={"/contact-us"} className={""}>Зв&apos;яжіться з нами</a>
                </div>
                <div className={"flex flex-col items-center justify-center mx-80 geologica-200 text-lg"}>
                    <div className={"flex flex-col items-center justify-center mb-10"}>
                        <p>Зателефонуйте нам !</p>
                        <p>+(380) 662135476</p>
                    </div>
                    <div className={"flex flex-col items-center justify-center"}>
                        <p>Напишіть нам на пошту !</p>
                        <p>message@touristique.com</p>
                    </div>
                </div>
                <div className={"geologica-200 text-lg"}>
                    <div className={"flex flex-col items-center justify-center "}>
                        <p>Відгуки про нас</p>
                        <a href={"https://uk.trustpilot.com/"} className={"trust-pilot"}>
                            <Image src={"/images/trustpilot.png"} width={"120"} height={"60"}></Image>
                        </a>
                    </div>
                    <div className={"flex flex-col items-center justify-center"}>
                        <p className={"mt-10"}>Наші соцмережі!</p>
                        <div className={"flex"}>
                            <a href={"https://www.instagram.com/"}>
                                <Image src={"/icons/insta.png"} width={"40"} height={"40"}></Image>
                            </a>
                            <a href={"https://www.facebook.com/"} className={"mx-4"}>
                                <Image src={"/icons/facebook.png"} width={"40"} height={"40"}></Image>
                            </a>
                            <a href={"https://ua.linkedin.com/"}>
                                <Image src={"/icons/linkedin.webp"} width={"40"} height={"40"}></Image>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"geologica-200 text-lg flex justify-center items-center mt-10 underline"}>
                <a href={"https://docs.google.com/document/d/1poEtXq-bQtPKqZmIYdH2TiFbDd1Ibxr4iIL1bej0NaQ/edit?usp=sharing"}>
                    Terms
                </a>
                <a href={"https://docs.google.com/document/d/1ynisa-kzLp-cENGELj9VOenNJceNgrt1NTUuyOyNqlo/edit?usp=sharing"}
                className={"mx-10"}>
                    Privacy Policy
                </a>
                <a href={"https://docs.google.com/document/d/1fnpq3GyE5oK3Xiq-HhC_5Ft9akQC-dDi6spzu7bPqw8/edit?usp=sharing"}>
                    Cookies Policy
                </a>
            </div>
        </div>
    );
}