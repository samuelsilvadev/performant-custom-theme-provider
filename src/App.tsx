import { Routes, Route } from "react-router-dom";
import { Root } from "./Root";
import { ThemeProvider } from "./theme";

function App() {
	return (
		<ThemeProvider>
			<Routes>
				<Route path="/" element={<Root />} />
				<Route path="/example" element={<h1>Example Route</h1>} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
