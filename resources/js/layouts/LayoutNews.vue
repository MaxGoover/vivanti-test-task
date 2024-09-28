<template>
    <!--Шаблон новостей-->
    <div class="min-h-screen flex flex-col">
        <NewsHeader />
        <AppBreadcrumbs class="mx-16" />
        <main class="flex flex-grow flex-col mt-7 mx-16">
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
