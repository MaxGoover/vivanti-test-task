import { $t } from "@/boot/i18n";
import { clone } from "lodash";
import { defineStore } from "pinia";
import { NewsComment } from "@/entities/news/NewsComment.js";
import { toast } from "vue3-toastify";
import { useForm } from "@inertiajs/vue3";
import axios from "axios";
import config from "@/utils/settings/config";
import routeApi from "@/routes/api.js";

export const useNewsCommentsStore = defineStore("newsComments", {
    state: () => ({
        count: 0, // кол-во комментариев к статье
        form: useForm(new NewsComment()),
        isLoadedAll: false,
        isShowedLoader: false,
        isShowedReplyModal: false,
        list: [], // список комментариев
        news_id: null,
        page: 1, // страница пагинации
        selected: useForm(new NewsComment()),
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
                routeApi.newsComments.create(this.news_id),
                this.form
            );
        },

        /**
         * Получает комментарии статьи.
         * @returns {Promise}
         */
        async index() {
            return axios.get(routeApi.newsComments.index(this.news_id), {
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
                    toast.error(
                        $t("message.error.comment.index"),
                        config.toast
                    );
                });
        },

        async saveComment() {
            this.setFormNewsId(this.news_id);
            this.create()
                .then(() => {
                    this.clearList();
                    this.clearFormParentId();
                    this.clearFormContent();
                    this.loadComments();
                    toast.success(
                        $t("message.success.comment.create"),
                        config.toast
                    );
                })
                .catch((err) => toast.error(err.message, config.toast));
        },

        addListComments(comments) {
            this.list = this.list.concat(comments);
        },

        clearList() {
            this.list = [];
        },

        clearSelected() {
            this.selected = new NewsComment();
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

        hideReplyModal() {
            this.isShowedReplyModal = false;
        },

        isCommentSelected(commentId) {
            return this.selected.id === commentId;
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

        setNewsId(newsId) {
            this.news_id = newsId;
        },

        setSelected(comment) {
            this.selected = clone(comment);
        },

        showLoader() {
            this.isShowedLoader = true;
        },

        showReplyModal() {
            this.isShowedReplyModal = true;
        },
    },
});
