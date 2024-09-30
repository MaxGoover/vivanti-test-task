<template>
    <div>
        <!--Заголовок новости-->
        <h1>
            {{ $page.props.news.title }}
        </h1>

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
        <div>
            <img src="/images/news-image.jpg" alt="Фото гор" />
        </div>

        <!--Содержание новости-->
        <div v-html="$page.props.news.content" class="mt-12 text-justify" />

        <!--Комментарии-->
        <section
            v-if="!newsComments.isEmptyList"
            class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased"
        >
            <div class="max-w-2xl mx-auto px-4">
                <div class="flex justify-between items-center mb-6">
                    <h3>Обсуждение ({{ newsComments.count }})</h3>
                </div>

                <!--Форма для комментария-->
                <AppCommentForm class="mb-6" />

                <!--Список комментариев-->
                <AppCommentItem
                    v-for="comment in newsComments.list"
                    :key="comment.id"
                    class="py-6 pl-4 text-base bg-white rounded-lg dark:bg-gray-900"
                    :class="[mlClass]"
                    :comment="comment"
                    :marginLeft="marginLeft"
                />
            </div>
        </section>

        <section v-else>Комментариев нет</section>

        <!--Обсервер, подгружающий комментарии-->
        <div class="invisible" ref="observerLazyLoadComments"></div>

        <template v-if="!news.isEmptyList">
            <h3>Читайте так же</h3>

            <!--Рекомендации-->
            <div class="grid grid-cols-2 gap-10 mb-10">
                <NewsItem
                    v-for="news in news.list"
                    :key="news.id"
                    :news="news"
                />
            </div>
        </template>

        <!--Обсервер, подгружающий новости-->
        <div class="invisible" ref="observerLazyLoadNews"></div>
    </div>
</template>

<script setup>
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/solid";
import { EyeIcon } from "@heroicons/vue/24/solid";
import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
import { onMounted, onUnmounted, ref } from "vue";
import { useNewsStore } from "@/stores/news/news";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import { usePage } from "@inertiajs/vue3";
import AppCommentForm from "@/components/AppCommentForm.vue";
import AppCommentItem from "@/components/AppCommentItem.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";
import NewsItem from "@/components/news/NewsItem.vue";

defineOptions({
    layout: LayoutNews,
});

const news = useNewsStore();
const newsComments = useNewsCommentsStore();
const page = usePage();

const marginLeft = 0;
const mlClass = `ml-${marginLeft}`;

const observerLazyLoadComments = ref(null);
const observerLazyLoadNews = ref(null);
const observer = ref(null);

onMounted(() => {
    newsComments.setFormNewsId(page.props.news.id);

    observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target === observerLazyLoadComments.value) {
                    newsComments.index();
                } else if (entry.target === observerLazyLoadNews.value) {
                    news.index();
                }
                observer.value.unobserve(entry.target);
            }
        });
    });

    if (observerLazyLoadComments.value) {
        observer.value.observe(observerLazyLoadComments.value);
    }

    if (observerLazyLoadNews.value) {
        observer.value.observe(observerLazyLoadNews.value);
    }
});

onUnmounted(() => {
    if (observer.value) {
        if (observerLazyLoadComments.value) {
            observer.value.unobserve(observerLazyLoadComments.value);
        }

        if (observerLazyLoadNews.value) {
            observer.value.unobserve(observerLazyLoadNews.value);
        }
    }
});
</script>
