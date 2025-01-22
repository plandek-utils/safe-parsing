import { types } from "node:util";
import { safeCompact } from "@plandek-utils/safe-compact";
import { isDayjs } from "@plandek-utils/ts-parse-dayjs";

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
export function safeString(arg: unknown): string {
  if (typeof arg === "string") {
    return arg;
  }

  if (typeof arg === "number") {
    return Number.isFinite(arg) ? arg.toString() : "";
  }

  if (typeof arg === "bigint") {
    return arg.toString();
  }

  if (Array.isArray(arg)) {
    return safeString(arg[0]);
  }

  if (types.isSet(arg)) {
    return safeString(Array.from(arg as Set<unknown>)[0]);
  }

  if (types.isDate(arg)) {
    return arg.toISOString();
  }

  if (isDayjs(arg)) {
    return arg.toISOString();
  }

  return "";
}

/**
 * Calls `safeString` and returns the response, unless it is an empty string, in which case it returns null.
 *
 * @param arg
 * @returns
 */
export function safeStringIfPresent(arg: unknown): string | null {
  const result = safeString(arg);
  return result === "" ? null : result;
}

/**
 * Wraps the given argument in an array, unless it is already an array. If it is a Set it converts it into an array. Then calls safeString on each element. It removes nulls and undefined before returning the result.
 * @param arg
 * @returns
 */
export function safeStrings(arg: unknown): string[] {
  const list = Array.isArray(arg) ? arg : types.isSet(arg) ? Array.from(arg as Set<unknown>) : [arg];
  return safeCompact(list.map(safeString));
}
