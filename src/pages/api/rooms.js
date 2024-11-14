import pool from '../../app/database/db';

export default async function handler(req, res) {
    const { hotel_id } = req.query;

    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect();

            // Выполняем запрос для получения данных комнат по hotel_id
            const result = await client.query('SELECT * FROM rooms WHERE hotel_id = $1', [hotel_id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Комнаты не найдены для данного отеля' });
            }

            res.status(200).json({ rooms: result.rows }); // Возвращаем список комнат
        } catch (error) {
            console.error('Ошибка при получении данных комнат:', error);
            res.status(500).json({ error: 'Ошибка при получении данных комнат' });
        } finally {
            if (client) client.release();
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
