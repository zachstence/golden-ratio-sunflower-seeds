<script lang="ts">
	import { findNeighbors, generatePoints, PHI } from '$lib';

	const svgSize = 500;
	const numPoints = 100;

	const deltaDeg = 1 / PHI;
	const deltaR = 4;

	const pointSize = svgSize / 250;
	const lineSize = pointSize / 2;

	const points = generatePoints(deltaR, deltaDeg, numPoints);
	findNeighbors(points);

	const point = points[27];
	console.log(point.ccwChain.map((p) => p.id));
</script>

<div class="flex h-screen w-screen items-center justify-center bg-neutral-900">
	<svg
		class="h-full w-full"
		viewBox="{-svgSize / 2} {-svgSize / 2} {svgSize} {svgSize}"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#each points as p}
			<!-- {#if p.nextCW}
				<line
					x1={p.x}
					y1={p.y}
					x2={p.nextCW.x}
					y2={p.nextCW.y}
					stroke-width={lineSize}
					stroke="cyan"
				/>
			{/if} -->
			{#if p.nextCCW}
				<line
					x1={p.x}
					y1={p.y}
					x2={p.nextCCW.x}
					y2={p.nextCCW.y}
					stroke-width={lineSize}
					stroke="fuchsia"
				/>
			{/if}

			<circle cx={p.x} cy={p.y} r={pointSize} fill="white" />
			<text x={p.x + 3} y={p.y + 3} fill="gray" style="font-size: 8px;">{p.id}</text>
		{/each}
	</svg>
</div>
