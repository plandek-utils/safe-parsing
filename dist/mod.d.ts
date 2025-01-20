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
declare function safeFloat(arg: unknown): number;
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
declare function safeFloatWithDefault<T extends number | null>(
	arg: unknown,
	defaultValue: T,
): number | T;
/**
 * Calls safeFloat on each element of the given list (array or set)
 * If it is not an array, it wraps it in an array and calls safeFloat on the first element
 */
declare function safeFloats(arg: unknown): number[];
/**
 * Calls safeFloatWithDefault on each element of the given list (array or set)
 * If it is not an array, it wraps it in an array and calls safeFloatWithDefault on the first element
 */
declare function safeFloatsWithDefault<T extends number | null>(
	arg: unknown,
	defaultValue: T,
): Array<number | T>;

/**
 * If the argument is:
 * - a string, return it.
 * - a number or bigint, return its string representation.
 * - a Date or a Dayjs, return its ISO string.
 * - an array, return the safe string of its first element.
 *
 * Otherwise, return an empty string.
 *
 * @param arg
 * @returns
 */
declare function safeString(arg: unknown): string;
/**
 * Calls `safeString` and returns the response, unless it is an empty string, in which case it returns null.
 *
 * @param arg
 * @returns
 */
declare function safeStringIfPresent(arg: unknown): string | null;
/**
 * Wraps the given argument in an array, unless it is already an array. If it is a Set it converts it into an array. Then calls safeString on each element. It removes nulls and undefined before returning the result.
 * @param arg
 * @returns
 */
declare function safeStrings(arg: unknown): string[];

export {
	safeFloat,
	safeFloatWithDefault,
	safeFloats,
	safeFloatsWithDefault,
	safeString,
	safeStringIfPresent,
	safeStrings,
};
