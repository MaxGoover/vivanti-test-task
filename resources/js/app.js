import "./bootstrap";
import "../css/app.css";
import "../css/global.css";

// import styles for vue3-toastify
import "vue3-toastify/dist/index.css";

// Import i18n
import { i18n } from './boot/i18n';

// Import Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

createInertiaApp({
    title: () => `vivanti-test-task`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob("./pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18n)
            .use(pinia)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});
