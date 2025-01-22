"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  safeFloat: () => safeFloat,
  safeFloatWithDefault: () => safeFloatWithDefault,
  safeFloats: () => safeFloats,
  safeFloatsWithDefault: () => safeFloatsWithDefault,
  safeString: () => safeString,
  safeStringIfPresent: () => safeStringIfPresent,
  safeStrings: () => safeStrings
});
module.exports = __toCommonJS(index_exports);

// src/safe-float.ts
var import_node_util = require("util");
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
  if (import_node_util.types.isSet(arg)) {
    return safeFloatWithDefault(Array.from(arg)[0], defaultValue);
  }
  if (typeof arg === "bigint") {
    return arg.valueOf() > Number.MAX_VALUE ? Number.MAX_VALUE : Number(arg.valueOf());
  }
  if (typeof arg === "string") {
    const parsed = Number.parseFloat(arg);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  }
  return defaultValue;
}
function safeFloats(arg) {
  return safeFloatsWithDefault(arg, 0);
}
function safeFloatsWithDefault(arg, defaultValue) {
  const list = Array.isArray(arg) ? arg : import_node_util.types.isSet(arg) ? [...arg] : [arg];
  return list.map((x) => safeFloatWithDefault(x, defaultValue));
}

// src/safe-string.ts
var import_node_util2 = require("util");
var import_safe_compact = require("@plandek-utils/safe-compact");
var import_ts_parse_dayjs = require("@plandek-utils/ts-parse-dayjs");
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
  if (import_node_util2.types.isSet(arg)) {
    return safeString(Array.from(arg)[0]);
  }
  if (import_node_util2.types.isDate(arg)) {
    return arg.toISOString();
  }
  if ((0, import_ts_parse_dayjs.isDayjs)(arg)) {
    return arg.toISOString();
  }
  return "";
}
function safeStringIfPresent(arg) {
  const result = safeString(arg);
  return result === "" ? null : result;
}
function safeStrings(arg) {
  const list = Array.isArray(arg) ? arg : import_node_util2.types.isSet(arg) ? Array.from(arg) : [arg];
  return (0, import_safe_compact.safeCompact)(list.map(safeString));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  safeFloat,
  safeFloatWithDefault,
  safeFloats,
  safeFloatsWithDefault,
  safeString,
  safeStringIfPresent,
  safeStrings
});
//# sourceMappingURL=index.js.map