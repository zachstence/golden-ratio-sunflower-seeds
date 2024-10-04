export class Point {
	prevCW: Point | undefined;
	prevCCW: Point | undefined;
	nextCW: Point | undefined;
	nextCCW: Point | undefined;

	private constructor(
		readonly id: number,
		readonly r: number,
		readonly deg: number,
		readonly x: number,
		readonly y: number
	) {}

	get cwChain(): Point[] {
		const back: Point[] = [];
		const forward: Point[] = [];

		let current: Point | undefined = this.prevCW;
		while (current) {
			if (current) back.push(current);
			current = current.prevCW;
		}

		current = this.nextCW;
		while (current) {
			if (current) forward.push(current);
			current = current.nextCW;
		}

		back.reverse();
		return [...back, this, ...forward];
	}

	get ccwChain(): Point[] {
		const back: Point[] = [];
		const forward: Point[] = [];

		let current: Point | undefined = this.prevCCW;
		while (current) {
			if (current) back.push(current);
			current = current.prevCCW;
		}

		current = this.nextCCW;
		while (current) {
			if (current) forward.push(current);
			current = current.nextCCW;
		}

		back.reverse();
		return [...back, this, ...forward];
	}

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
}
