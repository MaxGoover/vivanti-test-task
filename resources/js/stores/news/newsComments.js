import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { useForm, usePage } from "@inertiajs/vue3";
import axios from "axios";
import routeApi from "@/routes/api.js";

const page = usePage();

export const useNewsCommentsStore = defineStore("newsComments", {
    state: () => ({
        count: 0, // кол-во комментариев к статье
        form: useForm({
            news_id: null,
            parent_id: null,
            content: "",
        }),
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

        async loadComments() {
            return this.index()
                .then((res) => {
                    this.addListComments(res.data.comments.data);
                    this.setCount(res.data.countComments);

                    if (this.isPageLast(res.data.comments.last_page)) {
                        this.finishLoadComments();
                    } else {
                        this.offsetPage();
                    }
                })
                .catch(() => {
                    toast.error($t("message.error.comment.index"));
                });
        },

        addListComments(comments) {
            this.list = this.list.concat(comments);
        },

        clearList() {
            this.list = [];
        },

        clearFormContent() {
            this.form.content = null;
        },

        clearFormParentId() {
            this.form.parent_id = null;
        },

        finishLoadComments() {
            this.isLoadedAll = true;
        },

        hideLoader() {
            this.isShowedLoader = false;
        },

        isEqualFormParentId(commentId) {
            return this.form.parent_id === commentId
        },

        isLastInList(index) {
            return this.list.length - 1 === index;
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

        setFormParentId(parentId) {
            this.form.parent_id = parentId;
        },

        showLoader() {
            this.isShowedLoader = true;
        },
    },
});
