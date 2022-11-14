import { Dispatch } from "react";
import { useContextSelector } from "use-context-selector";
import { Theme, ThemeContext, ThemeContextValue } from "./ThemeProvider";

export const useThemeContextSelector = (
	selector: (value: ThemeContextValue | null) => any,
) => {
	return useContextSelector(ThemeContext, selector);
};

export const useThemeUpdater = () => {
	return useContextSelector(ThemeContext, (theme) => theme?.[1]);
};
