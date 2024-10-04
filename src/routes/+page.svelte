<script lang="ts">
	import { generatePoints, PHI } from '$lib';

	const svgSize = 150;
	const numPoints = 1000;

	const deltaDeg = PHI;
	const deltaR = 0.1;

	const points = generatePoints(deltaR, deltaDeg, numPoints);
</script>

<svg class="h-screen w-screen" viewBox="0 0 {svgSize} {svgSize}" xmlns="http://www.w3.org/2000/svg">
	{#each points as p}
		<circle cx={p.x + svgSize / 2} cy={p.y + svgSize / 2} r={svgSize / 500} fill="black" />
	{/each}
</svg>
