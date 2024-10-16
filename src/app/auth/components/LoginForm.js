import React, { useState } from 'react';
import {router} from "next/client"; // Укажите правильный путь к вашему JSON

const secretKey = 'your_secret_key'; // Секретный ключ для генерации токена (должен быть безопасно храним)

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Для отображения ошибки


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('src/app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;

                // Сохраняем токен в localStorage
                localStorage.setItem('authToken', token);

                // Дополнительные действия, например, редирект пользователя
                console.log('Успешный вход! Токен:', token);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
            setErrorMessage('Ошибка входа, попробуйте позже.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-100">
                    Пароль
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {errorMessage  && (
                <div className="mb-4 text-red-500">
                    {errorMessage }
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
            >
                Підтвердити
            </button>
        </form>
    );
};

export default LoginForm;
