import bcrypt from 'bcrypt';
import pool from '../../app/database/db';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Секретный ключ для JWT

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        try {
            // Проверяем, существует ли пользователь с таким email
            const emailCheckResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
            if (emailCheckResult.rows.length > 0) {
                return res.status(400).json({ message: 'Користувач з таким e-mail вже існує' });
            }

            // Хэшируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);

            // Добавляем пользователя в базу данных
            const result = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
                [username, email, hashedPassword]
            );

            const userId = result.rows[0].id;

            // Генерируем JWT токен
            const token = jwt.sign({ id: userId, username, email }, secretKey, { expiresIn: '1h' });

            // Отправляем токен клиенту
            res.status(201).json({ message: 'Реєстрація успішна', token });
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            res.status(500).json({ message: 'Серверна помилка' });
        }
    } else {
        res.status(405).json({ message: 'Метод не дозволено' });
    }
}
