const sections = document.querySelectorAll("section");

const observer = CreateObserver();

const showElementOnWindow =
	({ offsetTop, id, children }) =>
	({ type }) => {
		if (!type === "scroll") return;

		const { scrollY, innerHeight } = window;
		const limit = scrollY + innerHeight / 2;
		const distance = offsetTop - limit;
		const percent = 1 - distance / (innerHeight / 2);

		Array.from(children).forEach((child) => {
			if (percent < 0) return;
			
			child.style.opacity = 0;

			if (percent > 1) {
				child.style.opacity = 1;
				child.style.scale = 1;
				child.style.filter = "blur(0)";
				return;
			}

			child.style.opacity = percent;
			child.style.filter = `blur(${50 - 50 * percent}px)`;
			child.style.scale = 0.5 + 0.5 * percent;
		});
	};

sections.forEach((section) => {
	observer.addObserver(showElementOnWindow(section));
});

document.addEventListener("scroll", (event) =>
	observer.notifyAll({ type: event.type })
);

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
