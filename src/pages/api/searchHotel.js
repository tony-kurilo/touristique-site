// pages/api/hotels.js

import pool from '../../app/database/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect(); // Установить соединение с базой данных
            const result = await client.query('SELECT * FROM hotels'); // Запрос к базе данных
            res.status(200).json(result.rows); // Отправка данных в формате JSON
        } catch (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            res.status(500).json({ error: 'Ошибка при получении данных' });
        } finally {
            if (client) client.release(); // Закрытие соединения в любом случае
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
