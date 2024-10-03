<template>
    <div class="mx-32">
        <!--Хлебные крошки-->
        <AppBreadcrumbs class="mt-7" :breadcrumbs="breadcrumbs" />

        <!--Список новостей-->
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
import { $t } from "@/boot/i18n";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";

defineOptions({
    layout: LayoutNews,
});

const breadcrumbs = [
    {
        href: "/",
        name: $t("menu.home"),
    },
    {
        href: "/news",
        name: $t("menu.news"),
    },
];
</script>
