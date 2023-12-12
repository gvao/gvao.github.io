import Project from '../entities/project.js'
import Repository from '../models/repositories/products.js'

export default class GetProjectsUseCase {
    /**
     * @param {Repository} repository 
     */
    constructor(repository) {
        this.repository = repository
    }

    /** @returns {Promise<Project[]>} */
    async execute() {
        return await this.repository.getAll()
    }
}