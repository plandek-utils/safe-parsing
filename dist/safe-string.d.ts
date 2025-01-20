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
export declare function safeString(arg: unknown): string;
/**
 * Calls `safeString` and returns the response, unless it is an empty string, in which case it returns null.
 *
 * @param arg
 * @returns
 */
export declare function safeStringIfPresent(arg: unknown): string | null;
/**
 * Wraps the given argument in an array, unless it is already an array. If it is a Set it converts it into an array. Then calls safeString on each element. It removes nulls and undefined before returning the result.
 * @param arg
 * @returns
 */
export declare function safeStrings(arg: unknown): string[];
