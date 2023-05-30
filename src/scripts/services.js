const url = "https://api.github.com/users/gvao/repos"

const getGithubRepositores = () => fetch(url)
    .then(res => res.json())
    .catch(console.error)
