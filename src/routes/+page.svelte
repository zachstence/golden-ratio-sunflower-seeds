<script lang="ts">
	const PHI = (1 + Math.sqrt(5)) / 2 - 1;

	const deltaTheta = PHI;
	const svgSize = 500;
	let deltaR = 0.1;
	const numPoints = 1000;

	const polarToCartesian = (r: number, deg: number): { x: number; y: number } => ({
		x: r * Math.cos(deg),
		y: r * Math.sin(deg)
	});

	const onWheel = (e: WheelEvent) => {
		if (e.deltaY > 0) {
			deltaR -= 0.02;
		} else {
			deltaR += 0.02;
		}
	};
</script>

<svelte:window on:wheel={onWheel} />

<svg class="h-screen w-screen" viewBox="0 0 {svgSize} {svgSize}" xmlns="http://www.w3.org/2000/svg">
	{#each Array.from({ length: numPoints }) as _, i}
		{@const angle = i * deltaTheta * 360}
		{@const r = deltaR * Math.floor(angle / 360)}
		{@const c = polarToCartesian(r, angle)}
		<circle cx={c.x + svgSize / 2} cy={c.y + svgSize / 2} r={svgSize / 1000} fill="black" />
	{/each}
</svg>
