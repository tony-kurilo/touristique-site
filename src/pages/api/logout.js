export default function handler(req, res) {
    if (req.method === 'POST') {
        // Устанавливаем cookie с истекшим сроком действия для удаления токена
        res.setHeader('Set-Cookie', 'jwt=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
        return res.status(200).json({ message: 'Вы вышли из системы' });
    }

    return res.status(405).json({ message: 'Метод не поддерживается' });
}
