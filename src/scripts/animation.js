const sections = document.querySelectorAll("section");

const observer = CreateObserver();

const showElementOnWindow =
	(section) =>
	({ type, scrollY }) => {
		if (!type === "scroll") return;

		const diff = section.offsetTop - scrollY;
		const heightWindow20percent = window.innerHeight * 0.7;
		const percent = (diff * 1) / heightWindow20percent;

		const { children } = section;

		Array.from(children).forEach((child) => {
			child.style.opacity = 0;

			if (diff < 0) {
				child.style.opacity = 1;
				child.style.scale = 1;
				child.style.filter = "blur(0)";
				return;
			}

			if (diff < heightWindow20percent) {
				child.style.opacity = 1 - percent;
				child.style.filter = `blur(${100 * percent}px)`;
				if (percent < 0.5) {
					child.style.scale = 1 - percent;
				}
			}
		});
	};

sections.forEach((section) => {
	observer.addObserver(showElementOnWindow(section));
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
