<template>
    <div class="font-light text-slate-700 leading-5 grid-container">
        <!--Аватарка-->
        <div>
            <img
                class="w-10 h-10 rounded-full border border-2"
                src="/images/user-placeholder.png"
                alt="Аватар"
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
                </div>

                <!--Дата публикации комментария-->
                <p>
                    <time
                        :datetime="comment.created_at"
                        :title="comment.created_at"
                        >{{ comment.created_at }}</time
                    >
                </p>
            </div>

            <!--Текст комментария-->
            <p>
                {{ comment.content }}
            </p>

            <!--Оценка комментария-->
            <div class="mt-3">
                <ul class="flex flex-row gap-8">
                    <li>
                        <HandThumbUpIcon class="h-5 inline-flex mr-1" />
                        43
                    </li>
                    <li>
                        <HandThumbUpIcon class="h-5 inline-flex mr-1" />
                        <span
                            class="ml-2 text-sky-700 cursor-pointer hover:underline"
                            >Мне нравится</span
                        >
                    </li>
                </ul>
            </div>

            <!--Ответить-->
            <div class="flex items-center mt-4 space-x-4">
                <button
                    type="button"
                    class="flex items-center font-medium text-sm hover:underline"
                >
                    <ChatBubbleBottomCenterTextIcon class="h-4 mr-2" />
                    {{ $t("action.reply") }}
                </button>
            </div>

            <template v-if="hasChildren(comment)">
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
import {
    ChatBubbleBottomCenterTextIcon,
    HandThumbUpIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
});

const hasChildren = (comment) => comment.children.length;
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 50px 1fr;
}
</style>
