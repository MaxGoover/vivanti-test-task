// Роуты приложения
export default {
    news: {
        index: "/news",
        show: (id) => `/news/${id}`,
    },
    newsComments: {
        create: "/news/comments",
        index: (id) => `/news/${id}/comments/`,
    },
    home: {
        index: "/",
    },
};
