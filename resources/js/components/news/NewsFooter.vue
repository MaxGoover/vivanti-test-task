<template>
    <footer class="bottom-0 z-10 py-20 border-t">
        <div class="mx-20">
            <div class="flex flex-row">
                <div class="basis-1/3 grid grid-cols-1">
                    <a
                        href="https://esculap-med.ru/MARKUP/build/index.html"
                        class="mb-10"
                    >
                        <img
                            src="/images/logo-gray.png"
                            alt="Логотип компании 'Эскулап'"
                            width="140"
                        />
                    </a>
                    <nav class="mb-8">
                        <ul class="flex gap-3">
                            <li v-for="index in 4" :key="index">
                                <a href="#">
                                    <ChatBubbleBottomCenterTextIcon
                                        class="h-6 text-sky-700"
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div class="text-zinc-400 text-sm font-light">esculap &copy; 2012-{{ currentYear }}</div>
                </div>

                <div class="basis-2/3">
                    <nav class="mb-12">
                        <ul class="flex justify-between font-condensed text-zinc-500 text-lg">
                            <li v-for="link in links" :key="link">
                                <a class="uppercase" href="#">
                                    {{ link }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p class="text-zinc-400 text-sm font-bold">
                        Сайт ESCULAP.ru предназначен исключительно для
                        медицинских работников.
                    </p>
                    <p class="text-zinc-400 text-sm font-light">
                        Размещенная на сайте информация может быть использована
                        только специалистами здравоохранения и не может быть
                        использована пациентами для принятия решения о
                        применении каких-либо продуктов или услуг. Данная
                        информация не может рассматрироваться как рекомендация
                        пациентам по диагностирования и лечению каких-либо
                        заболеваний и не может служить заменой очной
                        консультации с врачом.
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/outline";

const currentYear = new Date().getFullYear();
const links = [
    "О проекте",
    "Спонсорам",
    "Контакты",
    "Конфиденциальность",
    "Помощь",
];
</script>

<!-- <style scoped>
.container {
    width: 1180px;
}
</style> -->
