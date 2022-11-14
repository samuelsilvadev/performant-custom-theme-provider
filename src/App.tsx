import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<h1>Root Route</h1>} />
			<Route path="/example" element={<h1>Example Route</h1>} />
		</Routes>
	);
}

export default App;
