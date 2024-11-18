"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "@/app/my-profile/components/ProfilePage";

export default function Page() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("jwt");

            if (!token) {
                router.push("/auth"); // Перенаправление, если токен отсутствует
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:3000/api/fetchUserData",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
