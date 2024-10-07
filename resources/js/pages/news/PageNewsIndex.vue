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
import { $t } from "@/i18n";
import { Breadcrumb } from "@/entities/Breadcrumb";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import route from "@/routes";

defineOptions({
    layout: LayoutNews,
});

const breadcrumbs = [
    new Breadcrumb(route.home, $t("menu.home")),
    new Breadcrumb(route.news.index, $t("menu.news")),
];
</script>
