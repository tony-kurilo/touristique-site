import Link from 'next/link';
import Image from "next/image";
import "../../styles/blog.css";


const Grid1 = ({ articleIds, articles }) => {
    // Находим статью на основе первого id из articleIds
    const article = articles.find(article => article.id === articleIds[0]);

    if (!article) {
        return null; // Если статья не найдена, ничего не отображаем
    }

    return (
        <div className="grid-block-4 mx-10">
            <div className=" news-item-1news">
                <Link href={`/blog/${article.id}`}>
                    <div className={" m-10 border "}>
                        <Image src={article.img} width={400} height={200}/>
                        <div className=" justify-between mx-4 my-2">
                            <p>{article.type}</p>
                            <p>{article.date}</p>
                        </div>
                        <div className="mx-4">
                            <p className="text-xl news-title">{article.title}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Grid1;
