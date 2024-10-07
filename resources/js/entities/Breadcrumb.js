/**
 * @property {string}  href
 * @property {string}  name
 */
export class Breadcrumb {
    href;
    name;

    constructor(href = "", name = "") {
        this.href = href;
        this.name = name;
    }
}
