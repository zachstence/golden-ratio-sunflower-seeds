export class Point {
	private constructor(
		readonly x: number,
		readonly y: number,
		readonly r: number,
		readonly deg: number
	) {}

	static fromPolar = (r: number, deg: number): Point => {
		const { x, y } = Point.polarToCartesian(r, deg);
		return new Point(x, y, r, deg);
	};

	static fromCartesian = (x: number, y: number): Point => {
		const { r, deg } = Point.cartesianToPolar(x, y);
		return new Point(x, y, r, deg);
	};

	static polarToCartesian = (r: number, deg: number): { x: number; y: number } => ({
		x: r * Math.cos(deg),
		y: r * Math.sin(deg)
	});

	static cartesianToPolar = (x: number, y: number): { r: number; deg: number } => ({
		r: Math.sqrt(x ** 2 + y ** 2),
		deg: Math.atan2(y, x)
	});
}
