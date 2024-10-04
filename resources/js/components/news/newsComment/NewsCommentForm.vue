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
    </div>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import { storeToRefs } from "pinia";
import { useNewsCommentsStore } from "@/stores/news/newsComments";

const newsComments = useNewsCommentsStore();

const { form } = storeToRefs(newsComments);
</script>
