<template>
    <div>
        <div
            class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
            <textarea
                rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Оставить комментарий"
                required
                >{{ newsComments.form.content }}
            </textarea>
        </div>
        <button
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            @click="save"
        >
            Сохранить
        </button>
    </div>
</template>

<script setup>
import { useNewsCommentsStore } from "@/stores/news/newsComments";

const newsComments = useNewsCommentsStore();

const save = () => {
    newsComments.create();
};
</script>
