import { types } from "node:util";

/**
 * If the given arg is:
 * - a number (finite): returns it
 * - an array: calls safeFloat on the first element
 * - a string: tries to parse it as a float => returns it if it is finite, 0 otherwise
 * - anything else: returns 0
 *
 * @param arg
 * @returns
 */
export function safeFloat(arg: unknown): number {
	return safeFloatWithDefault(arg, 0);
}

/**
 * If the given arg is:
 * - a number (finite): returns it
 * - an array: calls safeFloatWithDefault on the first element
 * - a string: tries to parse it as a float => returns it if it is finite, the given defaultValue otherwise
 * - anything else: returns the given defaultValue
 *
 * @param arg
 * @param defaultValue
 * @returns
 */
export function safeFloatWithDefault<T extends number | null>(
	arg: unknown,
	defaultValue: T,
): number | T {
	if (typeof arg === "number" && Number.isFinite(arg)) {
		return arg;
	}

	if (Array.isArray(arg)) {
		return safeFloatWithDefault(arg[0], defaultValue);
	}

	if (types.isSet(arg)) {
		return safeFloatWithDefault(Array.from(arg)[0], defaultValue);
	}

	if (typeof arg === "bigint") {
		return arg.valueOf() > Number.MAX_VALUE
			? Number.MAX_VALUE
			: Number(arg.valueOf());
	}

	if (typeof arg === "string") {
		// try to parse it
		const parsed = parseFloat(arg);
		return Number.isFinite(parsed) ? parsed : defaultValue;
	}

	return defaultValue;
}

/**
 * Calls safeFloat on each element of the given list (array or set)
 * If it is not an array, it wraps it in an array and calls safeFloat on the first element
 */
export function safeFloats(arg: unknown): number[] {
	return safeFloatsWithDefault(arg, 0);
}

/**
 * Calls safeFloatWithDefault on each element of the given list (array or set)
 * If it is not an array, it wraps it in an array and calls safeFloatWithDefault on the first element
 */
export function safeFloatsWithDefault<T extends number | null>(
	arg: unknown,
	defaultValue: T,
): Array<number | T> {
	const list = Array.isArray(arg) ? arg : types.isSet(arg) ? [...arg] : [arg];
	return list.map((x) => safeFloatWithDefault(x, defaultValue));
}
