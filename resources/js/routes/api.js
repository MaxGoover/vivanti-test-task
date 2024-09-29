// Роуты приложения
export default {
    news: {
        index: "/api/news",
    },
    newsComments: {
        index: (id) => `/api/news/${id}/comments`,
    },
};
