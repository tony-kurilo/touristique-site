import pool from '../../app/database/db';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';
const refreshSecretKey = 'your_refresh_secret_key';

export default async function refreshHandler(req, res) {
    if (req.method === 'POST') {
        const { refreshToken } = req.cookies; // Извлекаем refreshToken из cookies

        if (!refreshToken) {
            return res.status(401).json({ message: 'RefreshToken отсутствует' });
        }

        try {
            // Проверяем валидность refreshToken
            const decoded = jwt.verify(refreshToken, refreshSecretKey);

            // Проверяем, что токен есть в базе
            const result = await pool.query('SELECT * FROM users WHERE id = $1 AND refresh_token = $2', [
                decoded.id,
                refreshToken,
            ]);

            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Невалидный refreshToken' });
            }

            // Генерируем новый accessToken
            const accessToken = jwt.sign({ email: decoded.email, id: decoded.id }, secretKey, { expiresIn: '1h' });

            // Устанавливаем новый accessToken
            res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600; Secure`);

            res.status(200).json({ message: 'Токены обновлены' });
        } catch (error) {
            console.error('Ошибка при обновлении токенов:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'RefreshToken истек' });
            }
            res.status(403).json({ message: 'RefreshToken недействителен' });
        }
    } else {
        res.status(405).json({ message: 'Метод не поддерживается' });
    }
}
