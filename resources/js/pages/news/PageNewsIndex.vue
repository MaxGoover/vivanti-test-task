<template>
    <div class="grid grid-cols-3 gap-8">
        <NewsItem
            v-for="news in $page.props.news.data"
            :key="news.id"
            :news="news"
        />
    </div>
</template>

<script setup>
import NewsItem from "@/components/news/NewsItem.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";

defineOptions({
    layout: LayoutNews,
});
</script>
