<template>
    <div class="comment-grid">
        <!--Аватарка-->
        <div>
            <img
                src="/images/user-placeholder.png"
                class="w-10 h-10 rounded-full border border-2"
                :alt="$t('image.avatar')"
            />
        </div>

        <div class="py-2 px-4 bg-white border border-gray-200">
            <textarea
                v-model="form.content"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                required
                rows="6"
                :autofocus="autofocus"
                :placeholder="$t('action.leaveComment')"
            />
        </div>
    </div>
</template>

<script setup>
import { $t } from "@/i18n";
import { storeToRefs } from "pinia";
import { useNewsCommentsStore } from "@/stores/news/newsComments";

defineProps({
    autofocus: {
        type: Boolean,
        default: false,
    },
});

const newsComments = useNewsCommentsStore();

const { form } = storeToRefs(newsComments);
</script>
