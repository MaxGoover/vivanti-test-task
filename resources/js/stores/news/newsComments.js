import { defineStore } from "pinia";
import axios from "axios";
import routeApi from "@/routes/api.js";

export const useNewsCommentsStore = defineStore("newsComments", {
    state: () => ({
        count: 0, // кол-во комментариев к статье
        form: {
            news_id: null,
            parent_id: null,
            content: "Тестовый комментарий",
        },
        isLoadedAll: false,
        isShowedLoader: false,
        list: [], // список комментариев
        page: 1, // страница пагинации
    }),

    getters: {
        isEmptyList: (state) => state.list.length === 0,
    },

    actions: {
        /**
         * Сохраняет комментарий.
         * @returns {Promise}
         */
        async create() {
            return axios.post(
                routeApi.newsComments.create(this.form.news_id),
                this.form
            );
        },

        /**
         * Получает комментарии статьи.
         * @returns {Promise}
         */
        async index() {
            return axios.get(routeApi.newsComments.index(this.form.news_id), {
                params: { page: this.page },
            });
        },

        addListComments(comments) {
            this.list = this.list.concat(comments);
        },

        clearList() {
            this.list = [];
        },

        finishLoadComments() {
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

        setCount(count) {
            this.count = count;
        },

        setFormNewsId(newsId) {
            this.form.news_id = newsId;
        },

        showLoader() {
            this.isShowedLoader = true;
        },
    },
});
