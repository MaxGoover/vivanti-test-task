// Роуты приложения
export default {
    news: {
        index: "/api/news",
    },
    newsComments: {
        create: (id) => `/api/news/${id}/comments`,
        delete: (id) => `/api/news/comments/${id}`,
        index: (id) => `/api/news/${id}/comments`,
        update: (id) => `/api/news/comments/${id}`,
    },
};
