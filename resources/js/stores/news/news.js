import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
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
            return axios.get(routeApi.news.index, {
                params: { page: this.page },
            });
        },

        async loadNews() {
            this.index()
                .then((res) => {
                    this.addListNews(res.data.news.data);

                    if (this.isPageLast(res.data.news.last_page)) {
                        this.finishLoadNews();
                    } else {
                        this.offsetPage();
                    }
                })
                .catch(() => {
                    toast.error($t("message.error.news.index"));
                });
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
