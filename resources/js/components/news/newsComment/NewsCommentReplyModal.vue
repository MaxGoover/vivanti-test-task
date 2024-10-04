<template>
    <transition name="modal">
        <AppModal v-if="newsComments.isShowedReplyModal">
            <template #title>
                <div class="flex flex-row justify-between">
                    <h3>{{ $t("title.reply.comment") }}</h3>
                    <button @click="newsComments.hideReplyModal">
                        <XMarkIcon class="h-8 w-8" />
                    </button>
                </div>
            </template>

            <template #content>
                <AppCommentItem class="mt-8" :comment="newsComments.selected" :withDropdown="false" />

                <NewsCommentForm class="mt-8"/>
            </template>

            <template #actions>
                <div class="flex flex-row justify-end">
                    <button @click="newsComments.hideReplyModal">
                        Отменить
                    </button>
                    <button>Сохранить</button>
                </div>
            </template>
        </AppModal>
    </transition>
</template>

<script setup>
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import NewsCommentForm from "@/components/news/newsComment/NewsCommentForm.vue";
import AppCommentItem from "@/components/AppCommentItem.vue";
import AppModal from "@/components/AppModal.vue";

const newsComments = useNewsCommentsStore();
</script>
