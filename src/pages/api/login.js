import pool from '../../app/database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Секретный ключ

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Проверяем пользователя по email
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Користувача не знайдено' });
            }

            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Невірний e-mail чи пароль' });
            }

            // Генерация JWT токена
            const token = jwt.sign({ email: user.email, id: user.id }, secretKey, { expiresIn: '1h' });

            // Установка httpOnly cookie
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure`);

            res.status(200).json({ message: 'Успешный вход в систему' });
        } catch (error) {
            console.error('Ошибка сервера:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    } else {
        res.status(405).json({ message: 'Метод не поддерживается' });
    }
}
