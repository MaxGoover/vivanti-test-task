<template>
    <div>
        <h1>{{ $page.props.news.title }}</h1>

        <div class="flex items-center justify-between">
            <div>
                <span>{{ $page.props.news.created_at }}</span
                ><span>Иванов И.И., к.м.н.</span>
            </div>
            <div>
                <span>Просмотры {{ $page.props.news.countViews }}</span>
                <span>Лайки 43</span>
                <span>Комментарии {{ $page.props.news.countComments }}</span>
            </div>
        </div>

        <img
            src="https://cdn.quasar.dev/img/mountains.jpg"
            alt="Фото гор"
            height="500"
        />

        <div v-html="$page.props.news.content" />
    </div>
</template>

<script setup>
import LayoutNews from "@/layouts/LayoutNews.vue";

defineOptions({
    layout: LayoutNews,
});
</script>
