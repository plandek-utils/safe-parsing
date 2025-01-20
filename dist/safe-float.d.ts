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
export declare function safeFloat(arg: unknown): number;
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
export declare function safeFloatWithDefault<T extends number | null>(arg: unknown, defaultValue: T): number | T;
/**
 * Calls safeFloat on each element of the given list (array or set)
 * If it is not an array, it wraps it in an array and calls safeFloat on the first element
 */
export declare function safeFloats(arg: unknown): number[];
/**
 * Calls safeFloatWithDefault on each element of the given list (array or set)
 * If it is not an array, it wraps it in an array and calls safeFloatWithDefault on the first element
 */
export declare function safeFloatsWithDefault<T extends number | null>(arg: unknown, defaultValue: T): Array<number | T>;
