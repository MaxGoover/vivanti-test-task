import { $t } from "@/i18n";
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
        isShowedDeleteModal: false,
        isShowedEditModal: false,
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
         * Сохраняет комментарий к статье.
         * @returns {Promise}
         */
        async create() {
            return axios.post(
                routeApi.newsComments.create(this.news_id),
                this.form
            );
        },

        /**
         * Удаляет комментарий.
         *
         * @returns {Promise}
         */
        async delete() {
            return axios.delete(routeApi.newsComments.delete(this.selected.id));
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

        /**
         * Редактирует комментарий статьи.
         * @returns {Promise}
         */
        async update() {
            return axios.put(
                routeApi.newsComments.update(this.selected.id),
                this.form
            );
        },

        async deleteComment() {
            this.delete()
                .then(() => {
                    this.clearList();
                    this.loadComments();
                    toast.success(
                        $t("message.success.comment.delete"),
                        config.toast
                    );
                })
                .catch(() =>
                    toast.error(
                        $t("message.error.comment.delete"),
                        config.toast
                    )
                );
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

        async updateComment() {
            this.update()
                .then(() => {
                    this.clearList();
                    this.clearFormParentId();
                    this.clearFormContent();
                    this.loadComments();
                    toast.success(
                        $t("message.success.comment.update"),
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

        hideDeleteModal() {
            this.isShowedDeleteModal = false;
        },

        hideEditModal() {
            this.isShowedEditModal = false;
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

        setFormContent(content) {
            this.form.content = content;
        },

        setFormNewsId(newsId) {
            this.form.news_id = newsId;
        },

        setFormParentId(commentId) {
            this.form.parent_id = commentId;
        },

        setNewsId(newsId) {
            this.news_id = newsId;
        },

        setSelected(comment) {
            this.selected = clone(comment);
        },

        showDeleteModal() {
            this.isShowedDeleteModal = true;
        },

        showEditModal() {
            this.isShowedEditModal = true;
        },

        showLoader() {
            this.isShowedLoader = true;
        },

        showReplyModal() {
            this.isShowedReplyModal = true;
        },
    },
});
