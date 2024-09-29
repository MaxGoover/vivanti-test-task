import { defineStore } from "pinia";
import axios from "axios";
import routeApi from "@/routes/api.js";

export const useNewsStore = defineStore("news", {
    state: () => ({
        list: [], // список статей
    }),

    getters: {
        isEmptyList: (state) => state.list.length === 0,
    },

    actions: {
        /**
         * Получает статьи.
         * @returns {Promise}
         */
        async index() {
            console.log('news');

            return axios.get(routeApi.news.index).then((res) => {
                this.addListNews(res.data.news.data);
            });
        },

        addListNews(news) {
            this.list = this.list.concat(news);
        },

        clearList() {
            this.list = [];
        },
    },
});
