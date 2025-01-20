// src/safe-float.ts
import { types } from "node:util";
function safeFloat(arg) {
  return safeFloatWithDefault(arg, 0);
}
function safeFloatWithDefault(arg, defaultValue) {
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
    return arg.valueOf() > Number.MAX_VALUE ? Number.MAX_VALUE : Number(arg.valueOf());
  }
  if (typeof arg === "string") {
    const parsed = parseFloat(arg);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  }
  return defaultValue;
}
function safeFloats(arg) {
  return safeFloatsWithDefault(arg, 0);
}
function safeFloatsWithDefault(arg, defaultValue) {
  const list = Array.isArray(arg) ? arg : types.isSet(arg) ? [...arg] : [arg];
  return list.map((x) => safeFloatWithDefault(x, defaultValue));
}

// src/safe-string.ts
import { safeCompact } from "@plandek-utils/safe-compact";
import { isDayjs } from "@plandek-utils/ts-parse-dayjs";
import { types as types2 } from "node:util";
function safeString(arg) {
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
  if (types2.isSet(arg)) {
    return safeString(Array.from(arg)[0]);
  }
  if (types2.isDate(arg)) {
    return arg.toISOString();
  }
  if (isDayjs(arg)) {
    return arg.toISOString();
  }
  return "";
}
function safeStringIfPresent(arg) {
  const result = safeString(arg);
  return result === "" ? null : result;
}
function safeStrings(arg) {
  const list = Array.isArray(arg) ? arg : types2.isSet(arg) ? Array.from(arg) : [arg];
  return safeCompact(list.map(safeString));
}
export {
  safeFloat,
  safeFloatWithDefault,
  safeFloats,
  safeFloatsWithDefault,
  safeString,
  safeStringIfPresent,
  safeStrings
};
//# sourceMappingURL=mod.js.map