import { Point } from './Point';

export const PHI = (1 + Math.sqrt(5)) / 2;

export const generatePoints = (deltaR: number, deltaDeg: number, numPoints: number): Point[] => {
	return Array.from({ length: numPoints }, (_, i) => {
		const angle = i * deltaDeg * 360;
		const r = deltaR * Math.floor(angle / 360);
		return Point.fromPolar(i, r, angle);
	});
};

export const findNeighbors = (points: Point[]): void => {
	for (let i = 0; i < points.length; i++) {
		const point = points[i];

		let closestCW: Point | undefined;
		let closestCCW: Point | undefined;

		// Neighbors move out from the center
		for (let j = i + 1; j < points.length; j++) {
			const other = points[j];
			if (point.isClockwise(other)) {
				if (!closestCW) {
					closestCW = other;
				} else {
					const closestDistance = point.getDistance(closestCW);
					const currentDistance = point.getDistance(other);
					if (currentDistance < closestDistance) {
						closestCW = other;
					}
				}
			} else {
				if (!closestCCW) {
					closestCCW = other;
				} else {
					const closestDistance = point.getDistance(closestCCW);
					const currentDistance = point.getDistance(other);
					if (currentDistance < closestDistance) {
						closestCCW = other;
					}
				}
			}
		}

		if (closestCW) {
			point.nextCW = closestCW;
			closestCW.prevCW = point;
		}

		if (closestCCW) {
			point.nextCCW = closestCCW;
			closestCCW.prevCCW = point;
		}
	}
};
