import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export function authenticate(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Не авторизован' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Добавляем информацию о пользователе в запрос
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Токен недійсний' });
    }
}
