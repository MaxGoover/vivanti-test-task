/**
 * @property {string}  content
 * @property {int}     news_id
 * @property {int}     parent_id
 */
export class NewsComment {
    content;
    news_id;
    parent_id;

    constructor(content = "", news_id = null, parent_id = null) {
        this.content = content;
        this.news_id = news_id;
        this.parent_id = parent_id;
    }
}
