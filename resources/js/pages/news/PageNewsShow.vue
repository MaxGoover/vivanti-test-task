<template>
    <div>
        <!--Хлебные крошки-->
        <AppBreadcrumbs class="mt-7 mx-32" :breadcrumbs="breadcrumbs" />

        <!--Новость-->
        <div class="mx-32">
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
            <AppCommentForm class="mt-10 mb-6" />

            <div class="flex justify-between items-center mb-6">
                <h3>{{ $t("title.discussion") }} ({{ newsComments.count }})</h3>
            </div>

            <!--Список комментариев-->
            <div v-if="!newsComments.isEmptyList">
                <AppCommentItem
                    v-for="comment in newsComments.list"
                    :key="comment.id"
                    class="py-6 pl-4 text-base bg-white rounded-lg dark:bg-gray-900"
                    :class="[mlClass]"
                    :comment="comment"
                    :marginLeft="marginLeft"
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
                <h3>{{ $t("title.readAlso") }}</h3>

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
import { toast } from "vue3-toastify";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import { useNewsStore } from "@/stores/news/news";
import { usePage } from "@inertiajs/vue3";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import AppCommentForm from "@/components/AppCommentForm.vue";
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

const marginLeft = 0;
const mlClass = `ml-${marginLeft}`;

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

const loadComments = () => {
    newsComments.showLoader();
    newsComments
        .index()
        .then((res) => {
            newsComments.addListComments(res.data.comments.data);

            if (newsComments.isPageLast(res.data.comments.last_page)) {
                newsComments.finishLoadComments();
            } else {
                newsComments.offsetPage();
            }
        })
        .catch(() => {
            toast.error($t("message.error.comment.index"));
        })
        .finally(() => {
            newsComments.hideLoader();
        });
};

const loadNews = () => {
    news.showLoader();
    news.index()
        .then((res) => {
            news.addListNews(res.data.news.data);

            if (news.isPageLast(res.data.news.last_page)) {
                news.finishLoadNews();
            } else {
                news.offsetPage();
            }
        })
        .catch(() => {
            toast.error($t("message.error.news.index"));
        })
        .finally(() => {
            news.hideLoader();
        });
};

onMounted(() => {
    newsComments.setFormNewsId(page.props.news.id);
    newsComments.setCount(page.props.news.countComments);
    loadNews();
});
</script>
