import { useRef } from "react";

const DisplayCount = ({ count }: { count: number }) => {
	return (
		<p>
			Rerenders count: <span>{count}</span>
		</p>
	);
};

export const RenderCount = () => {
	const count = useRef(0);

	return (
		<div>
			<DisplayCount count={count.current++} />
		</div>
	);
};
