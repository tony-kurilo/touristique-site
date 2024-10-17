import Link from 'next/link';

const BlogPage = () => {
    const articles = [
        { id: 1, title: 'Первая новость' },
        { id: 2, title: 'Вторая новость' },
        // Другие статьи
    ];

    return (
        <div>
            <h1>Новости</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <Link href={`/blog/${article.id}`}>
                            {article.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;
