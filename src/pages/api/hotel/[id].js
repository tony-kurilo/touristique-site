import pool from '../../../app/database/db'; // Убедитесь, что путь правильный

export default async function handler(req, res) {
    const { id } = req.query; // Получаем id отеля из параметров запроса

    if (req.method === 'GET') {
        try {
            // Выполняем запрос к базе данных
            const hotelQuery = 'SELECT * FROM hotels WHERE id = $1';
            const hotelResult = await pool.query(hotelQuery, [id]);

            if (hotelResult.rows.length > 0) {
                return res.status(200).json(hotelResult.rows[0]); // Возвращаем данные отеля
            } else {
                return res.status(404).json({ message: 'Отель не знайдено!' });
            }
        } catch (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: 'Метод не разрешен' });
    }
}
