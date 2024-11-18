import pool from '../../app/database/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect();

            // Выполняем запрос для получения данных статей
            const result = await client.query(`
                SELECT 
                    id, 
                    title, 
                    text,
                    type,
                    date, 
                    images::jsonb AS images
                FROM articles
            `);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Не знайдено новин' });
            }

            // Обрабатываем каждую статью
            const articles = result.rows.map(article => ({
                ...article,
                images: Array.isArray(article.images) ? article.images : [], // Убедимся, что это массив
            }));

            res.status(200).json({articles});
        } catch (error) {
            console.error('Помилка при отриманні новин:', error);
            res.status(500).json({ error: 'Помилка при отриманні даних про новини' });
        } finally {
            if (client) client.release();
        }
    } else {
        res.status(405).json({ error: 'Метод не дозволений' });
    }
}
