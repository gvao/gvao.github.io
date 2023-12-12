import Project from "../../domain/entities/project.js";
import Repository from "../../domain/models/repositories/products.js";

const url = "https://api.github.com/users/gvao/repos"

/**
 * @implements {Repository}
 */
export class GithubRepository {

    /** @type {Project[]} */
    products = null

    constructor() {
        this.fetchProjects()
    }

    async getAll() {
        let projectsData
        if (!this.products) {
            projectsData = await this.fetchProjects()
        }
        this.products = projectsData.map(data => new Project(data))

        return this.products
    }

    /** @returns {Promise<Array>} */
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

export default new GithubRepository()