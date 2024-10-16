import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken'; // Импортируем библиотеку для работы с JWT

const secretKey = 'your_secret_key'; // Секретный ключ, который вы использовали для генерации токена


const ProfilePage = () => {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Проверяем, есть ли токен в localStorage (или в cookies)
        const token = localStorage.getItem('authToken'); // Это имя может быть другим, в зависимости от того, как хранится токен

        if (!token) {
            // Если токен не найден, показываем сообщение и перенаправляем на страницу авторизации
            setIsChecking(false);
            router.replace('/auth'); // URL вашей страницы авторизации
        } else {
            try {
                // Проверяем токен и извлекаем данные
                const decoded = jwt.verify(token, secretKey);
                setUserData(decoded); // Сохраняем данные пользователя из токена
                setIsChecking(false);
            } catch (error) {
                console.error('Ошибка проверки токена:', error);
                // Если токен невалиден, перенаправляем на страницу авторизации
                setIsChecking(false);
                router.replace('/auth');
            }
        }
    }, [router]);

    if (isChecking) {
        return (
            <div>
                <h1>Redirecting...</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Профиль пользователя</h1>
            {userData ? (
                <div>
                    <p>Email: {userData.email}</p>
                    {/* Вы можете добавить больше информации о пользователе, если это необходимо */}
                </div>
            ) : (
                <p>Данные профиля недоступны.</p>
            )}
        </div>
    );
};

export default ProfilePage;