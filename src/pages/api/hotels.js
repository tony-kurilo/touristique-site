import pool from '../../app/database/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect();

            // Выполняем запрос для получения ID всех отелей
            const result = await client.query('SELECT id FROM hotels');
            const hotelIds = result.rows.map((hotel) => ({
                id: hotel.id.toString(),
            }));

            res.status(200).json(hotelIds); // Возвращаем список ID отелей
        } catch (error) {
            console.error('Ошибка при получении ID отелей:', error);
            res.status(500).json({ error: 'Ошибка при получении данных api/hotels.js' });
        } finally {
            if (client) client.release();
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
