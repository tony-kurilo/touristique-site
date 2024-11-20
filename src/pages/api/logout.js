export default function handler(req, res) {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', [
            `accessToken=; HttpOnly; Path=/; Max-Age=0; Secure`,
            `refreshToken=; HttpOnly; Path=/; Max-Age=0; Secure`,
        ]);
        return res.status(200).json({ message: 'Вы вышли из системы' });
    }

    return res.status(405).json({ message: 'Метод не поддерживается' });
}
