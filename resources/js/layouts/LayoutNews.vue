<template>
    <!--Шаблон новостей-->
    <div class="min-h-screen flex flex-col">
        <NewsHeader />
        <AppBreadcrumbs class="mx-32 mt-7" />
        <main class="flex flex-grow flex-col mx-32">
            <slot />
        </main>
        <NewsFooter />
    </div>
</template>

<script setup>
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import NewsFooter from "@/components/news/NewsFooter.vue";
import NewsHeader from "@/components/news/NewsHeader.vue";
</script>
