<template>
    <div>
        <div
            class="py-2 px-4 mb-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
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
            class="inline-flex items-center py-3.5 px-20 text-2xl font-normal text-sky-700 border-2 border-sky-700 hover:text-white hover:bg-blue-500"
            @click="save"
        >
            Написать сообщение
        </button>
    </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import config from "@/utils/settings/config";

const newsComments = useNewsCommentsStore();

const save = () => {
    newsComments
        .create()
        .then((res) => {
            toast.success(res.data.message, config.toast);
            newsComments.clearList();
            newsComments.index();
        })
        .catch((err) => toast.error(err.message, config.toast));
};
</script>
