const projectList = document.querySelector('.projects-list')

const whiteListRepositories = [652663384, 523857175, 477349630, 639519294, 652333100, 622663732, 626637254, 624077765, 631251760]

const ProjectImagePresentation = (projectName) => `https://raw.githubusercontent.com/gvao/${projectName}/main/project-apresentation.png`

const insertProject = ({ id, name, description, html_url, homepage, ...props }) => {

    const liComponent = document.createElement('li')
    liComponent.setAttribute('class', 'project rounded')

    liComponent.innerHTML += `
        <div class="project-img rounded">
            <img src="${ProjectImagePresentation(name)}" alt="">
        </div>

        <div class="project-infos">

            <h3 class="project-subtitle">${name}</h3>
            <p class="project-description">
                ${description}
            </p>



        </div>

        <div class="project-actions d-flex items-center justify-between gap-1">

                <a class="button" target="_blank" href="${html_url}">
                    GitHub
                </a>
                <a class="button" target="_blank" href="${homepage}">
                    Website
                </a>

        </div>
    `

    projectList.insertAdjacentElement("afterbegin", liComponent)
}

class Project {
    id
    name
    description
    html_url
    homepage

    constructor({ id, name, description, html_url, homepage }) {
        this.id = id
        this.name = name
        this.description = description
        this.html_url = html_url
        this.homepage = homepage
    }
}

async function updateProjects() {
    const repositories = await getGithubRepositories()

    const filteredRepositories = repositories
        .filter(repository => whiteListRepositories.includes(repository.id))

    const projects = filteredRepositories
        .map(repo => new Project(repo))

    projects
        .forEach(insertProject)
}

updateProjects()