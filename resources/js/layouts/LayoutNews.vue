<template>
    <!--Шаблон новостей-->
    <div class="min-h-screen flex flex-col">
        <NewsCommentReplyModal />

        <NewsHeader />
        <main class="flex flex-grow flex-col">
            <slot />
        </main>
        <NewsFooter />
    </div>
</template>

<script setup>
import NewsCommentReplyModal from "@/components/news/newsComment/NewsCommentReplyModal.vue";
import NewsFooter from "@/components/news/NewsFooter.vue";
import NewsHeader from "@/components/news/NewsHeader.vue";
</script>
