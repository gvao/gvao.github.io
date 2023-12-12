import Repository from "../../domain/models/repositories/products.js";

const url = "https://api.github.com/users/gvao/repos"

/**
 * @implements {Repository}
 */
export default class GithubRepository {

    products = null

    constructor() {
        this.fetchProjects()
    }

    async getAll() {
        if(!this.products ) {
            this.products = await this.fetchProjects()
        }
        return this.products
    }

    async fetchProjects() {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Couldn't get Github repositories from " + url);
            }
            const res_1 = res;
            const repositories = res_1.json();

            return await repositories;
        } catch (error) {
            return console.error(error);
        }
    }
}
