const btnHamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__list");

const classNameToShow = "--show";
const classNameToHide = "--hide";
const delay = 2000;

const isShow = () => navList.classList.contains(classNameToShow);

function debounce(fn, delay) {
	let timer;

	return {
		break() {
			if (!timer) return;
			clearTimeout(timer);
			timer = null;
			// console.log(`timer break`);
		},
		continue() {
			clearTimeout(timer);
			timer = setTimeout(fn, delay);
			// console.log(`timer continue`);
		},
	};
}

const classNameToRemove = () => (isShow() ? classNameToShow : classNameToHide);
const classNameToAdd = () => (!isShow() ? classNameToShow : classNameToHide);

const toggle = () => {
	const toRemove = classNameToRemove();
	const toAdd = classNameToAdd();

	navList.classList.remove(toRemove);
	navList.classList.add(toAdd);

	if (toAdd === classNameToHide) return debounceHideMenu.break();
	debounceHideMenu.continue();
};

const debounceHideMenu = debounce(toggle, delay);

navList.addEventListener("mousemove", debounceHideMenu.break);
navList.addEventListener("mouseleave", debounceHideMenu.continue);
btnHamburger.addEventListener("click", toggle);
