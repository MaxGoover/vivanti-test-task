// Роуты приложения
export default {
    news: {
        index: "/api/news",
    },
    newsComments: {
        create: (id) => `/api/news/${id}/comments`,
        index: (id) => `/api/news/${id}/comments`,
    },
};
