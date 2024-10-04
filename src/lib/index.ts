import { Point } from './Point';

export const PHI = (1 + Math.sqrt(5)) / 2;

export const generatePoints = (deltaR: number, deltaDeg: number, numPoints: number): Point[] => {
	return Array.from({ length: numPoints }, (_, i) => {
		const angle = i * deltaDeg * 360;
		const r = deltaR * Math.floor(angle / 360);
		return Point.fromPolar(i, r, angle);
	});
};
