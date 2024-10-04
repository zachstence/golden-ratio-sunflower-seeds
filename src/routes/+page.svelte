<script lang="ts">
	import { generatePoints, PHI } from '$lib';

	const svgSize = 500;
	const numPoints = 100;

	const deltaDeg = 1 / PHI;
	const deltaR = 4;

	const pointSize = svgSize / 250;
	const lineSize = pointSize / 2;

	const points = generatePoints(deltaR, deltaDeg, numPoints);
</script>

<div class="flex h-screen w-screen items-center justify-center bg-neutral-900">
	<svg
		class="h-full w-full"
		viewBox="{-svgSize / 2} {-svgSize / 2} {svgSize} {svgSize}"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#each points as p}
			{@const [cw, ccw] = p.getNeighbors(points)}
			{#if cw}
				<line x1={p.x} y1={p.y} x2={cw.x} y2={cw.y} stroke-width={lineSize} stroke="cyan" />
			{/if}
			{#if ccw}
				<line x1={p.x} y1={p.y} x2={ccw.x} y2={ccw.y} stroke-width={lineSize} stroke="fuchsia" />
			{/if}

			<circle cx={p.x} cy={p.y} r={pointSize} fill="white" />
		{/each}
	</svg>
</div>
