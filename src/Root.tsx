import { useEffect, useRef, useState } from "react";
import { useThemeContextSelector, useThemeUpdater } from "./theme";

const generateRandomColor = () =>
	Math.floor(Math.random() * 16777215).toString(16);

const ReRendered = () => {
	const count = useRef(0);
	const ref = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (ref.current) {
			count.current = count.current + 1;
			ref.current.innerText = String(count.current);
		}
	});

	return (
		<div>
			<p>
				Rerenders count: <span ref={ref}>{count.current}</span>
			</p>
		</div>
	);
};

const ColoredViaTheme = () => {
	const color: string = useThemeContextSelector((state) => {
		return state?.[0].color ?? "";
	});

	return (
		<h2
			style={{
				color,
			}}
		>
			My color is set via theme
			<ReRendered />
		</h2>
	);
};

const BackgroundViaTheme = () => {
	const background = useThemeContextSelector((state) => {
		return state?.[0].background;
	});

	return (
		<h2
			style={{
				background,
			}}
		>
			My background is set via theme
			<ReRendered />
		</h2>
	);
};

export const Root = () => {
	const updateTheme = useThemeUpdater();

	return (
		<section
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				textAlign: "center",
			}}
		>
			<h1>
				This page demonstrate the usage of react context but only updates the
				necessary part when the theme changes
			</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
					gap: "50px",
					alignItems: "center",
				}}
			>
				<ColoredViaTheme />
				<BackgroundViaTheme />
				<BackgroundViaTheme />
				<ColoredViaTheme />
			</div>
			<button
				type="button"
				onClick={() => {
					updateTheme?.((oldTheme) => ({
						...oldTheme,
						background: `#${generateRandomColor()}`,
					}));
				}}
			>
				Update background color
			</button>
			<button
				type="button"
				onClick={() => {
					updateTheme?.((oldTheme) => ({
						...oldTheme,
						color: `#${generateRandomColor()}`,
					}));
				}}
			>
				Update color
			</button>
			<button
				type="button"
				onClick={() => {
					updateTheme?.({
						background: `#${generateRandomColor()}`,
						color: `#${generateRandomColor()}`,
					});
				}}
			>
				Update All
			</button>
		</section>
	);
};
