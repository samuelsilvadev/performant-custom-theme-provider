import { useContextSelector } from "use-context-selector";
import { ThemeContext, ThemeContextValue } from "./ThemeProvider";

export const useThemeContextSelector = <FinalReturn>(
	selector: (value: ThemeContextValue | null) => FinalReturn,
) => {
	return useContextSelector<ThemeContextValue | null, FinalReturn>(
		ThemeContext,
		selector,
	);
};

export const useThemeUpdater = () => {
	return useContextSelector(ThemeContext, (theme) => theme?.[1]);
};
