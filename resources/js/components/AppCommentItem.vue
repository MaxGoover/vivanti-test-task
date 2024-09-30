<template>
    <article>
        <!--Мета-данные комментария-->
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <!--Автор комментария-->
                <p
                    class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                >
                    <img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="/images/user-placeholder.png"
                        alt="Аватар"
                    />Имя Фамилия
                </p>
            </div>

            <!--Дата публикации комментария-->
            <p class="text-sm text-gray-600 dark:text-gray-400">
                <time
                    pubdate
                    :datetime="comment.created_at"
                    :title="comment.created_at"
                    >{{ comment.created_at }}</time
                >
            </p>
        </footer>

        <!--Текст комментария-->
        <p class="text-gray-500 dark:text-gray-400">
            {{ comment.content }}
        </p>

        <!--Ответить-->
        <div class="flex items-center mt-4 space-x-4">
            <button
                type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
            >
                <svg
                    class="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                </svg>
                Ответить
            </button>
        </div>

        <template v-if="hasChildren(comment)">
            <AppCommentItem
                v-for="comment in comment.children"
                :key="comment.id"
                class="py-6 pl-4 text-base bg-white rounded-lg dark:bg-gray-900"
                :class="[mlClass]"
                :comment="comment"
                :marginLeft="increasedMarginLeft"
            />
        </template>
    </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
    marginLeft: {
        type: Number,
        required: true,
    },
});

let increasedMarginLeft = props.marginLeft;

const mlClass = computed(() => {
    if (props.marginLeft <= 16) {
        increasedMarginLeft = increasedMarginLeft + 4;
    }

    return `ml-${increasedMarginLeft}`;
});

const hasChildren = (comment) => comment.children.length;
</script>
