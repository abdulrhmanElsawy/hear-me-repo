import './css/learn.css';
import { useEffect } from 'react';

function importAll(handImages) {
	let images = {};
	handImages.keys().map((item, index) => {
	return images[item.replace('./', '').replace('.png', '')] = handImages(item);
	});
	return images;
}

const handImages = importAll(require.context('./hands', false, /\.(png)$/));

function Learn() {
useEffect(() => {
	const input = document.querySelector('.text-input');
	const handIcon = document.querySelector('.hand-icon');

	const alphabet = {
		a: `<img src="${handImages['a']}" alt="a hand sign">`,
		b: `<img src="${handImages['b']}" alt="b hand sign">`,
		c: `<img src="${handImages['c']}" alt="c hand sign">`,
		d: `<img src="${handImages['d']}" alt="d hand sign">`,
		e: `<img src="${handImages['e']}" alt="e hand sign">`,
		f: `<img src="${handImages['f']}" alt="f hand sign">`,
		g: `<img src="${handImages['g']}" alt="g hand sign">`,
		h: `<img src="${handImages['h']}" alt="h hand sign">`,
		i: `<img src="${handImages['i']}" alt="i hand sign">`,
		j: `<img src="${handImages['j']}" alt="j hand sign">`,
		k: `<img src="${handImages['k']}" alt="k hand sign">`,
		l: `<img src="${handImages['l']}" alt="l hand sign">`,
		m: `<img src="${handImages['m']}" alt="m hand sign">`,
		n: `<img src="${handImages['n']}" alt="n hand sign">`,
		o: `<img src="${handImages['o']}" alt="o hand sign">`,
		p: `<img src="${handImages['p']}" alt="p hand sign">`,
		q: `<img src="${handImages['q']}" alt="q hand sign">`,
		r: `<img src="${handImages['r']}" alt="r hand sign">`,
		s: `<img src="${handImages['s']}" alt="s hand sign">`,
		t: `<img src="${handImages['t']}" alt="t hand sign">`,
		u: `<img src="${handImages['u']}" alt="u hand sign">`,
		v: `<img src="${handImages['v']}" alt="v hand sign">`,
		w: `<img src="${handImages['w']}" alt="w hand sign">`,
		x: `<img src="${handImages['x']}" alt="x hand sign">`,
		y: `<img src="${handImages['y']}" alt="y hand sign">`,
		z: `<img src="${handImages['z']}" alt="z hand sign">`,
	};
	

	input.addEventListener('input', () => {
	const text = input.value.toLowerCase();
	let output = '';

	for (let i = 0; i < text.length; i++) {
		if (alphabet[text[i]]) {
		output += alphabet[text[i]];
		} else {
		output += text[i];
		}
	}

	handIcon.innerHTML = output;
	});
}, []);

return (
	<>

			<h3> Learn Sign Lang Letters </h3>
			<input type="text" className="text-input" placeholder="Enter a letter" />
			<div className="hand-icon"></div>
	</>
);
}

export default Learn;
