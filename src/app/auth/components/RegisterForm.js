import React, { useState } from 'react';
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false); // для отображения пароля

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        if (!username) {
            return 'Логін обов’язковий';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'E-mail обов’язковий';
        }
        if (!emailPattern.test(email)) {
            return 'Введіть коректний e-mail';
        }
        if (!password) {
            return 'Пароль обов’язковий';
        }
        if (password.length < 6) {
            return 'Пароль повинен бути не менше 6 символів';
        }
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Реєстрація успішна! Перенаправлення...');

                // Сохраняем токен в localStorage
                if (data.token) {
                    localStorage.setItem('jwt', data.token); // Сохраняем токен в localStorage
                }

                // Перенаправляем пользователя на страницу профиля
                setTimeout(() => router.push('/my-profile'), 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Помилка реєстрації.');
            }
        } catch (error) {
            console.error('Помилка реєстрації:', error);
            setErrorMessage('Серверна помилка, спробуйте пізніше.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleRegister}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-100">Ім'я користувача</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-100">Пароль</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-sm text-gray-600"
                >
                    {showPassword ? 'Скрыть' : 'Показать'}
                </button>
            </div>

            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

            <button
                type="submit"
                className={`w-full py-2 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
                disabled={loading}
            >
                {loading ? 'Завантаження...' : 'Зареєструватися'}
            </button>
        </form>
    );
};

export default RegisterForm;
