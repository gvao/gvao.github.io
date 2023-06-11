const projectList = document.querySelector('.projects-list')
const projectImageApresentation = (projectName) => `https://raw.githubusercontent.com/gvao/${projectName}/main/project-apresentation.png`

const insertProject = ({ name, description, html_url, homepage, ...props }) => {
    console.log('insertProject');
    projectList.innerHTML += `
    <li class="project rounded">
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

    </li>
    `
}

const hasImageProjectApresentation = async ({ name }) => {
    console.log('hasImageProjectApresentation');
    const imageRequest = await fetch(projectImageApresentation(name))
    return imageRequest.ok;
}

async function updateProjects() {
    const repositores = await getGithubRepositores()

    console.log(repositores);
    projectList.innerHTML = ''

    const blackListRepositores = ['gvao', "gestao-de-tempo", "timer"]

    repositores
        .filter(repositore => !blackListRepositores.includes(repositore.name) && hasImageProjectApresentation(repositore))
        .forEach(insertProject)

}

updateProjects()