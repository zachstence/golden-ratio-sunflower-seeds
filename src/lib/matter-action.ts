import type { Action } from 'svelte/action';
import matterjs, { type Body } from 'matter-js';
const { Bodies, Common, Composite, Engine, World } = matterjs;

export const matter: Action<HTMLCanvasElement> = (canvas) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	canvas.width = 500;
	canvas.height = 500;

	const engine = Engine.create({ gravity: { x: 0, y: 0 } });

	const box = Bodies.rectangle(250, 250, 40, 40);

	Composite.add(engine.world, [box]);

	let i = 0;
	let lastTime = Common.now();
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	const renderBody = (body: Body) => {
		ctx.beginPath();
		body.vertices.forEach(({ x, y }) => ctx.lineTo(x, y));
		ctx.closePath();
		if (Common.now() - lastTime > 1000) {
			i = (i + 1) % colors.length;
			lastTime = Common.now();
		}
		ctx.fillStyle = colors[i];
		ctx.fill();
	};

	let frame: number;
	const run = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		renderBody(box);
		Engine.update(engine);
		frame = requestAnimationFrame(run);
	};

	run();

	return {
		destroy: () => {
			canvas.remove();
			World.clear(engine.world, false);
			Engine.clear(engine);
			cancelAnimationFrame(frame);
		}
	};
};
