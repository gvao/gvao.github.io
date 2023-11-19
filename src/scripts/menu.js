const btnHamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__list");

const classNameToShow = "--show";
const delay = 2000

function debounce(fn, delay) {
	let timer;

	return () => {
		clearTimeout(timer);
		timer = setTimeout(fn, delay);
	};
}

const isShow = () => navList.classList.contains(classNameToShow);

const hideComponent = () => isShow() && navList.classList.remove(classNameToShow);

const debounceHideMenu = debounce(hideComponent, delay);

const showComponent = () => {
	if (!isShow()) navList.classList.add(classNameToShow);
	debounceHideMenu();
};

const toggle = () => !isShow() && showComponent();

navList.addEventListener("mousemove", showComponent);
btnHamburger.addEventListener("click", toggle);