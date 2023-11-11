const btnHamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__list");

function CreateMenu(delay = 2) {
	const component = navList;
	let interval = null;
	let seconds = 0;
	const classNameToShow = "--show";

	const isShow = () => component.classList.contains(classNameToShow);

	function intervalCleanup() {
		if (!interval) return;
		clearInterval(interval);
		interval = null;
        seconds = 0
	}

	function hideComponent() {
		component.classList.remove(classNameToShow);
		intervalCleanup();
	}
    
	function showComponent() {
        component.classList.add(classNameToShow);
	}
    
	function startToHide() {
        console.log(`start to hide`);
        
        intervalCleanup();
		interval = setInterval((duration) => {
            console.log(seconds === duration)
            if ( seconds === duration) {

                hideComponent();
                console.log(`hide component`);
                return;
            }

            seconds++
        }, 1000, delay );
	}

	function toggle() {
		if (isShow()) return hideComponent();
		showComponent();
        startToHide()
	}

	return {
		stopHide: intervalCleanup,
		startToHide,
		toggle,
	};
}
const menu = CreateMenu();

navList.addEventListener("mousemove", menu.stopHide);
navList.addEventListener("mouseleave", menu.startToHide);
btnHamburger.addEventListener("click", menu.toggle);
