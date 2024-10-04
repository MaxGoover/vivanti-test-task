<template>
    <div class="bg-black/50 table fixed h-full left-0 top-0 w-full z-50">
        <div class="table-cell align-middle">
            <div
                class="bg-white flex flex-col mx-auto my-0 p-8"
                :class="`h-${height} w-${width}`"
            >
                <div>
                    <slot name="title" />
                </div>

                <div class="flex flex-grow flex-col">
                    <slot name="content" />
                </div>

                <div class="bottom-0 z-10">
                    <slot name="actions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    height: {
        type: String,
        default: "3/6",
    },
    width: {
        type: String,
        default: "3/6",
    },
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
