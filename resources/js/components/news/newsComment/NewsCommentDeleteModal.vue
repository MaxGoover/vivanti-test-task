<template>
    <transition name="modal" >
        <AppModal
            v-if="newsComments.isShowedDeleteModal"
            :hideModal="newsComments.hideDeleteModal"
        >
            <template #title>
                <div class="flex flex-row justify-between">
                    <h3>{{ $t("title.delete.comment") }}</h3>
                    <button @click="newsComments.hideDeleteModal">
                        <XMarkIcon class="h-8 w-8" />
                    </button>
                </div>
            </template>

            <template #content>
                <p>
                    {{ $t("confirm.delete") }}
                    <span class="font-bold"
                        >"{{ newsComments.selected.content }}"</span
                    >
                </p>
            </template>

            <template #actions>
                <div class="flex flex-row justify-end gap-4">
                    <button
                        class="text-lg py-2 px-4 hover:text-white hover:bg-gray-500"
                        @click="newsComments.hideDeleteModal"
                    >
                        {{ $t("action.cancel") }}
                    </button>
                    <button
                        class="text-lg text-sky-700 py-2 px-4 border-2 border-sky-700 hover:text-white hover:bg-blue-500"
                        @click="deleteComment"
                    >
                        {{ $t("action.delete") }}
                    </button>
                </div>
            </template>
        </AppModal>
    </transition>
</template>

<script setup>
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import AppModal from "@/components/AppModal.vue";

const newsComments = useNewsCommentsStore();

const deleteComment = () => {
    newsComments.deleteComment().then(() => {
        newsComments.hideDeleteModal();
    });
};
</script>
