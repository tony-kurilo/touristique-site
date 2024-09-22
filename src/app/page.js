import Image from 'next/image';

export default function Home() {
    return (
    <body>
        <header>
            <nav className="flex items-center justify-between">
                <div className="flex items-center m-10 px-6">
                    <Image className="" src={"/icons/earth.png"} alt={"Earth icon"} width={"66"} height={"66"} ></Image>
                </div>
                <div className="flex items-center justify-between ">
                    <a className={"m-4"} href={"#"}>Пункти призначення</a>
                    <a className={"m-4"} href={"#"}>Блог</a>
                    <a className={"m-4"} href={"#"}>Про нас</a>
                    <a className={"m-4"} href={"#"}>Зв'яжіться з нами</a>
                    <Image src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={"33"} height={"33"}></Image>
                    <Image src={"/icons/account_white.png"} alt={"Account icon"} width={"33"} height={"33"}></Image>
                </div>
                <div className="flex items-center m-10">
                    <Image src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={"33"} height={"33"}></Image>
                    <Image src={"/icons/account_white.png"} alt={"Account icon"} width={"33"} height={"33"}></Image>
                </div>
            </nav>
        </header>
    </body>
    );
}
