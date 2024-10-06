<template>
    <!--Шаблон новостей-->
    <div class="min-h-screen flex flex-col">
        <NewsHeader />
        <main class="flex flex-grow flex-col">
            <slot />
        </main>
        <NewsFooter />

        <NewsCommentDeleteModal />

        <NewsCommentEditModal />

        <NewsCommentReplyModal />
    </div>
</template>

<script setup>
import NewsCommentDeleteModal from "@/components/news/newsComment/NewsCommentDeleteModal.vue";
import NewsCommentEditModal from "@/components/news/newsComment/NewsCommentEditModal.vue";
import NewsCommentReplyModal from "@/components/news/newsComment/NewsCommentReplyModal.vue";
import NewsFooter from "@/components/news/NewsFooter.vue";
import NewsHeader from "@/components/news/NewsHeader.vue";
</script>
