const sections = document.querySelectorAll("section");

const observer = CreateObserver();

const apresentacaoElemento = element => ({ type, scrollY }) => {
    if (!type === "scroll") return;

    const diff = element.offsetTop - scrollY;
    const heightWindow20percent = window.innerHeight * 0.7;
    const percent = (diff * 1) / heightWindow20percent;

    element.style.opacity = 0;

    if (diff < 0) {
        element.style.opacity = 1;
        element.style.scale = 1;
        element.style.filter = "blur(0)";
        return;
    }
    
    if (diff < heightWindow20percent) {
        element.style.opacity = 1 - percent;
        element.style.filter = `blur(${100 * percent}px)`;
        if (percent < 0.5) {
            element.style.scale = 1 - percent;
        }
    }
}

sections.forEach((section) => {
	observer.addObserver(apresentacaoElemento(section));
});

document.addEventListener("scroll", (event) => {
	const { scrollY } = window;

	observer.notifyAll({ type: event.type, scrollY });
});

function CreateObserver() {
	const observers = [];

	const addObserver = (listener) => observers.push(listener);
	const notifyAll = (...data) =>
		observers.forEach((listener) => listener(...data));

	return {
		addObserver,
		notifyAll,
	};
}
