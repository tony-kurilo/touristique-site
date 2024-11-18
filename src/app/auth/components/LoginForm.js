
import React, { useState } from 'react';
import {useRouter} from "next/navigation"; // Укажите правильный путь к вашему JSON

const secretKey = 'your_secret_key'; // Секретный ключ для генерации токена (должен быть безопасно храним)

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Для отображения ошибки
    const [loading, setLoading] = useState(false); // Состояние загрузки
    const router = useRouter(); // Инициализация useRouter

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(''); // Сбрасываем ошибки перед запросом
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;  // Получаем токен из ответа

                if (!token) {
                    setErrorMessage('Ошибка: токен не получен');
                    return;
                }

                // Сохраняем токен в localStorage (или sessionStorage)
                localStorage.setItem('jwt', token);

                router.push('/my-profile');  // Перенаправляем на личный кабинет
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ошибка входа');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setErrorMessage('Ошибка сервера, попробуйте позже.');
        } finally {
            setLoading(false);
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

            {errorMessage && (
                <div className="mb-4 text-red-500">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
                }`}
                disabled={loading}
            >
                {loading ? 'Загрузка...' : 'Підтвердити'}
            </button>
        </form>
    );
};

export default LoginForm;
