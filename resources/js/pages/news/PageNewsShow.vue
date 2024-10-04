<template>
    <div>
        <!--Хлебные крошки-->
        <AppBreadcrumbs class="mt-7 mx-32" :breadcrumbs="breadcrumbs" />

        <!--Новость-->
        <div class="mx-32">
            <!--Заголовок новости-->
            <h1 class="my-6">
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
            <div class="flex justify-center">
                <img src="/images/news-image.jpg" alt="Фото гор" />
            </div>

            <!--Содержание новости-->
            <div v-html="$page.props.news.content" class="my-12 text-justify" />
        </div>

        <!--Войдите или зарегистрируйтесь-->
        <div class="h-44 bg-gray-300 flex items-center">
            <div class="mx-32 text-lg">
                <Link href="#" class="text-sky-700 underline font-bold"
                    >{{ $t("appeal.enterOrSignUp") }}.</Link
                >
                <p>{{ $t("site.registeredCanLeaveComment") }}.</p>
            </div>
        </div>

        <!--Комментарии-->
        <div class="mx-32">
            <!--Форма для комментария-->
            <NewsCommentForm class="mt-10 mb-6" />

            <button
                class="inline-flex items-center py-3.5 px-20 text-2xl font-normal text-sky-700 border-2 border-sky-700 hover:text-white hover:bg-blue-500"
                @click="newsComments.saveComment"
            >
                {{ $t("action.writeMessage") }}
            </button>

            <div class="flex justify-between items-center mt-14">
                <h3 class="my-4">
                    {{ $t("title.discussion") }} ({{ newsComments.count }})
                </h3>
            </div>

            <!--Сортировка комментариев-->
            <div class="font-normal text-center text-gray-500">
                <ul class="flex flex-wrap">
                    <li
                        v-for="(sort, index) in sorts"
                        :key="sort.name"
                        class="inline-block py-2 pl-2"
                        :class="{
                            active: sort.isActive,
                            'cursor-pointer': !sort.isActive,
                            'hover:underline': !sort.isActive,
                            'text-sky-700': !sort.isActive,
                        }"
                    >
                        <span v-if="index" class="mr-2">|</span>
                        <span>{{ sort.name }}</span>
                    </li>
                </ul>
            </div>

            <!--Список комментариев-->
            <div v-if="!newsComments.isEmptyList" class="mb-8">
                <AppCommentItem
                    v-for="(comment, index) in newsComments.list"
                    :key="comment.id"
                    class="py-6 pl-8 text-justify"
                    :comment="comment"
                    :class="{
                        'border-b': !newsComments.isLastInList(index),
                    }"
                />
            </div>

            <!--Комментариев нет-->
            <div v-if="!newsComments.count" class="my-10">
                {{ $t("no.comments") }}
            </div>

            <!--Кнопка подгрузки комментариев-->
            <div v-if="newsComments.count" class="flex justify-center mb-8">
                <div
                    v-if="newsComments.isShowedLoader"
                    class="flex flex-col items-center"
                >
                    <AppSpinner class="mb-3" height="20" width="20" />
                    <span>{{ $t("process.loading") }}</span>
                </div>
                <button
                    v-else-if="!newsComments.isLoadedAll"
                    class="flex flex-col items-center"
                    @click="loadComments"
                >
                    <ArrowDownCircleIcon class="h-20 text-sky-700" />
                    <span>{{ $t("action.load.comments") }}</span>
                </button>
            </div>
        </div>

        <!--Рекомендации-->
        <div class="mx-32">
            <template v-if="!news.isEmptyList">
                <h3 class="my-4">{{ $t("title.readAlso") }}</h3>

                <!--Список новостей-->
                <div class="grid grid-cols-2 gap-10 mb-10">
                    <NewsItem
                        v-for="news in news.list"
                        :key="news.id"
                        :news="news"
                    />
                </div>
            </template>

            <!--Кнопка подгрузки новостей-->
            <div class="flex justify-center mb-8">
                <div
                    v-if="news.isShowedLoader"
                    class="flex flex-col items-center"
                >
                    <AppSpinner class="mb-3" height="20" width="20" />
                    <span>{{ $t("process.loading") }}</span>
                </div>
                <button
                    v-else-if="!news.isLoadedAll"
                    class="flex flex-col items-center"
                    @click="loadNews"
                >
                    <ArrowDownCircleIcon class="h-20 text-sky-700" />
                    <span>{{ $t("action.load.news") }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import { ArrowDownCircleIcon } from "@heroicons/vue/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/solid";
import { EyeIcon } from "@heroicons/vue/24/solid";
import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
import { Link } from "@inertiajs/vue3";
import { onMounted } from "vue";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import { useNewsStore } from "@/stores/news/news";
import { usePage } from "@inertiajs/vue3";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import NewsCommentForm from "@/components/news/newsComment/NewsCommentForm.vue";
import AppCommentItem from "@/components/AppCommentItem.vue";
import AppSpinner from "@/components/AppSpinner.vue";
import LayoutNews from "@/layouts/LayoutNews.vue";
import NewsItem from "@/components/news/NewsItem.vue";

defineOptions({
    layout: LayoutNews,
});

const news = useNewsStore();
const newsComments = useNewsCommentsStore();
const page = usePage();

const breadcrumbs = [
    {
        href: "/",
        name: $t("menu.home"),
    },
    {
        href: "/news",
        name: $t("menu.news"),
    },
    {
        href: `/news/${page.props.news.id}`,
        name: page.props.news.title,
    },
];

const sorts = [
    {
        isActive: true,
        name: $t("sort.first.new"),
    },
    {
        isActive: false,
        name: $t("sort.first.new"),
    },
];

/**
 * Загружает комментарии.
 *
 * @returns {void}
 */
const loadComments = () => {
    newsComments.showLoader();
    newsComments.loadComments().finally(() => {
        newsComments.hideLoader();
    });
};

/**
 * Загружает новости.
 *
 * @returns {void}
 */
const loadNews = () => {
    news.showLoader();
    news.loadNews().finally(() => {
        news.hideLoader();
    });
};

onMounted(() => {
    newsComments.setNewsId(page.props.news.id);
    newsComments.setCount(page.props.news.countComments);
    loadNews();
    loadComments();
});
</script>
