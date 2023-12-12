import GetProjectsUseCase from "../@core/domain/use-cases/getProjects.js"
import GithubRepository from "../@core/infra/repositories/GithubRepository.js"

const projectList = document.querySelector('.projects-list')

const whiteList = [
    { id: 652663384 },
    { id: 523857175 },
    { id: 477349630 },
    { id: 639519294 },
    { id: 652333100 },
    { id: 622663732 },
    { id: 626637254 },
    { id: 624077765 },
    { id: 631251760 },
]

const whiteListIds = whiteList.map(({ id }) => id)

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

const getProjects = new GetProjectsUseCase(GithubRepository)
const projects = await getProjects.execute()

const filteredProjects = projects
    .filter(repository => whiteListIds.includes(repository.id))

console.log(filteredProjects);

filteredProjects
    .forEach(insertProject)

projectList.scrollLeft = 0