import pool from '../../../app/database/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query('SELECT * FROM articles WHERE id = $1', [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Новина не знайдена' });
            }

            res.status(200).json({ article: result.rows[0] });
        } catch (error) {
            console.error('Помилка при отриманні новини:', error);
            res.status(500).json({ error: 'Помилка сервера' });
        } finally {
            if (client) client.release();
        }
    } else {
        res.status(405).json({ error: 'Метод не дозволений' });
    }
}
