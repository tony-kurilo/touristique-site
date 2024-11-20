import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export default function handler(req, res) {
    const token = req.cookies.accessToken; // Получаем accessToken из cookie

    if (!token) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    try {
        // Проверяем токен
        jwt.verify(token, secretKey);
        res.status(200).json({ valid: true });
    } catch (error) {
        res.status(401).json({ message: 'Неверный или истекший токен' });
    }
}
