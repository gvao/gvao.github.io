const categories = ['front-end', 'back-end', 'full-stack']

export default class Project {
    id
    name
    description
    html_url
    homepage
    tags = []

    constructor({ id, name, description, html_url, homepage }, category = categories[0]) {
        this.id = id
        this.name = name
        this.description = description
        this.html_url = html_url
        this.homepage = homepage

        if (!categories.includes(category)) throw new Error()
        this.category = category
    }
}
