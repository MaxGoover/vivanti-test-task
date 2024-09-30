import { defineStore } from "pinia";
import axios from "axios";
import route from "@/routes/index.js";
import routeApi from "@/routes/api.js";

export const useNewsCommentsStore = defineStore("newsComments", {
    state: () => ({
        count: 0, // кол-во комментариев к статье
        form: {
            news_id: null,
            parent_id: null,
            content: "Тестовый комментарий",
        },
        list: [], // список комментариев
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
            return axios.post(routeApi.newsComments.create(this.form.news_id), this.form);
        },

        /**
         * Получает комментарии статьи.
         * @returns {Promise}
         */
        async index() {
            return axios
                .get(routeApi.newsComments.index(this.form.news_id))
                .then((res) => {
                    this.addListComments(res.data.comments.data);
                    this.setCount(res.data.countComments);
                });
        },

        addListComments(comments) {
            this.list = this.list.concat(comments);
        },

        clearList() {
            this.list = [];
        },

        setCount(count) {
            this.count = count;
        },

        setFormNewsId(newsId) {
            this.form.news_id = newsId;
        },
    },
});
