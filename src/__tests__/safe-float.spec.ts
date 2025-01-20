import { describe, it, expect } from "vitest";
import { safeFloat, safeFloats, safeFloatWithDefault } from "../safe-float";

describe("safeFloat()", () => {
	it("with null: returns 0", () => {
		expect(safeFloat(null)).toEqual(0);
	});

	it("with empty string: returns 0", () => {
		expect(safeFloat("")).toEqual(0);
	});

	it("with NaN: returns 0", () => {
		expect(safeFloat(NaN)).toEqual(0);
	});

	it("with Infinity: returns 0", () => {
		expect(safeFloat(Infinity)).toEqual(0);
	});

	it("with any string: returns 0", () => {
		expect(safeFloat("  whatever is this ")).toEqual(0);
	});

	it("with a bigint that is small enough: returns as number", () => {
		expect(safeFloat(BigInt(1234))).toEqual(1234);
	});

	it("with a bigint that is small enough: returns MAX_VALUE", () => {
		expect(safeFloat(BigInt(Number.MAX_VALUE) + BigInt(10))).toEqual(
			Number.MAX_VALUE,
		);
	});

	it("with a string with a number (float) inside (ignores leading/rearing spaces): returns the number", () => {
		expect(safeFloat("  413.3 ")).toEqual(413.3);
	});

	it("with a string with a number (int) inside (ignores leading/rearing spaces): returns the number", () => {
		expect(safeFloat("   413 ")).toEqual(413);
	});

	it("with a number (float) inside: returns the same number", () => {
		expect(safeFloat(413.3)).toEqual(413.3);
	});

	it("with a number (int) inside: returns the same number", () => {
		expect(safeFloat(413)).toEqual(413);
	});

	it("with an array of numbers: returns the first number", () => {
		expect(safeFloat([42, 13, 23])).toEqual(42);
		expect(safeFloat([" 42 ", "13", "23"])).toEqual(42);
	});

	it("with an set of numbers: returns the first number", () => {
		expect(safeFloat(new Set([42, 13, 23]))).toEqual(42);
		expect(safeFloat(new Set([" 42 ", "13", "23"]))).toEqual(42);
	});

	it("with an empty array: returns 0", () => {
		expect(safeFloat([])).toEqual(0);
	});

	it("with an empty set: returns 0", () => {
		expect(safeFloat(new Set())).toEqual(0);
	});

	it("with a date: returns 0", () => {
		const str = "2018-01-01T00:00:00.000Z";
		const d1 = new Date(str);
		const d2 = new Date("2018-01-01");
		expect(safeFloat(d1)).toEqual(0);
		expect(safeFloat(d2)).toEqual(0);
	});
});

describe("safeFloats()", () => {
	it("with an array -> maps safeFloat() to each element", () => {
		expect(safeFloats(["1", 2, " 3.4  ", "whatever"])).toEqual([1, 2, 3.4, 0]);
	});

	it("with a non-array arg -> returns an array with safeFloat(arg)", () => {
		expect(safeFloats("123")).toEqual([123]);
	});
});

describe("safeFloatWithDefault", () => {
	it("should return the argument when it is a finite number", () => {
		expect(safeFloatWithDefault(42, null)).toBe(42);
		expect(safeFloatWithDefault(-Infinity, null)).toBe(null);
		expect(safeFloatWithDefault(Infinity, null)).toBe(null);
	});

	it("should return the argument when it is an array with a finite number", () => {
		expect(safeFloatWithDefault([42], null)).toBe(42);
		expect(safeFloatWithDefault([-Infinity], null)).toBe(null);
		expect(safeFloatWithDefault([Infinity], null)).toBe(null);
	});

	it("should return the default value when the argument is not a string", () => {
		expect(safeFloatWithDefault(true, 5)).toBe(5);
		expect(safeFloatWithDefault({}, 5)).toBe(5);
		expect(safeFloatWithDefault([], 5)).toBe(5);
	});

	it("should return the default value when the argument is not a valid float", () => {
		expect(safeFloatWithDefault("abc", 5)).toBe(5);
		expect(safeFloatWithDefault("3.14", 5)).toBe(3.14);
		expect(safeFloatWithDefault("invalid", 5)).toBe(5);
	});

	it("should return the first element of an array when it contains a string", () => {
		expect(safeFloatWithDefault(["1.23"], null)).toBe(1.23);
		expect(safeFloatWithDefault(["a", "b", "c"], null)).toBe(null);
	});
});
