const projectList = document.querySelector('.projects-list')

const whiteListRepositores = [ 523857175, 477349630, 639519294, 652333100, 622663732, 626637254, 624077765, 631251760 ]

const projectImageApresentation = (projectName) => `https://raw.githubusercontent.com/gvao/${projectName}/main/project-apresentation.png`

const insertProject = ({ id, name, description, html_url, homepage, ...props }) => {

    const liComponent = document.createElement('li')
    liComponent.setAttribute('class', 'project rounded')

    liComponent.innerHTML += `
        <div class="project-img rounded">
            <img src="${projectImageApresentation(name)}" alt="">
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

    projectList.insertAdjacentElement("beforeend", liComponent)
}

async function updateProjects() {
    const repositores = await getGithubRepositores()

    console.log(repositores);

    repositores
        .filter(repositore => whiteListRepositores.includes(repositore.id))
        .forEach(insertProject)

}

updateProjects()