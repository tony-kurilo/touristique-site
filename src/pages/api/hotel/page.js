import pool from '../../../app/database/db'; // Убедитесь, что путь правильный

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = 'SELECT id FROM hotels'; // Запрос для получения ID отелей
            const result = await pool.query(query);
            res.status(200).json(result.rows); // Возвращаем массив объектов с ID отелей
        } catch (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: 'Метод не разрешен' });
    }
}
