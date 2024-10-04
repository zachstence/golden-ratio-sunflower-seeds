import type { Action } from 'svelte/action';
import matterjs from 'matter-js';
const { Bodies, Composite, Engine, Render, Runner } = matterjs;

export const matter: Action<HTMLElement> = (element) => {
	const engine = Engine.create();
	const render = Render.create({ engine, element });

	const boxA = Bodies.rectangle(400, 200, 80, 80);
	const boxB = Bodies.rectangle(450, 50, 80, 80);
	const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

	Composite.add(engine.world, [boxA, boxB, ground]);

	Render.run(render);

	const runner = Runner.create();

	Runner.run(runner, engine);
};
