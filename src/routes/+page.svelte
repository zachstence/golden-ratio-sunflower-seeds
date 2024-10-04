<script lang="ts">
	import { generatePoints, PHI } from '$lib';

	const svgSize = 20;
	const numPoints = 100;

	const deltaDeg = 1 / PHI;
	const deltaR = 0.1;

	const points = generatePoints(deltaR, deltaDeg, numPoints);
	console.log(points);
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<svg
		class="aspect-square max-h-full max-w-full"
		viewBox="{-svgSize / 2} {-svgSize / 2} {svgSize} {svgSize}"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#each points as p}
			<circle cx={p.x} cy={p.y} r={svgSize / 500} fill="black" />
		{/each}
	</svg>
</div>
