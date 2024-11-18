"use server";

import React from "react";
import NewsLayout from "./components/NewsLayout";

// Функция для получения данных статей
async function getArticles() {
    try {
        const res = await fetch("http://localhost:3000/api/articles", { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Failed to fetch articles");
        }
        const data = await res.json();
        return data.articles; // Предполагается, что данные статей находятся в `articles`
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Компонент страницы блога
export default async function ServerBlogPage() {
    const articles = await getArticles();

    return <NewsLayout articles={articles} />;
}
