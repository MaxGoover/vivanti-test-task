import { createInertiaApp } from '@inertiajs/vue3';
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import createServer from '@inertiajs/vue3/server';

// Import i18n
import { i18n } from './i18n';

// Import Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: () => `vivanti-test-task`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(i18n)
                .use(pinia)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
        },
    })
);
