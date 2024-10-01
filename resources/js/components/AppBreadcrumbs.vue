<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol
            class="inline-flex items-center space-x-1 text-xs"
        >
            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="breadcrumb"
                class="inline-flex items-center"
            >
                <span v-if="index" class="mr-2">/</span>
                <a
                    v-if="index !== breadcrumbs.length - 1"
                    :href="breadcrumb.href"
                    class="inline-flex items-center font-medium underline text-gray-500 hover:text-blue-600"
                >
                    {{ breadcrumb.name }}
                </a>
                <span v-else class="font-medium text-gray-400">{{
                    breadcrumb.name
                }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
defineProps({
    breadcrumbs: {
        type: Array,
        required: true,
    },
});
</script>
