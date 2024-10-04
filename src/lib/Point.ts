export class Point {
	private constructor(
		readonly id: number,
		readonly r: number,
		readonly deg: number,
		readonly x: number,
		readonly y: number
	) {}

	static fromPolar = (id: number, r: number, deg: number): Point => {
		const rad = (deg * Math.PI) / 180;
		const x = r * Math.cos(rad);
		const y = r * Math.sin(rad);
		return new Point(id, r, deg, x, y);
	};

	static fromCartesian = (id: number, x: number, y: number): Point => {
		const r = Math.sqrt(x ** 2 + y ** 2);
		const deg = Math.atan2(y, x);
		return new Point(id, r, deg, x, y);
	};

	getDistance = (other: Point): number => {
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx ** 2 + dy ** 2);
	};

	isClockwise = (other: Point): boolean => {
		const diff = (other.deg % 360) - (this.deg % 360);
		return diff > 0 && diff < 180;
	};

	getClockwiseNeighbor = (allPoints: Point[]): Point | undefined => {
		const pointsWithLargerR = allPoints.filter((p) => p.r > this.r);
		return pointsWithLargerR.reduce((closest, current) => {
			if (!this.isClockwise(current)) {
				return closest;
			}

			const closestDistance = this.getDistance(closest);
			const currentDistance = this.getDistance(current);

			return closestDistance < currentDistance ? closest : current;
		}, pointsWithLargerR[0]);
	};
}
