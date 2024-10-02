import { defineStore } from "pinia";
import axios from "axios";
import routeApi from "@/routes/api.js";

export const useNewsStore = defineStore("news", {
    state: () => ({
        isLoadedAll: false,
        isShowedLoader: false,
        list: [], // список статей
        page: 1, // страница пагинации
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
            return axios
                .get(routeApi.news.index, {
                    params: { page: this.page },
                })
        },

        addListNews(news) {
            this.list = this.list.concat(news);
        },

        clearList() {
            this.list = [];
        },

        finishLoadNews() {
            this.isLoadedAll = true;
        },

        hideLoader() {
            this.isShowedLoader = false;
        },

        isPageLast(lastPage) {
            return this.page === lastPage;
        },

        offsetPage() {
            this.page++;
        },

        showLoader() {
            this.isShowedLoader = true;
        },
    },
});
