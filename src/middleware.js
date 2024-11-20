import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';  // Укажите ваш секретный ключ

export function middleware(req) {
    const accessToken = req.cookies.accessToken; // Получаем токен из cookies

    if (accessToken) {
        try {
            // Попытка декодировать и проверить токен
            jwt.verify(accessToken, secretKey);

            // Если токен валидный, перенаправляем на страницу профиля
            return NextResponse.redirect(new URL('/my-profile', req.url));
        } catch (error) {
            console.error('Токен недействителен или истёк:', error);
        }
    }

    // Если токен отсутствует или он невалидный, продолжаем выполнение запроса и показываем страницу авторизации
    return NextResponse.next();
}

// Применяем middleware к нужным страницам
export const config = {
    matcher: ['/auth'],  // middleware будет работать для всех страниц, начинающихся с /auth
};
