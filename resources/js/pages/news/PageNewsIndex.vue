<template>
    <div>
        <AppBreadcrumbs class="mt-7" :breadcrumbs="breadcrumbs" />

        <div class="grid grid-cols-3 gap-8 my-8">
            <NewsItem
                v-for="news in $page.props.news.data"
                :key="news.id"
                :news="news"
            />
        </div>
    </div>
</template>

<script setup>
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";

defineOptions({
    layout: LayoutNews,
});

const breadcrumbs = [
    {
        href: "/",
        name: "Главная",
    },
    {
        href: "/news",
        name: "Новости",
    },
];
</script>
