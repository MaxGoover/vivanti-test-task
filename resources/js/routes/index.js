// Роуты приложения
export default {
    news: {
        index: "/news",
        show: (id) => `/news/${id}`,
    },
    newsComments: {
        index: (id) => `/news/${id}/comments/`,
    },
    home: {
        index: "/",
    },
};
