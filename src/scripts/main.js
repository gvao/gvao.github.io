const projectList = document.querySelector('.projects-list')

async function updateProjects() {
    const repositores = await getGithubRepositores()

    // console.log(repositores);

    projectList.innerHTML = ''

    const blackListRepositores = [ 'gvao', "gestao-de-tempo", "timer" ]

    repositores

        .filter(repositore => !blackListRepositores.includes(repositore.name))

        .forEach(({ name, description, html_url, homepage, ...props }) => {

            console.log(props.visibility)

            projectList.innerHTML += `
            <li class="project rounded">
                <div class="project-img rounded">
                    <img src="src/images/projetos/${name}.png" alt="">
                </div>

                <div class="project-infos">

                    <h3 class="project-subtitle">${name}</h3>
                    <p class="project-description">
                        ${description}
                    </p>
                    <div class="project-actions d-flex items-center justify-between gap-5">

                        <a class="button" target="_blank" href="${html_url}">
                            GitHub
                        </a>
                        <a class="button" target="_blank" href="${homepage}">
                            Website
                        </a>

                    </div>
                </div>

            </li>
            `
        })

}

updateProjects()