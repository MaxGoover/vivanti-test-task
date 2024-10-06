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
                <AppCommentItem
                    :comment="newsComments.selected"
                    :withChildren="false"
                    :withDropdown="false"
                />

                <NewsCommentForm class="mt-8" />
            </template>

            <template #actions>
                <div class="flex flex-row justify-end gap-4">
                    <button
                        class="text-lg py-2 px-4 hover:text-white hover:bg-gray-500"
                        @click="newsComments.hideReplyModal"
                    >
                        {{ $t("action.cancel") }}
                    </button>
                    <button
                        class="text-lg text-sky-700 py-2 px-4 border-2 border-sky-700 hover:text-white hover:bg-blue-500"
                        @click="saveComment"
                    >
                        {{ $t("action.save") }}
                    </button>
                </div>
            </template>
        </AppModal>
    </transition>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import AppCommentItem from "@/components/AppCommentItem.vue";
import AppModal from "@/components/AppModal.vue";
import NewsCommentForm from "@/components/news/newsComment/NewsCommentForm.vue";

const newsComments = useNewsCommentsStore();

const saveComment = () => {
    newsComments.setFormParentId(newsComments.selected.id);
    newsComments.saveComment().then(() => {
        newsComments.hideReplyModal();
    });
};
</script>
