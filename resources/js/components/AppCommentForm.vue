<template>
    <div>
        <div class="py-2 px-4 mb-4 bg-white border border-gray-200">
            <textarea
                v-model="form.content"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                required
                rows="6"
                :placeholder="$t('action.leaveComment')"
            />
        </div>
        <button
            class="inline-flex items-center py-3.5 px-20 text-2xl font-normal text-sky-700 border-2 border-sky-700 hover:text-white hover:bg-blue-500"
            @click="save"
        >
            {{ $t("action.writeMessage") }}
        </button>
    </div>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import config from "@/utils/settings/config";

const newsComments = useNewsCommentsStore();

const { form } = storeToRefs(newsComments);

const save = () => {
    newsComments
        .create()
        .then(() => {
            newsComments.clearList();
            newsComments.clearFormParentId();
            newsComments.clearFormContent();
            newsComments.loadComments();
            toast.success($t("message.success.comment.create"), config.toast);
        })
        .catch((err) => toast.error(err.message, config.toast));
};
</script>
