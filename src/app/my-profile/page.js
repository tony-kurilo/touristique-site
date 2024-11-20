"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "@/app/my-profile/components/ProfilePage";

export default function Page() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Функция для обновления токена
    const refreshToken = async () => {
        try {
            const response = await fetch("/api/refresh", {
                method: "POST",
                credentials: "include", // Обязательно для отправки cookies
            });

            if (!response.ok) {
                throw new Error("Не удалось обновить токен");
            }

            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken); // Обновляем токен в localStorage
        } catch (error) {
            console.error(error);
            setError("Не удалось обновить токен");
            router.push("/auth");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                router.push("/auth"); // Перенаправление, если токен отсутствует
                return;
            }

            // Проверка валидности токена
            const tokenResponse = await fetch("/api/validate-token", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!tokenResponse.ok) {
                // Если токен недействителен, пробуем обновить
                await refreshToken();
                return;
            }

            // Получаем данные пользователя
            try {
                const response = await fetch("/api/fetchUserData", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Ошибка при получении данных пользователя");
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error(err);
                setError("Не удалось загрузить данные пользователя");
                router.push("/auth"); // Перенаправление в случае ошибки
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <ProfilePage userData={userData} />;
}
