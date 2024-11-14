import pool from '../../../app/database/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect();

            // Выполняем запрос для получения данных отеля по ID
            const result = await client.query('SELECT * FROM hotels WHERE id = $1', [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Отель не найден' });
            }

            res.status(200).json(result.rows[0]); // Возвращаем данные отеля
        } catch (error) {
            console.error('Ошибка при получении данных отеля:', error);
            res.status(500).json({ error: 'Ошибка при получении данных в файле api/hotels/[id].js' });
        } finally {
            if (client) client.release();
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
