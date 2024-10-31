import Link from 'next/link';
import Image from "next/image";
import "../styles/blog.css"
import fs from 'fs';
import path from 'path';
import Grid10 from './components/Grid10';

async function fetchArticles() {
    const filePath = path.join(process.cwd(), 'public', 'database', 'news.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
}
export default async function BlogPage() {

    const articles = await fetchArticles(); // Fetching data asynchronously
    const sortedArticles = articles.sort((a, b) => b.id - a.id);

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
            </div>
            <div className={"news-back"}>
                    <Grid10 sortedArticles={sortedArticles}></Grid10>
            </div>
        </div>
    );
};


