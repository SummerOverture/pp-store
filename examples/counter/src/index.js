import React, { useEffect } from 'react';
import { render } from 'react-dom';
import counterStore, { useCounterStore, TYPES } from './store';

function App(props) {
	const [countObj, setCount] = useCounterStore({});
	const { count } = countObj;

	useEffect(() => {
		const unSub = counterStore.subscribe(function () {
			console.log('store changed', counterStore.getShareState());
		});
		return () => unSub();
	});
	return (
		<div>
			<button
				onClick={() => {
					setCount({
						type: TYPES.INCRESE,
					});
				}}
			>
				+
			</button>
			<button
				onClick={() => {
					setCount({
						type: TYPES.DECRESE,
					});
				}}
			>
				-
			</button>
			<button
				onClick={() => {
					setCount({
						type: TYPES.SET_COUNT,
						params: {
							count: Math.ceil(Math.random() * 100),
						},
					});
				}}
			>
				fetch
			</button>
			<p> current count: {count}</p>
		</div>
	);
}

render(<App />, document.getElementById('root'));
