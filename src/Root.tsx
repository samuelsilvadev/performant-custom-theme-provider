import { useEffect, useState } from "react";
import { RenderCount } from "./RenderCount";
import { useThemeContextSelector, useThemeUpdater } from "./theme";
import throttle from "lodash.throttle";

const generateRandomColor = () =>
	Math.floor(Math.random() * 16777215).toString(16);

const ColoredViaTheme = () => {
	const color = useThemeContextSelector((state) => {
		return state?.[0].color ?? "";
	});

	return (
		<h2
			style={{
				color,
			}}
		>
			My color is set via theme
			<RenderCount />
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
			<RenderCount />
		</h2>
	);
};

const Header = () => {
	const background = useThemeContextSelector((state) => {
		return state?.[0].headerBackground ?? "";
	});

	const updateTheme = useThemeUpdater();

	useEffect(() => {
		const handleScroll = throttle(() => {
			updateTheme?.((oldTheme) => ({
				...oldTheme,
				headerBackground: `#${generateRandomColor()}`,
			}));
		}, 500);

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [updateTheme]);

	return (
		<header
			style={{
				position: "sticky",
				top: "0",
				background,
				textAlign: "center",
				fontSize: "32px",
				padding: "20px 0",
			}}
		>
			Header that constantly updates its color 🤷‍♀️
			<RenderCount />
		</header>
	);
};

export const Root = () => {
	const updateTheme = useThemeUpdater();

	return (
		<div
			style={{
				minHeight: "150vh",
			}}
		>
			<Header />
			<section
				style={{
					maxWidth: "800px",
					margin: "0 auto",
					textAlign: "center",
				}}
			>
				<h1>
					This page demonstrate the usage of react context with specific updates
					only on the correct components after the whole theme changes
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
						updateTheme?.((oldTheme) => ({
							...oldTheme,
							background: `#${generateRandomColor()}`,
							color: `#${generateRandomColor()}`,
						}));
					}}
				>
					Update All
				</button>
			</section>
		</div>
	);
};
