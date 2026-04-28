import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(CustomEase, SplitText);
	CustomEase.create("hop", ".8, 0, .3, 1");

	const splitTextElements = (selector, type = "words,chars") => {
		const elements = document.querySelectorAll(selector);
		elements.forEach((element) => {
			const splitText = new SplitText(element, {
				type,
				wordsClass: "word",
				charsClass: "char",
			});

			if (type.includes("chars")) {
				splitText.chars.forEach((char, index) => {
					const originalText = char.textContent;
					char.innerHTML = `<span>${originalText}</span>`;
				});
			}
		});
	};

	splitTextElements("h2", "words, chars");

	const isMobile = window.innerWidth <= 1000;

	gsap.set(
		[
			".split-overlay .andean .char span",
			".split-overlay .roots .char span",
			".split-overlay .initiative .char span",
		],
		{ y: "0%" },
	);

	gsap.set(".container .hero-img", { scale: 1.3 });

	// Mobile: apilar palabras y establecer estado inicial del container
	if (isMobile) {
		gsap.set(".andean", { y: "-3.5rem" });
		gsap.set(".initiative", { y: "3.5rem" });
		gsap.set(".container", {
			clipPath: "polygon(0% 49.5%, 0% 49.5%, 0% 50.5%, 0% 50.5%)",
		});
	}

	const tl = gsap.timeline({ defaults: { ease: "hop" } });
	const arcProxy = { t: 0 };

	const bezier = (t, p0, p1, p2, p3) => {
		const mt = 1 - t;
		return (
			mt * mt * mt * p0 +
			3 * mt * mt * t * p1 +
			3 * mt * t * t * p2 +
			t * t * t * p3
		);
	};

	tl.to(
		[
			".preloader .andean .char span",
			".preloader .roots .char span",
			".preloader .initiative .char span",
		],
		{ y: "0%", duration: 0.75, stagger: 0.05 },
		0.5,
	);
	tl.to(
		[
			".split-overlay .andean .char span",
			".split-overlay .roots .char span",
			".split-overlay .initiative .char span",
		],
		{ y: "0%", duration: 0.75, stagger: 0.05 },
		0.5,
	);

	if (isMobile) {
		tl.to(".andean", { y: "-2.5rem", duration: 0.75 }, 2);
		tl.to(".initiative", { y: "2.5rem", duration: 0.75 }, 2);
	}

	if (!isMobile) {
		tl.to(
			arcProxy,
			{
				t: 1,
				duration: 1.2,
				ease: "power2.inOut",
				onUpdate: () => {
					const t = arcProxy.t;
					gsap.set(".andean", {
						x: bezier(t, 0, 1, 12, 19) + "rem",
						y: bezier(t, 0, -5, -4, -3.7) + "rem",
					});
					gsap.set(".initiative", {
						x: bezier(t, 0, -1, -13, -21) + "rem",
						y: bezier(t, 0, 5, 4, 3.7) + "rem",
					});
				},
			},
			2,
		);
	}

	tl.to(".roots", { scale: 1.25, duration: 0.75 }, isMobile ? 2 : "<");
	tl.to(
		".initiative",
		{
			scale: 0.8,
			duration: 0.75,
			onComplete: () => {
				gsap.set(".preloader", {
					clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
				});
				gsap.set(".split-overlay", {
					clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
				});
			},
		},
		"<",
	);
	tl.to(
		".container",
		{
			clipPath: isMobile
				? "polygon(0% 49.5%, 100% 49.5%, 100% 50.5%, 0% 50.5%)"
				: "polygon(0% 49%, 100% 49%, 100% 51%, 0% 51%)",
			duration: 1,
		},
		3.5,
	);
	tl.to(
		[".preloader", ".split-overlay"],
		{ y: (i) => (i === 0 ? "-50%" : "50%"), duration: 1 },
		4.5,
	);
	tl.to(
		".container",
		{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 },
		4.5,
	);
	tl.to(".container .hero-img", { scale: 1, duration: 1 }, 4.5);
});
