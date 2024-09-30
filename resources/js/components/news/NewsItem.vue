<template>
    <div
        class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
        <Link :href="route.news.show(news.id)">
            <!--Картинка новости-->
            <img
                src="https://cdn.quasar.dev/img/mountains.jpg"
                class="rounded-t-lg"
                alt="Фото гор"
            />

            <div class="p-5">
                <!--Заголовок новости-->
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white news-title"
                >
                    {{ news.title }}
                </h5>

                <!--Содержание новости-->
                <p
                    class="font-normal text-gray-700 dark:text-gray-400 news-content"
                >
                    {{ news.content }}
                </p>
            </div>
        </Link>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import route from "@/routes/index.js";

defineProps({
    news: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.news-title {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    line-height: 1.5em;
    max-height: 3em;
    overflow: hidden;
    padding-top: 0;
    text-overflow: ellipsis;
}
.news-content {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    display: -webkit-box;
    line-height: 1.5em;
    max-height: 9em;
    overflow: hidden;
    padding-top: 0;
    text-overflow: ellipsis;
}
</style>
