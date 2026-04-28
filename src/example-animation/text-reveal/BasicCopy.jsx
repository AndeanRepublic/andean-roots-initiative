"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import "./Copy.css";

gsap.registerPlugin(SplitText);

export default function BasicCopy({ children, delay = 0 }) {
	const containerRef = useRef(null);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			let elements = [];

			if (containerRef.current.hasAttribute("data-copy-wrapper")) {
				elements = Array.from(containerRef.current.children);
			} else {
				elements = [containerRef.current];
			}

			const splits = [];
			const allWords = [];

			elements.forEach((element) => {
				const split = SplitText.create(element, {
					type: "words,chars",
					wordsClass: "copy-word",
					charsClass: "copy-char",
				});

				splits.push(split);

				split.words.forEach((word) => {
					allWords.push({ chars: [...word.querySelectorAll(".copy-char")] });
				});
			});

			const allTargets = allWords.flatMap(({ chars }) => chars);

			gsap.set(elements, {
				perspective: 700,
				transformStyle: "preserve-3d",
			});

			gsap.set(allTargets, {
				opacity: 0,
				rotationX: -90,
				transformOrigin: "50% 50% -50px",
			});

			const tl = gsap.timeline();

			allWords.forEach(({ chars }) => {
				const wordTl = gsap.timeline().to(chars, {
					rotationX: 0,
					opacity: 1,
					duration: 0.75,
					ease: "power3.out",
					stagger: {
						each: 0.035,
						from: "random",
					},
				});

				tl.add(wordTl, delay + Math.random() * 0.4);
			});

			return () => {
				splits.forEach((split) => split.revert());
			};
		},
		{
			scope: containerRef,
			dependencies: [delay],
		},
	);

	if (React.Children.count(children) === 1) {
		return React.cloneElement(children, { ref: containerRef });
	}

	return (
		<div ref={containerRef} data-copy-wrapper="true">
			{children}
		</div>
	);
}
