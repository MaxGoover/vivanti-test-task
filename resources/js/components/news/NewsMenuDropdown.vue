<template>
    <select
        class="bg-zinc-500 text-white uppercase cursor-pointer focus:ring-zinc-500 focus:border-zinc-500 bg-blend-color-dodge text-right"
    >
        <option class="capitalize" disabled selected>{{ title }}</option>
        <option v-for="menuItem in menu" :key="menuItem" class="capitalize">
            <Link href="#">
                {{ menuItem }}
            </Link>
        </option>
    </select>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
defineProps({
    menu: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
</script>
