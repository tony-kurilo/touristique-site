import jwt from 'jsonwebtoken';
import users from '/public/database/users.json';// Файл с вашими данными пользователей

const secretKey = 'your_secret_key'; // Секретный ключ для генерации токена

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Ищем пользователя в "базе данных" (в данном случае в JSON файле)
        const user = users.find((u) => u.email === email);

        if (user && user.password === password) {
            // Генерируем токен
            const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

            // Отправляем токен в ответе
            return res.status(200).json({ token });
        } else {
            // Если не удалось найти пользователя или пароль не совпал
            return res.status(401).json({ message: 'Неправильный email или пароль' });
        }
    } else {
        // Метод не поддерживается
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
