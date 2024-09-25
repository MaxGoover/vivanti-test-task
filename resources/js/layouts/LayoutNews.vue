<template>
    <div class="min-h-screen flex flex-col">
        <NewsHeader />
        <main class="flex flex-grow flex-col">
            <slot />
        </main>
        <NewsFooter />
    </div>
</template>

<script setup>
import NewsFooter from "@/components/news/NewsFooter.vue";
import NewsHeader from "@/components/news/NewsHeader.vue";
</script>
