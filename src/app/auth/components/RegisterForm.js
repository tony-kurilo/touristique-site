import React, { useState } from 'react';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // для отображения пароля
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Логін обов&apos;язковий';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'E-mail обов&apos;язковий';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Введіть корректний e-mail';
        }

        if (!password) {
            newErrors.password = 'Пароль обов&apos;язковий';
        } else if (password.length < 6) {
            newErrors.password = 'Пароль повинен бути не менше 6 символів';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
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
                setMessage('Реєстрація успішна!');
            } else {
                const errorData = await response.json();
                if (errorData.message === 'Користувач з таким e-mail вже існує') {
                    setErrors({ email: errorData.message });
                } else {
                    setMessage('Помилка реєстрації: ' + errorData.message);
                }
            }
        } catch (error) {
            console.error('Помилка реєстрації: ', error);
            setMessage('Помилка сервера, спробуйте пізніше');
        }
    };


    return (
        <form onSubmit={handleRegister}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-100">
                    Ім&apos;я користувача
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>
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
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-100">
                    Пароль
                </label>
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
                    className="relative -top-10 left-72 px-7 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {showPassword ? 'Закрити' : 'Показати'}
                </button>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
            >
                Зареєструватися
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
    );
};

export default RegisterForm;
