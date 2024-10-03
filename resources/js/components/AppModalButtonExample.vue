<template>
    <div>
        <button @click="showModal = true">Show Modal</button>

        <transition name="modal">
            <AppModal v-if="showModal" @close="showModal = false">
                <template #header>
                    <h3>custom header</h3>
                </template>
            </AppModal>
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AppModal from "@/components/AppModal.vue";

const showModal = ref(false);
</script>
