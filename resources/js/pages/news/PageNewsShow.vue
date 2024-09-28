<template>
    <div>
        <!--Заголовок новости-->
        <h1>{{ $page.props.news.title }}</h1>

        <!--Мета-данные новости-->
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

        <!--Картинка новости-->
        <img
            src="https://cdn.quasar.dev/img/mountains.jpg"
            alt="Фото гор"
            height="500"
        />

        <!--Содержание новости-->
        <div v-html="$page.props.news.content" />

        <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div class="max-w-2xl mx-auto px-4">
                <div class="flex justify-between items-center mb-6">
                    <h2
                        class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Комментарии ({{ $page.props.news.countComments }})
                    </h2>
                </div>

                <!--Форма для комментария-->
                <AppCommentForm class="mb-6" />

                <!--Список комментариев-->
                <AppCommentItem
                    v-for="comment in $page.props.comments.data"
                    :key="comment.id"
                    class="py-6 pl-4 text-base bg-white rounded-lg dark:bg-gray-900"
                    :class="[mlClass]"
                    :comment="comment"
                    :marginLeft="marginLeft"
                />
            </div>
        </section>
    </div>
</template>

<script setup>
import AppCommentForm from "@/components/AppCommentForm.vue";
import AppCommentItem from "@/components/AppCommentItem.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";

defineOptions({
    layout: LayoutNews,
});

const marginLeft = 0;
const mlClass = `ml-${marginLeft}`;
</script>
