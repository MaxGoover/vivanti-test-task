<template>
    <header
        class="sticky top-0 z-20 flex justify-between border-b bg-zinc-500 h-16 px-16"
    >
        <!--Логотип-->
        <div class="h-16">
            <a href="/news">
                <img
                    src="/logo.png"
                    class="h-16"
                    :alt="`${$t('image.logoCompany')} ${$t('company.name')}`"
                />
            </a>
        </div>

        <!--Список выпадающих меню-->
        <div>
            <ul class="flex flex-row items-center h-full text-sm font-medium">
                <li class="ml-2.5">
                    <NewsMenuDropdown
                        :menu="menuEducation"
                        :title="$t('menu.education')"
                    />
                </li>
                <li class="ml-2.5">
                    <NewsMenuDropdown
                        :menu="menuPublications"
                        :title="$t('menu.experts')"
                    />
                </li>
                <li class="ml-2.5 text-white uppercase">
                    {{ $t("menu.publications") }}
                </li>
                <li class="ml-2.5 text-white">
                    <NewsMenuDropdown
                        :menu="menuAboutProject"
                        :title="$t('menu.aboutProject')"
                    />
                </li>
            </ul>
        </div>

        <!--Аутентификация/Профиль-->
        <div>
            <ul class="flex flex-row items-center h-full text-sm font-medium">
                <li class="ml-2.5 text-white uppercase">
                    <a href="#" class="px-4"> {{ $t("action.signUp") }} </a>
                </li>
                <li class="ml-2.5 px-5 py-1.5 h-3/6 bg-white uppercase">
                    <a href="#"> {{ $t("action.enter") }} </a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { $t } from "@/boot/i18n";
import NewsMenuDropdown from "@/components/news/NewsMenuDropdown.vue";

const menuEducation = [
    $t("menu.experts"),
    $t("menu.publications"),
    $t("menu.aboutProject"),
];
const menuPublications = [
    $t("menu.experts"),
    $t("menu.publications"),
    $t("menu.aboutProject"),
];
const menuAboutProject = [
    $t("menu.experts"),
    $t("menu.publications"),
    $t("menu.aboutProject"),
    $t("menu.experts"),
    $t("menu.publications"),
    $t("menu.aboutProject"),
    $t("menu.experts"),
    $t("menu.publications"),
    $t("menu.aboutProject"),
];
</script>
