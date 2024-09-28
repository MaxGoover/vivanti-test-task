<template>
    <div>
        <!--Заголовок новости-->
        <div class="my-6 text-4xl font-medium">
            <span>
                {{ $page.props.news.title }}
            </span>
        </div>

        <!--Мета-данные новости-->
        <div class="mb-7">
            <span>{{ $page.props.news.created_at }}</span>
            <div class="flex flex-row justify-between">
                <span>Иванов И.И., к.м.н.</span>
                <ul class="flex flex-row gap-8">
                    <li>
                        <EyeIcon class="h-5 inline-flex mr-1" />
                        {{ $page.props.news.countViews }}
                    </li>
                    <li>
                        <HandThumbUpIcon class="h-5 inline-flex mr-1" />
                        43
                    </li>
                    <li>
                        <ChatBubbleLeftIcon
                            class="h-5 inline-flex mr-1 text-sky-700"
                        />
                        {{ $page.props.news.countComments }}
                    </li>
                </ul>
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

        <!--Комментарии-->
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
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/solid";
import { EyeIcon } from "@heroicons/vue/24/solid";
import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
import AppCommentForm from "@/components/AppCommentForm.vue";
import AppCommentItem from "@/components/AppCommentItem.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";

defineOptions({
    layout: LayoutNews,
});

const marginLeft = 0;
const mlClass = `ml-${marginLeft}`;
</script>
