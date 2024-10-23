import Link from 'next/link';
import Image from "next/image";
import "../../styles/blog.css";

const Grid3 = ({ articleIds,articles }) => (
    <div className="grid-block-2 mx-10">
        {articleIds.map(id => {
            const article = articles.find(article => article.id === id);
            return article ? (
                <div key={article.id} className="news-item">
                    <Link href={`/blog/${article.id}`}>
                        <Image src={article.img} width={400} height={200} alt={article.title}/>
                        <div className="flex justify-between mx-4 my-2">
                            <p>{article.type}</p>
                            <p>{article.date}</p>
                        </div>
                        <div className="mx-4">
                            <p className="text-xl">{article.title}</p>
                        </div>
                    </Link>
                </div>
            ) : null;
        })}
    </div>
);

export default Grid3;
