<template>
    <div class="font-light text-slate-700 leading-5 grid-container">
        <!--Аватарка-->
        <div>
            <img
                src="/images/user-placeholder.png"
                class="w-10 h-10 rounded-full border border-2"
                :alt="$t('image.avatar')"
            />
        </div>

        <div>
            <!--Мета-данные комментария-->
            <div class="flex justify-between items-center mb-2">
                <div class="flex">
                    <!--Автор комментария-->
                    <p class="inline-flex items-center mr-3">
                        <span class="mr-1">Имя Фамилия,</span>
                        <span>профессия</span>
                    </p>

                    <!--Дата публикации комментария-->
                    <p>
                        <time
                            :datetime="comment.created_at"
                            :title="comment.created_at"
                            >{{ comment.created_at }}</time
                        >
                    </p>
                </div>

                <!--Меню действий-->
                <NewsCommentDropdown v-if="withDropdown" :comment="comment" />
            </div>

            <!--Текст комментария-->
            <p>
                {{ comment.content }}
            </p>

            <!--Лайки-->
            <div class="mt-3">
                <ul class="flex flex-row gap-8">
                    <li>
                        <HandThumbUpIcon class="h-5 inline-flex mr-1" />
                        <span>43</span>
                    </li>
                    <li>
                        <HandThumbUpIcon class="h-5 inline-flex mr-1" />
                        <span
                            class="ml-2 text-sky-700 cursor-pointer hover:underline"
                            >{{ $t("action.likeMe") }}</span
                        >
                    </li>
                </ul>
            </div>

            <!--Список комментариев на текущий комментарий-->
            <template v-if="hasCommentChildren(comment) && withChildren">
                <AppCommentItem
                    v-for="comment in comment.children"
                    :key="comment.id"
                    class="py-6 pl-8 text-justify"
                    :comment="comment"
                />
            </template>
        </div>
    </div>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
import { useNewsCommentsStore } from "@/stores//news/newsComments";
import NewsCommentDropdown from "@/components/news/newsComment/NewsCommentDropdown.vue";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
    withChildren: {
        type: Boolean,
        default: true,
    },
    withDropdown: {
        type: Boolean,
        default: true,
    },
});

const newsComments = useNewsCommentsStore();

/**
 *
 * @param {Object} comment
 */
const hasCommentChildren = (comment) => comment.children.length;
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 50px 1fr;
}
</style>
