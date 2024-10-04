import type { Action } from 'svelte/action';
import matterjs, { type Body } from 'matter-js';
const { Bodies, Common, Composite, Engine, World } = matterjs;

export const matter: Action<HTMLCanvasElement> = (canvas) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	canvas.width = 500;
	canvas.height = 500;

	const engine = Engine.create({
		gravity: { x: 0, y: 0 }
	});

	const circle = Bodies.circle(250, 250, 20);
	const leftWall = Bodies.rectangle(100, 250, 5, 305, { isStatic: true });
	const topWall = Bodies.rectangle(250, 100, 305, 5, { isStatic: true });
	const rightWall = Bodies.rectangle(400, 250, 5, 305, { isStatic: true });
	const bottomWall = Bodies.rectangle(250, 400, 305, 5, { isStatic: true });
	const walls = [leftWall, topWall, rightWall, bottomWall];
	const bodies = [circle, ...walls];

	Composite.add(engine.world, bodies);

	const renderWall = (body: Body) => {
		ctx.beginPath();
		body.vertices.forEach(({ x, y }) => ctx.lineTo(x, y));
		ctx.closePath();
		ctx.fillStyle = 'cyan';
		ctx.fill();
	};

	let lastTime = Common.now();
	const renderCicle = (body: Body) => {
		ctx.beginPath();

		const now = Common.now();
		if (now - lastTime >= 100) {
			body.vertices.forEach((vertex) => {
				const center = body.position;
				let rx = vertex.x - center.x;
				let ry = vertex.y - center.y;
				const { r, theta } = cartesianToPolar(rx, ry);
				({ x: rx, y: ry } = polarToCartesian(r + 1, theta));
				vertex.x = center.x + rx;
				vertex.y = center.y + ry;
			});
			lastTime = now;
		}

		body.vertices.forEach(({ x, y }) => ctx.lineTo(x, y));
		ctx.closePath();
		ctx.fillStyle = 'blue';
		ctx.fill();
	};

	let frame: number;
	const run = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		walls.forEach(renderWall);
		renderCicle(circle);

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

// const every = (ms: number, fn: (...args: unknown[]) => void): (() => void) => {
// 	let lastRun = Common.now();

// 	const run = () => {
// 		const now = Common.now();
// 		if (now - lastRun >= ms) {
// 			fn();
// 			lastRun = now;
// 		}
// 	};

// 	return run;
// };

const cartesianToPolar = (x: number, y: number): { r: number; theta: number } => ({
	r: Math.sqrt(x ** 2 + y ** 2),
	theta: Math.atan2(y, x)
});

const polarToCartesian = (r: number, theta: number): { x: number; y: number } => ({
	x: r * Math.cos(theta),
	y: r * Math.sin(theta)
});
