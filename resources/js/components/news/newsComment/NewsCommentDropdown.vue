<template>
    <div class="relative inline-block">
        <div>
            <button
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                @click="toggleDropdown"
            >
                <IconMenu height="4" width="4" />
                <span class="sr-only">Comment settings</span>
            </button>
        </div>
        <transition name="dropdown">
            <div
                v-if="
                    newsComments.isCommentSelected(comment.id) &&
                    isShowedDropdown
                "
                class="absolute right-0 z-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
                <ul class="text-right text-gray-700">
                    <li
                        v-for="menuItem in menu"
                        :key="menuItem.name"
                        class="flex items-center cursor-pointer hover:text-sky-700 hover:bg-gray-100"
                        @click="[hideDropdown(), menuItem.callback()]"
                    >
                        <component :is="menuItem.icon" class="h-5 m-2" />
                        <span class="block p-2">{{ menuItem.name }}</span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { $t } from "@/i18n";
import {
    ChatBubbleBottomCenterTextIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useNewsCommentsStore } from "@/stores/news/newsComments";
import IconMenu from "@/assets/icons/IconMenu.vue";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
});

const newsComments = useNewsCommentsStore();

const isShowedDropdown = ref(false);

const menu = ref([
    {
        icon: ChatBubbleBottomCenterTextIcon,
        name: $t("action.reply"),
        callback: () => {
            newsComments.showReplyModal();
        },
    },
    {
        icon: PencilIcon,
        name: $t("action.edit"),
        callback: () => {
            newsComments.setFormContent(newsComments.selected.content);
            newsComments.showEditModal();
        },
    },
    {
        icon: TrashIcon,
        name: $t("action.delete"),
        callback: () => {
            newsComments.showDeleteModal();
        },
    },
]);

const hideDropdown = () => {
    isShowedDropdown.value = false;
};
const showDropdown = () => {
    isShowedDropdown.value = true;
};

const toggleDropdown = () => {
    if (!isShowedDropdown.value) {
        newsComments.setSelected(props.comment);
        newsComments.setFormParentId(props.comment.id);
        showDropdown();
    } else {
        newsComments.clearSelected();
        hideDropdown();
    }
};
</script>
