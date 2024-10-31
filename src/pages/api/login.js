// src/app/api/login.js
import pool from '@/app/database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Неправильный пароль' });
      }

      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Ошибка сервера:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
