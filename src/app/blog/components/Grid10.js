import "../../styles/blog.css";
import Link from "next/link";
import Image from "next/image";

const Grid10 = ({ sortedArticles }) => {
    if (!sortedArticles || sortedArticles.length === 0) {
        return null; // Если статьи не найдены, ничего не отображаем
    }

    return (
        <div className={"grid-container"}>
            <div className="grid-1 mx-10">
                <div className="news-item">
                    <Link href={`/blog/${sortedArticles[0].id}`}>
                        <div className={"m-10 border"}>
                            <Image src={sortedArticles[0].img} width={400} height={200} alt={sortedArticles[0].title} />
                            <div className="justify-between mx-4 my-2">
                                <p>{sortedArticles[0].type}</p>
                                <p>{sortedArticles[0].date}</p>
                            </div>
                            <div className="mx-4">
                                <p className="text-xl news-title">{sortedArticles[0].title}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {[4, 3, 2].map((count, index) => (
                <div key={index} className={`grid-${count} mx-10`}>
                    {sortedArticles.slice(1, 1 + count).map(article => (
                        <div key={article.id} className="news-item">
                            <Link href={`/blog/${article.id}`}>
                                <Image src={article.img} width={400} height={200} alt={article.title} />
                                <div className="flex justify-between mx-4 my-2">
                                    <p>{article.type}</p>
                                    <p>{article.date}</p>
                                </div>
                                <div className="mx-4">
                                    <p className="text-xl">{article.title}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid10;