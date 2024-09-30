<template>
    <header
        class="sticky top-0 z-20 flex justify-between border-b bg-zinc-500 h-16 px-16"
    >
        <!--Логотип-->
        <div class="h-16">
            <a href="/news">
                <img src="/logo.png" class="h-16" alt="Логотип Виванти" />
            </a>
        </div>

        <!--Список выпадающих меню-->
        <div>
            <ul class="flex flex-row items-center h-full text-sm font-medium">
                <li class="ml-2.5">
                    <NewsMenuDropdown title="Обучение" :menu="menuLearning" />
                </li>
                <li class="ml-2.5">
                    <NewsMenuDropdown title="Эксперты" :menu="menuPublishes" />
                </li>
                <li class="ml-2.5 text-white uppercase">Публикации</li>
                <li class="ml-2.5 text-white">
                    <NewsMenuDropdown title="О проекте" :menu="menuAboutProject" />
                </li>
            </ul>
        </div>

        <!--Аутентификация/Профиль-->
        <div>
            <ul class="flex flex-row items-center h-full text-sm font-medium">
                <li class="ml-2.5 text-white uppercase">
                    <a href="#" class="px-4"> Регистрация </a>
                </li>
                <li class="ml-2.5 px-5 py-1.5 h-3/6 bg-white uppercase">
                    <a href="#"> Вход </a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import NewsMenuDropdown from './NewsMenuDropdown.vue';

const menuLearning = ["Эксперты", "Публикации", "О проекте"];
const menuPublishes = ["Эксперты", "Публикации", "О проекте"];
const menuAboutProject = [
    "Эксперты",
    "Публикации",
    "О проекте",
    "Эксперты",
    "Публикации",
    "О проекте",
    "Эксперты",
    "Публикации",
    "О проекте",
];
</script>
