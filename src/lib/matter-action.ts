import type { Action } from 'svelte/action';
import matterjs, { type Body, type IBodyDefinition, type Vector } from 'matter-js';
const { Bodies, Common, Composite, Engine, Events, World } = matterjs;

export const matter: Action<HTMLCanvasElement> = (canvas) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	canvas.width = 500;
	canvas.height = 500;

	const engine = Engine.create({
		gravity: { x: 0, y: 0 }
	});

	const collidedVertices = new Set<Vector>();
	// const collidedVerticesByBodyId: Record<number, Set<Vector>> = {};

	const circle1 = circle(150, 150, 20, { id: 1, isSensor: true, angle: 30 });
	const circle2 = circle(350, 350, 20, { id: 2, isSensor: true });
	const circles = [circle1, circle2];

	const leftWall = Bodies.rectangle(100, 250, 5, 305, { isSensor: true });
	const topWall = Bodies.rectangle(250, 100, 305, 5, { isSensor: true });
	const rightWall = Bodies.rectangle(400, 250, 5, 305, { isSensor: true });
	const bottomWall = Bodies.rectangle(250, 400, 305, 5, { isSensor: true });
	const walls = [leftWall, topWall, rightWall, bottomWall];

	const bodies = [...circles, ...walls];

	Composite.add(engine.world, bodies);

	const renderWall = (body: Body) => {
		ctx.beginPath();
		body.vertices.forEach(({ x, y }) => ctx.lineTo(x, y));
		ctx.closePath();
		ctx.fillStyle = 'cyan';
		ctx.fill();
	};

	const lastTimeByBodyId: Record<number, number> = {};
	const updateCircle = (body: Body) => {
		const lastTime = lastTimeByBodyId[body.id] ?? 0;
		const now = Common.now();
		if (now - lastTime >= 10) {
			body.vertices.forEach((vertex) => {
				if (collidedVertices.has(vertex)) return;
				const center = body.position;
				let rx = vertex.x - center.x;
				let ry = vertex.y - center.y;
				const { r, theta } = cartesianToPolar(rx, ry);
				({ x: rx, y: ry } = polarToCartesian(r + 0.5, theta));
				vertex.x = center.x + rx;
				vertex.y = center.y + ry;
			});
			lastTimeByBodyId[body.id] = now;
		}
	};

	const renderCicle = (body: Body) => {
		ctx.beginPath();
		body.vertices.forEach(({ x, y }) => ctx.lineTo(x, y));
		ctx.closePath();
		ctx.strokeStyle = body.id === 1 ? 'blue' : 'red';
		ctx.stroke();
	};

	Events.on(engine, 'collisionActive', (event) => {
		event.pairs.forEach((pair) => {
			pair.contacts.forEach((contact) => {
				if (!contact.vertex) return;

				const circle = circles.find(
					(circle) => circle.id === pair.bodyA.id || circle.id === pair.bodyB.id
				);
				if (!circle) {
					// console.error('Circle not found');
					return;
				}

				collidedVertices.add(contact.vertex);
			});
		});
	});

	let frame: number;
	const run = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		circles.forEach(updateCircle);

		walls.forEach(renderWall);
		circles.forEach(renderCicle);

		Engine.update(engine);

		const done = circles.every((circle) =>
			circle.vertices.every((vertex) => collidedVertices.has(vertex))
		);
		if (!done) {
			frame = requestAnimationFrame(run);
		} else {
			console.log('done');
		}
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

const circle = (
	x: number,
	y: number,
	r: number,
	opts?: IBodyDefinition & { numVertices?: number }
): Body => {
	const _numVertices = opts?.numVertices ?? 20;
	const vertices = Array.from({ length: _numVertices }, (_, i) => {
		const theta = (i / _numVertices) * 2 * Math.PI;
		return { x: x + r * Math.cos(theta), y: y + r * Math.sin(theta) };
	});
	const body = Bodies.fromVertices(x, y, [vertices], opts);
	return body;
};
