import { Dispatch, FC, SetStateAction, useState } from "react";
import { createContext } from "use-context-selector";

export type Theme = {
	color: string;
	background: string;
	headerBackground: string;
};

export type ThemeContextValue = [Theme, Dispatch<SetStateAction<Theme>>];

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: FC = (props) => {
	const theme = useState({
		color: "red",
		background: "pink",
		headerBackground: "blueviolet",
	});

	return (
		<ThemeContext.Provider value={theme}>
			{props.children}
		</ThemeContext.Provider>
	);
};

ThemeContext.displayName = "ThemeContext";
