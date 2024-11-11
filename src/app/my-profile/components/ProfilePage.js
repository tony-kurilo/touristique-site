import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken'; // Импортируем библиотеку для работы с JWT

const secretKey = 'your_secret_key'; // Секретный ключ, который вы использовали для генерации токена


const ProfilePage = () => {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Функция для получения значения куки по имени
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        // Проверяем, есть ли токен в куках
        const token = getCookie('jwt'); // Убедитесь, что имя куки совпадает с тем, что вы установили

        if (!token) {
            // Если токен не найден, показываем сообщение и перенаправляем на страницу авторизации
            setIsChecking(false);
            router.replace('/auth'); // URL вашей страницы авторизации
        } else {
            try {
                // Проверяем токен и извлекаем данные
                const decoded = jwt.verify(token, secretKey);
                setUserData(decoded); // Сохраняем данные пользователя из токена
                setIsChecking(true);
            } catch (error) {
                console.error('Ошибка проверки токена:', error);
                // Если токен невалиден, перенаправляем на страницу авторизации
                setIsChecking(false);
                router.replace('/auth');
            }
        }
    }, [router]);

    const handleLogout = () => {
        // Удаляем токен из cookies
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // Устанавливаем истекшую дату
        router.replace('/'); // Перенаправляем на страницу авторизации
    };


    if (isChecking === false) {
        return (
            <div>
                <h1>Redirecting...</h1>
            </div>
        );
    }

    return (
        <div>
            {userData ? (
                <div>
                    <p>Email: {userData.email}</p>
                    <p>Fuck you mate</p>
                    <button onClick={handleLogout} className="text-red-500 hover:underline">
                        Выйти
                    </button>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default ProfilePage;