// Роуты приложения
export default {
    news: {
        index: "/news",
        show: (id) => `/news/${id}`,
    },
    home: {
        index: "/",
    },
};
