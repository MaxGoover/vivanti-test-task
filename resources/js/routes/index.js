// Роуты приложения
export default {
    news: {
        index: "/news",
        show: (id) => `/news/${id}`,
    },
    newsComments: {
        create: '/news/comments',
        delete: (id) => `/news/comments/${id}`,
        update: (id) => `/news/comments/${id}`,
    },
    home: {
        index: "/",
    },
};
