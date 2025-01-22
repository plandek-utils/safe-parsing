import { parseDayjs } from "@plandek-utils/ts-parse-dayjs";
import { describe, expect, it } from "vitest";
import { safeString, safeStringIfPresent, safeStrings } from "..";

describe("safeString() and safeStringIfPresent()", () => {
  it("with null: returns '' / null", () => {
    expect(safeString(null)).toEqual("");
    expect(safeStringIfPresent(null)).toBeNull();
  });

  it("with empty string: returns the same empty string / null", () => {
    const str = "";
    expect(safeString(str)).toBe(str);
    expect(safeStringIfPresent(str)).toBeNull();
  });

  it("with any string: returns the same string", () => {
    const str = "  whatever is this ";
    expect(safeString(str)).toBe(str);
    expect(safeStringIfPresent(str)).toBe(str);
  });

  it("with an array with a string: returns the same string", () => {
    const str = "  whatever is this ";
    expect(safeString([str])).toBe(str);
    expect(safeStringIfPresent([str])).toBe(str);
  });

  it("with an array with many string: returns the first string", () => {
    const str = "  whatever is this ";
    expect(safeString([str, "another shit"])).toBe(str);
    expect(safeStringIfPresent([str, "another shit"])).toBe(str);
  });

  it("with an set with many string: returns the first string", () => {
    const str = "  whatever is this ";
    expect(safeString(new Set([str, "another shit"]))).toBe(str);
    expect(safeStringIfPresent(new Set([str, "another shit"]))).toBe(str);
  });

  it("a number: returns the number in a string", () => {
    expect(safeString(341)).toBe("341");
    expect(safeStringIfPresent(341)).toBe("341");
  });

  it("a bigint: returns the number in a string", () => {
    expect(safeString(BigInt(341))).toBe("341");
    expect(safeStringIfPresent(BigInt(341))).toBe("341");
  });

  it("NaN: returns empty string / null", () => {
    expect(safeString(Number.NaN)).toEqual("");
    expect(safeStringIfPresent(Number.NaN)).toBeNull();
  });

  it("Infinity: returns empty string / null", () => {
    expect(safeString(Number.POSITIVE_INFINITY)).toEqual("");
    expect(safeStringIfPresent(Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("with a date or dayjs: returns iso date format", () => {
    const str = "2018-01-01T00:00:00.000Z";
    const d1 = new Date(str);
    const d2 = new Date("2018-01-01");

    expect(safeString(d1)).toEqual(str);
    expect(safeString(d2)).toEqual(d2.toISOString());
    expect(safeString(parseDayjs(d1))).toEqual(str);
    expect(safeString(parseDayjs(d2))).toEqual(d2.toISOString());

    expect(safeStringIfPresent(d1)).toEqual(str);
    expect(safeStringIfPresent(d2)).toEqual(d2.toISOString());
    expect(safeStringIfPresent(parseDayjs(d1))).toEqual(str);
    expect(safeStringIfPresent(parseDayjs(d2))).toEqual(d2.toISOString());
  });
});

describe("safeStrings()", () => {
  it("with an array -> maps safeString() to each element, and removes empty strings", () => {
    expect(safeStrings([null, "whatever", Number.NaN, 12])).toEqual(["whatever", "12"]);
  });

  it("with a non-array arg -> returns an array with safeString(arg)", () => {
    expect(safeStrings(123)).toEqual(["123"]);
  });
});
