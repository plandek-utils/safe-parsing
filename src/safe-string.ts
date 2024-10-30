import { safeCompact } from "@plandek-utils/safe-compact";
import { isDayjs } from "@plandek-utils/ts-parse-dayjs";
import { types } from "node:util";

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
    return safeString(Array.from(arg)[0]);
  }

  if (types.isDate(arg) || isDayjs(arg)) {
    return arg.toISOString();
  }

  return "";
}

/**
 * Wraps the given argument in an array, unless it is already an array. If it is a Set it converts it into an array. Then calls safeString on each element. It removes nulls and undefined before returning the result.
 * @param arg
 * @returns
 */
export function safeStrings(arg: unknown): string[] {
  const list = Array.isArray(arg) ? arg : types.isSet(arg) ? [...arg] : [arg];
  return safeCompact(list.map(safeString));
}
