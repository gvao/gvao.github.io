const url = "https://api.github.com/users/gvao/repos"

let githubRepositoresCached = []

const getGithubRepositores = () => fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error("Couldn't get Github repositories from " + url)
        }
        return res
    })
    .then(res => {
        const repositores = res.json()
        githubRepositoresCached = repositores
        return repositores
    })
    .catch(console.error)
