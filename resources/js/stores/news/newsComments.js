// import { $t } from 'boot/i18n'
// import { cloneDeep } from 'lodash'
import { defineStore } from "pinia";
import axios from "axios";
// import notify from 'src/utils/helpers/notify'
import route from "@/routes/index.js";

export const useNewsCommentsStore = defineStore("newsComments", {
    state: () => ({
        form: {
            news_id: null,
            parent_id: null,
            content: "Тестовый комментарий",
        },
    }),

    actions: {
        /**
         * Сохраняет комментарий.
         * @returns {Promise}
         */
        async create() {
            return axios.post(route.newsComments.create, this.form);
        },

        setFormNewsId(newsId) {
            this.form.news_id = newsId;
        },
    },
});
