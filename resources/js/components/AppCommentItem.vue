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
        <p class="text-gray-500">
            {{ comment.content }}
        </p>

        <!--Ответить-->
        <div class="flex items-center mt-4 space-x-4">
            <button
                type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline"
            >
                <ChatBubbleBottomCenterTextIcon class="h-4 mr-2" />
                {{ $t("action.reply") }}
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
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/outline";
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
