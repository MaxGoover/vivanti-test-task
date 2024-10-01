<template>
    <footer class="bottom-0 z-10 py-20 border-t">
        <div class="mx-20">
            <div class="flex flex-row">
                <!--Логотип + соц.сети-->
                <div class="basis-1/3 grid grid-cols-1">
                    <a
                        href="https://esculap-med.ru/MARKUP/build/index.html"
                        class="mb-10"
                    >
                        <img
                            src="/images/logo-gray.png"
                            width="140"
                            :alt="`${$t('image.logoCompany')} ${$t('site.name')}`"
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
                    <div class="text-zinc-400 text-sm font-light">
                        esculap &copy; 2012-{{ currentYear }}
                    </div>
                </div>

                <!--Панель навигации-->
                <div class="basis-2/3">
                    <nav class="mb-12">
                        <ul
                            class="flex justify-between font-condensed text-zinc-500 text-lg"
                        >
                            <li v-for="link in links" :key="link">
                                <a class="uppercase" href="#">
                                    {{ link }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p class="text-zinc-400 text-sm font-bold">
                        {{ $t('site.notIntended') }}.
                    </p>
                    <p class="text-zinc-400 text-sm font-light">
                        {{ $t('site.notRecommendation') }}..
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/outline";

const currentYear = new Date().getFullYear();
const links = [
    $t('menu.aboutProject'),
    $t('menu.toSponsors'),
    $t('menu.contacts'),
    $t('menu.confidentiality'),
    $t('menu.help'),
];
</script>
