export const PHI = (1 + Math.sqrt(5)) / 2 - 1;

export const polarToCartesian = (r: number, deg: number): { x: number; y: number } => ({
	x: r * Math.cos(deg),
	y: r * Math.sin(deg)
});

export const generatePoints = (
	deltaR: number,
	deltaDeg: number,
	numPoints: number
): { x: number; y: number }[] => {
	return Array.from({ length: numPoints }, (_, i) => {
		const angle = i * deltaDeg * 360;
		const r = deltaR * Math.floor(angle / 360);
		return polarToCartesian(r, angle);
	});
};
