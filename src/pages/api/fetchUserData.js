import jwt from "jsonwebtoken";
import pool from "../../app/database/db";

const secretKey = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method === "GET") {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Токен отсутствует" });
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            const { email } = decoded;

            const result = await pool.query("SELECT email, username FROM users WHERE email = $1", [email]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            const user = result.rows[0];
            res.status(200).json({ email: user.email, username: user.username });
        } catch (error) {
            console.error("Ошибка авторизации:", error);
            res.status(403).json({ message: "Недействительный токен" });
        }
    } else {
        res.status(405).json({ message: "Метод не поддерживается" });
    }
}
