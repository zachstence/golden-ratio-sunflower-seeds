<script lang="ts">
	import { generatePoints, PHI } from '$lib';

	const svgSize = 100;
	const numPoints = 1000;

	const deltaDeg = 1 / PHI;
	const deltaR = 0.1;

	const points = generatePoints(deltaR, deltaDeg, numPoints);
</script>

<div class="flex h-screen w-screen items-center justify-center bg-neutral-900">
	<svg
		class="h-full w-full"
		viewBox="{-svgSize / 2} {-svgSize / 2} {svgSize} {svgSize}"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#each points as p}
			{@const neighbor = p.getClockwiseNeighbor(points)}
			{#if neighbor}
				<line x1={p.x} y1={p.y} x2={neighbor.x} y2={neighbor.y} stroke="gray" stroke-width={0.1} />
			{/if}

			<circle cx={p.x} cy={p.y} r={svgSize / 250} fill="white" />
		{/each}
	</svg>
</div>
