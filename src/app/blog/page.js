import Link from 'next/link';
import Image from "next/image";
import "../styles/blog.css"
import fs from 'fs';
import path from 'path';
import Grid1 from './components/Grid1';
import Grid2 from './components/Grid2';
import Grid3 from './components/Grid3';
import Grid4 from './components/Grid4';

async function fetchArticles() {
    const filePath = path.join(process.cwd(), 'public', 'database', 'news.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
}

// Список доступных гридов
const gridComponents = [Grid1, Grid2, Grid3, Grid4];

export default async function BlogPage() {

    const articles = await fetchArticles(); // Fetching data asynchronously
    const sortedArticles = articles.sort((a, b) => b.id - a.id);

    const renderArticles = () => {
        const elements = [];

        // Находим последний элемент по id
        const lastArticle = articles.reduce((prev, current) => {
            return (prev.id > current.id) ? prev : current;
        });

        // Первой строкой всегда Grid1 с последней новостью
        elements.push(<Grid1 key={lastArticle.id} articleIds={[lastArticle.id]} articles={sortedArticles} />);

        // Удаляем последний элемент из списка статей
        let remainingArticles = articles.filter(article => article.id !== lastArticle.id);

        // Генерация оставшихся гридов
        let lastGridIndex = -1; // Индекс последнего использованного грида
        let i = 0; // Индекс для цикла

        while (i < remainingArticles.length) {
            let gridIndex;
            let articlesForGrid = [];

            // Выбор случайного грида, который не повторяет предыдущий
            do {
                gridIndex = Math.floor(Math.random() * gridComponents.length);
            } while (gridIndex === lastGridIndex);

            const GridComponent = gridComponents[gridIndex];
            const remainingCount = remainingArticles.length - i;

            // Определение количества статей для каждого грида
            if (remainingCount >= 4 && (gridIndex === 1 || gridIndex === 3)) {
                // Используем Grid с 4 статьями
                articlesForGrid = remainingArticles.slice(i, i + 4).map(article => article.id);
                i += 4;
            } else if (remainingCount >= 3 && gridIndex === 2) {
                // Используем Grid с 3 статьями
                articlesForGrid = remainingArticles.slice(i, i + 3).map(article => article.id);
                i += 3;
            } else if (remainingCount >= 2 && gridIndex === 2) {
                // Используем Grid с 2 статьями
                articlesForGrid = remainingArticles.slice(i, i + 2).map(article => article.id);
                i += 2;
            } else {
                // Используем Grid с 1 статьей (если осталась только 1 статья)
                articlesForGrid = [remainingArticles[i].id];
                i += 1;
            }

            elements.push(<GridComponent key={gridIndex + i} articleIds={articlesForGrid} articles={sortedArticles} />);
            lastGridIndex = gridIndex; // Обновление индекса последнего использованного грида
        }

        return elements;
    };

    return (
        <div>
            <div className="w-full bg-neutral-900 object-cover" style={{
                backgroundImage: `url('/images/search-background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 h-[146px] bg-black opacity-30"></div>
                <nav className="relative flex items-center justify-between z-10">
                    <div className="flex items-center m-10 px-6">
                        <a href="/">
                            <Image src="/icons/earth.png" alt="Earth icon" width={66} height={66}/>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a className={"m-4 pb-1 text-xl navbar-a-animation"} href={"/search"}>Пункти призначення</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation"} href={"/blog"}>Блог</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation"} href={"/about-us"}>Про нас</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation"} href={"/contact-us"}>Зв&apos;яжіться з
                            нами</a>
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
                <h1 className={"text-3xl relative flex items-center justify-center "}>Новини та акції</h1>
            </div>
            <div className={"news-back"}>
                <div className="grid-container">
                    {renderArticles()}
                </div>
            </div>
        </div>
    );
};


