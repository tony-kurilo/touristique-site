import pool from '../../app/database/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;
        try {
            client = await pool.connect(); // Подключаемся к базе данных

            // Получаем параметры фильтрации из запроса
            const { country, city, priceFrom, priceTo, adults, children, dateFrom, dateTo, nightsFrom, nightsTo, roomType } = req.query;

            // Базовый запрос и массив для хранения значений параметров
            let query = 'SELECT * FROM vouchers WHERE 1=1'; // Мы работаем с таблицей vouchers
            const values = [];

            // Добавляем условия фильтрации к запросу и добавляем значения в массив values
            if (country) {
                query += ' AND LOWER(hotel_country) = LOWER($1)';
                values.push(country);
            }
            if (city) {
                query += ` AND LOWER(hotel_city) = LOWER($${values.length + 1})`;
                values.push(city);
            }
            if (priceFrom) {
                query += ` AND price_per_night >= $${values.length + 1}`;
                values.push(priceFrom);
            }
            if (priceTo) {
                query += ` AND price_per_night <= $${values.length + 1}`;
                values.push(priceTo);
            }
            if (adults) {
                query += ` AND max_occupancy >= $${values.length + 1}`;
                values.push(adults);
            }
            if (children) {
                query += ` AND max_children >= $${values.length + 1}`;
                values.push(children);
            }
            if (dateFrom) {
                query += ` AND date_from >= $${values.length + 1}`;
                values.push(dateFrom);
            }
            if (dateTo) {
                query += ` AND date_from <= $${values.length + 1}`;
                values.push(dateTo);
            }
            if (nightsFrom) {
                query += ` AND (date_to - date_from) >= $${values.length + 1}`;
                values.push(nightsFrom);
            }
            if (nightsTo) {
                query += ` AND (date_to - date_from) <= $${values.length + 1}`;
                values.push(nightsTo);
            }
            if (roomType) {
                query += ` AND LOWER(room_type) = LOWER($${values.length + 1})`;
                values.push(roomType);
            }

            // Выполняем запрос с фильтрацией
            const result = await client.query(query, values);
            res.status(200).json(result.rows); // Возвращаем отфильтрованные данные
        } catch (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            res.status(500).json({ error: 'Ошибка при получении данных' });
        } finally {
            if (client) client.release(); // Закрытие соединения
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
