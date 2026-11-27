"use strict";

/* reveal elements */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.15,
	},
);

revealElements.forEach((element) => {
	revealObserver.observe(element);
});

const counters = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const counter = entry.target;
				const target = Number(counter.dataset.target);
				const duration = 2000;
				const startTime = performance.now();

				function updateCounter(currentTime) {
					const progress = Math.min((currentTime - startTime) / duration, 1);

					const currentValue = Math.floor(progress * target);

					counter.textContent = currentValue;

					if (progress < 1) {
						requestAnimationFrame(updateCounter);
					} else {
						counter.textContent = target;
					}
				}

				requestAnimationFrame(updateCounter);
				observer.unobserve(counter);
			}
		});
	},
	{
		threshold: 0.5,
	},
);

counters.forEach((counter) => {
	counterObserver.observe(counter);
});

const navLinks = document.querySelectorAll(".nav-link");
const navBar = document.getElementById("mainNavbar");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navBar.classList.remove("show");
    })
})