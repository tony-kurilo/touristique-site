
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
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('authToken', token);
                console.log('Успешный вход!');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ошибка входа');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setErrorMessage('Ошибка сервера, попробуйте позже.');
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
