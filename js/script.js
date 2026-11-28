"use strict";
/* dark mode elements */
const darkModeToggle = document.getElementById("darkModeToggle");
const savedTheme = localStorage.getItem("theme");

/* observers elements */
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".stat-number");
const sections = document.querySelectorAll("sections");

const body = document.body;
/* navelements */
const navLinks = document.querySelectorAll(".nav-link");
const navBar = document.getElementById("mainNavbar");
/* scroll to top btn */
const scrollBtn = document.querySelector(".scrollDiv");



/* reveal elements */
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

/* count hero stats */
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

/* close nav on click of links */
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
 		navBar.classList.remove("show");
	});
});

/* close nav onclick of topbar Cta */
const topCta = document.querySelector("#topCta");
topCta.addEventListener("click", () => {
	navBar.classList.remove("show");
});

/* close navbar on click of document */
document.addEventListener("click", (e) => {
	const navToggle = document.querySelector(".navbar-toggler");
	const navIsOpen = navBar.classList.contains("show");
	const navtoggleTarget = navToggle.contains(e.target);
	const ul = navBar.contains(e.target);

	if (navIsOpen && !navtoggleTarget && !ul) {
		navBar.classList.remove("show");
	}
});

/* reveal scroll to top */
window.addEventListener("scroll", () => {
	if (scrollY > 1000) {
		scrollBtn.classList.add("show");
	} else {
		scrollBtn.classList.remove("show");
	}
});

/* toggle dark mode */
if (savedTheme) {
	body.setAttribute("data-theme", savedTheme);
} else { body.setAttribute("data-theme", "light") };


darkModeToggle.addEventListener("click", () => {
	const currentTheme = body.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	body.setAttribute("data-theme", newTheme);

	//save to storage
	localStorage.setItem("theme", newTheme);
});


/* add/remove active class on nav links */ 
const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				navLinks.forEach((link) => {
					link.classList.toggle(
						"active",
						link.getAttribute("href") === `#${entry.target.id}`,
					);
				});
			}
		});
	},
	{
		threshold: 0.1,
	},
);

sections.forEach((section) => sectionObserver.observe(section));