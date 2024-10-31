// register.js
import bcrypt from 'bcrypt';
import pool from '../../app/database/db'; // Убедитесь, что путь правильный

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        try {
            // Проверяем, существует ли пользователь с таким email
            const emailCheckQuery = `SELECT id FROM users WHERE email = $1`;
            const emailCheckResult = await pool.query(emailCheckQuery, [email]);

            if (emailCheckResult.rows.length > 0) {
                // Если существует, возвращаем ошибку
                return res.status(400).json({ message: 'Користувач з таким e-mail вже існує' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`;
            const values = [username, email, hashedPassword];

            const result = await pool.query(query, values);

            res.status(201).json({ message: 'Пользователь успешно зарегистрирован', userId: result.rows[0].id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
