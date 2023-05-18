const hamburgerMenu = document.querySelector('#hamburger-menu')
const menu = document.querySelector('#menu')

hamburgerMenu.addEventListener('click', event => {
    menu.classList.toggle('hidden')
})