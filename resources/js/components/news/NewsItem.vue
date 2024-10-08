<template>
    <div>
        <Link :href="route.news.show(news.id)">
            <!--Картинка новости-->
            <img
                src="https://cdn.quasar.dev/img/mountains.jpg"
                :alt="$t('image.mountains')"
            />

            <div class="p-5">
                <!--Заголовок новости-->
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight line-clamp-1 overflow-hidden text-ellipsis leading-6 max-h-12 pt-0"
                >
                    {{ news.title }}
                </h5>

                <!--Содержание новости-->
                <p
                    class="font-normal text-gray-700 line-clamp-6 overflow-hidden text-ellipsis leading-6 max-h-36 pt-0"
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
