import pool from '../../app/database/db';  // Подключение к базе данных

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;  // Получаем данные из тела запроса

        // Проверяем, что все необходимые данные присутствуют
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }

        try {
            // Получаем максимальный id из таблицы
            const maxIdResult = await pool.query('SELECT MAX(id) AS max_id FROM messages');
            const maxId = maxIdResult.rows[0].max_id || 0; // Если таблица пуста, то начнём с 0

            const newId = maxId + 1; // Увеличиваем id на 1

            // Вставляем новые данные с увеличенным id
            const result = await pool.query(
                'INSERT INTO messages (id, name, email, message) VALUES ($1, $2, $3, $4)',
                [newId, name, email, message]
            );

            res.status(201).json({
                message: 'Сообщение успешно отправлено',
                id: newId,  // Возвращаем новый id
            });
        } catch (error) {
            console.error('Ошибка при вставке данных в базу:', error);
            res.status(500).json({ message: 'Произошла ошибка при отправке сообщения' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
