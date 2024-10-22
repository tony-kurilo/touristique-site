import Link from 'next/link';
import Image from "next/image";
import "../styles/globals.css"
const BlogPage = () => {
    const articles = [
        { id: 1, title: 'ASDDDDDDDDDDDDDDDDDDDDDDDDDDD', img:'/images/castle.png', date:"13.09.2024", type:"Новина", content:"Lorem iLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis pellentesque justo. Pellentesque eros leo, suscipit eget mi in, fermentum elementum eros. Nulla feugiat augue nibh, non tempor dolor maximus eu. Cras ut scelerisque lectus, quis suscipit ipsum. Curabitur eros lorem, ullamcorper vel condimentum ac, ultricies pulvinar purus. Praesent vitae urna tellus. Morbi porttitor condimentum felis eu tincidunt. Curabitur dapibus sed leo at vestibulum. Quisque in sem porta, aliquam turpis eget, ultrices ipsum. In condimentum mauris a arcu scelerisque scelerisque. Pellentesque gravida facilisis ante in ullamcorper. Vivamus malesuada hendrerit est at efficitur. Aliquam ullamcorper vulputate felis, a suscipit ligula interdum in. Integer eleifend diam nec iaculis bibendum. Phasellus sit amet condimentum lacus. Morbi fermentum pellentesque viverra.\n" +
                "\npsum"},
        { id: 2, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 3, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 4, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 5, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 6, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 7, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 8, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 9, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},
        { id: 10, title: 'Вторая новость', img:'/images/contact-us.png', date:"15.09.2024", type:"Акція"},


        // Другие статьи
    ];

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
            <div>
                <h1 className={"text-3xl relative flex items-center justify-center mt-10"}>Новини та акції</h1>
                <div className="grid-container">
                    {/* Block 1: Four news items */}
                    <div className="grid-block-1">
                        {articles.slice(0, 4).map(article => (
                            <div key={article.id} className="news-item">
                                <Link href={`/blog/${article.id}`}>
                                    <Image src={article.img} width={400} height={200}/>
                                    <div className="flex justify-between mx-4 my-2">
                                        <p>{article.type}</p>
                                        <p>{article.date}</p>
                                    </div>
                                    <div className="mx-4">
                                        <p className="text-xl">{article.title}</p>
                                        <p className="mt-2">{article.content}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Block 2: Three news items */}
                    <div className="grid-block-2">
                        {articles.slice(4, 7).map(article => (
                            <div key={article.id} className="news-item">
                                <Link href={`/blog/${article.id}`}>
                                    <Image src={article.img} width={400} height={200}/>
                                    <div className="flex justify-between mx-4 my-2">
                                        <p>{article.type}</p>
                                        <p>{article.date}</p>
                                    </div>
                                    <div className="mx-4">
                                        <p className="text-xl">{article.title}</p>
                                        <p className="mt-2">{article.content}</p>
                                    </div>
                                </Link>                            </div>
                        ))}
                    </div>

                    {/* Block 3: Two news items */}
                    <div className="grid-block-3">
                        {articles.slice(7, 9).map(article => (
                            <div key={article.id} className="news-item">
                                <Link href={`/blog/${article.id}`}>
                                    <Image src={article.img} width={400} height={200}/>
                                    <div className="flex justify-between mx-4 my-2">
                                        <p>{article.type}</p>
                                        <p>{article.date}</p>
                                    </div>
                                    <div className="mx-4">
                                        <p className="text-xl">{article.title}</p>
                                        <p className="mt-2">{article.content}</p>
                                    </div>
                                </Link>                            </div>
                        ))}
                    </div>

                    {/* Block 4: One news item */}
                    <div className="grid-block-4">
                        {articles.slice(9, 10).map(article => (
                            <div key={article.id} className="flex news-item">
                                <Link href={`/blog/${article.id}`}>
                                    <div>
                                        <Image src={article.img} width={400} height={200}/>
                                    </div>
                                    <div className="flex justify-between mx-4 my-2">
                                        <p>{article.type}</p>
                                        <p>{article.date}</p>
                                    </div>
                                    <div className="mx-4">
                                        <p className="text-xl">{article.title}</p>
                                        <p className="mt-2">{article.content}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
