// velar-standard:velar/text
var __velarMaxTextCodeUnits = 16 * 1024 * 1024;
var __velarMaxTextItems = 1e6;
var __velarTextNativeArray = globalThis.Array;
var __velarTextNativeString = globalThis.String;
var __velarTextNativeNumber = globalThis.Number;
var __velarTextNativeMath = globalThis.Math;
var __velarTextNativeObject = globalThis.Object;
var __velarTextNativeMap = globalThis.Map;
var __velarTextNativeTypeError = globalThis.TypeError;
var __velarTextNativeRangeError = globalThis.RangeError;
var __velarTextGetOwnPropertyDescriptor = __velarTextNativeObject.getOwnPropertyDescriptor;
var __velarTextRuntimeGetPrototypeOf = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "getPrototypeOf")?.value;
var __velarTextReflectApply = __velarTextGetOwnPropertyDescriptor(globalThis.Reflect, "apply")?.value;
var __velarTextStringPrototype = __velarTextGetOwnPropertyDescriptor(__velarTextNativeString, "prototype")?.value;
var __velarTextArrayIsArray = __velarTextGetOwnPropertyDescriptor(__velarTextNativeArray, "isArray")?.value;
var __velarTextNumberIsSafeInteger = __velarTextGetOwnPropertyDescriptor(__velarTextNativeNumber, "isSafeInteger")?.value;
var __velarTextNumberIsInteger = __velarTextGetOwnPropertyDescriptor(__velarTextNativeNumber, "isInteger")?.value;
var __velarTextMathFloor = __velarTextGetOwnPropertyDescriptor(__velarTextNativeMath, "floor")?.value;
var __velarTextMathMax = __velarTextGetOwnPropertyDescriptor(__velarTextNativeMath, "max")?.value;
var __velarTextMathMin = __velarTextGetOwnPropertyDescriptor(__velarTextNativeMath, "min")?.value;
var __velarNativeStringIndexOf = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "indexOf")?.value;
var __velarNativeStringSlice = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "slice")?.value;
var __velarNativeStringCharCodeAt = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "charCodeAt")?.value;
var __velarNativeStringTrim = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "trim")?.value;
var __velarNativeStringUpper = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "toUpperCase")?.value;
var __velarNativeStringLower = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "toLowerCase")?.value;
var __velarNativeStringSplit = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "split")?.value;
var __velarNativeStringReplaceAll = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "replaceAll")?.value;
var __velarNativeStringRepeat = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "repeat")?.value;
var __velarTextMapPrototype = typeof __velarTextNativeMap === "function" ? __velarTextGetOwnPropertyDescriptor(__velarTextNativeMap, "prototype")?.value : null;
var __velarTextMapGet = __velarTextMapPrototype ? __velarTextGetOwnPropertyDescriptor(__velarTextMapPrototype, "get")?.value : null;
var __velarTextMapSet = __velarTextMapPrototype ? __velarTextGetOwnPropertyDescriptor(__velarTextMapPrototype, "set")?.value : null;
var __velarTextMapClear = __velarTextMapPrototype ? __velarTextGetOwnPropertyDescriptor(__velarTextMapPrototype, "clear")?.value : null;
var __velarTextSurrogatePattern = /[\u{10000}-\u{10FFFF}\uD800-\uDFFF]/u;
var __velarTextRegExpPrototype = typeof __velarTextRuntimeGetPrototypeOf === "function" ? __velarTextRuntimeGetPrototypeOf(__velarTextSurrogatePattern) : null;
var __velarTextSurrogateExec = __velarTextRegExpPrototype ? __velarTextGetOwnPropertyDescriptor(__velarTextRegExpPrototype, "exec")?.value : null;
function __velarTextCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarTextReflectApply !== "function") throw new __velarTextNativeTypeError("The JavaScript text runtime is unavailable");
  return __velarTextReflectApply(operation, receiver, arguments_);
}
function __velarTextArgument(value, name) {
  if (typeof value !== "string") throw new __velarTextNativeTypeError(name + " must be a string");
  if (value.length > __velarMaxTextCodeUnits) throw new __velarTextNativeRangeError(name + " cannot exceed 16 MiB");
  return value;
}
function __velarTextCount(value, name) {
  if (!__velarTextCall(__velarTextNumberIsSafeInteger, __velarTextNativeNumber, [value]) || value < 0 || value > __velarMaxTextCodeUnits) {
    throw new __velarTextNativeRangeError(name + " must be an integer from 0 through " + __velarMaxTextCodeUnits);
  }
  return value;
}
function __velarTextList(values, name) {
  if (values.length > __velarMaxTextItems) throw new __velarTextNativeRangeError(name + " cannot produce more than " + __velarMaxTextItems + " items");
  return values;
}
function __velarTextNextCodePointOffset(value, offset) {
  const first = __velarTextCall(__velarNativeStringCharCodeAt, value, [offset]);
  if (first < 55296 || first > 56319 || offset + 1 >= value.length) return offset + 1;
  const second = __velarTextCall(__velarNativeStringCharCodeAt, value, [offset + 1]);
  return second >= 56320 && second <= 57343 ? offset + 2 : offset + 1;
}
var __velarTextCheckpointStride = 64;
var __velarTextMeasureMinimumUnits = 64;
var __velarTextMeasureCacheEntries = 512;
var __velarTextMeasureCacheUnits = 8 * 1024 * 1024;
var __velarTextMeasureCache = typeof __velarTextNativeMap === "function" && typeof __velarTextMapGet === "function" && typeof __velarTextMapSet === "function" && typeof __velarTextMapClear === "function" ? new __velarTextNativeMap() : null;
var __velarTextMeasureCacheCount = 0;
var __velarTextMeasureCacheHeld = 0;
function __velarTextMeasureText(value) {
  if (__velarTextCall(__velarTextSurrogateExec, __velarTextSurrogatePattern, [value]) === null) {
    return { length: value.length, dense: true, checkpoints: null };
  }
  const checkpoints = new __velarTextNativeArray();
  let length = 0, offset = 0;
  while (offset < value.length) {
    if (length % __velarTextCheckpointStride === 0) checkpoints[length / __velarTextCheckpointStride] = offset;
    offset = __velarTextNextCodePointOffset(value, offset);
    length += 1;
  }
  return { length, dense: length === value.length, checkpoints };
}
function __velarTextMeasure(value) {
  if (__velarTextMeasureCache === null || value.length < __velarTextMeasureMinimumUnits) return __velarTextMeasureText(value);
  const cached = __velarTextCall(__velarTextMapGet, __velarTextMeasureCache, [value]);
  if (cached !== void 0) return cached;
  const measured = __velarTextMeasureText(value);
  if (__velarTextMeasureCacheCount >= __velarTextMeasureCacheEntries || __velarTextMeasureCacheCount > 0 && __velarTextMeasureCacheHeld + value.length > __velarTextMeasureCacheUnits) {
    __velarTextCall(__velarTextMapClear, __velarTextMeasureCache, []);
    __velarTextMeasureCacheCount = 0;
    __velarTextMeasureCacheHeld = 0;
  }
  __velarTextCall(__velarTextMapSet, __velarTextMeasureCache, [value, measured]);
  __velarTextMeasureCacheCount += 1;
  __velarTextMeasureCacheHeld += value.length;
  return measured;
}
function __velarTextCodePointIndex(value, unitOffset) {
  const measured = __velarTextMeasure(value);
  if (measured.dense) return unitOffset <= value.length ? unitOffset : null;
  if (unitOffset < 0 || unitOffset > value.length) return null;
  const checkpoints = measured.checkpoints;
  let low = 0, high = checkpoints.length - 1;
  while (low < high) {
    const middle = low + __velarTextCall(__velarTextMathFloor, __velarTextNativeMath, [(high - low + 1) / 2]);
    if (checkpoints[middle] <= unitOffset) low = middle;
    else high = middle - 1;
  }
  let offset = checkpoints[low], position = low * __velarTextCheckpointStride;
  while (offset < unitOffset && offset < value.length) {
    offset = __velarTextNextCodePointOffset(value, offset);
    position += 1;
  }
  return offset === unitOffset ? position : null;
}
function __velarTextCodePointDistance(value, start, end) {
  if (__velarTextMeasure(value).dense) return end >= start ? end - start : null;
  let offset = start, distance = 0;
  while (offset < end) {
    offset = __velarTextNextCodePointOffset(value, offset);
    distance += 1;
  }
  return offset === end ? distance : null;
}
var __velarUtf8CharCodeAt = Object.getOwnPropertyDescriptor(String.prototype, "charCodeAt")?.value;
var __velarUtf8ReflectApply = Object.getOwnPropertyDescriptor(Reflect, "apply")?.value;
function __velarUtf8ByteLength(value) {
  if (typeof value !== "string") throw new TypeError("UTF-8 byte length requires text");
  if (typeof __velarUtf8CharCodeAt !== "function" || typeof __velarUtf8ReflectApply !== "function") {
    throw new TypeError("The host UTF-8 sizing intrinsics are unavailable");
  }
  let bytes = 0;
  for (let index = 0; index < value.length; index += 1) {
    const unit = __velarUtf8ReflectApply(__velarUtf8CharCodeAt, value, [index]);
    if (unit <= 127) bytes += 1;
    else if (unit <= 2047) bytes += 2;
    else if (unit >= 55296 && unit <= 56319 && index + 1 < value.length) {
      const next = __velarUtf8ReflectApply(__velarUtf8CharCodeAt, value, [index + 1]);
      if (next >= 56320 && next <= 57343) {
        bytes += 4;
        index += 1;
      } else bytes += 3;
    } else bytes += 3;
  }
  return bytes;
}
var maxTextCodeUnits = __velarMaxTextCodeUnits;
var maxTextItems = __velarMaxTextItems;
var maxTextPatternMillis = 250;
var __velarTextGetOwnPropertyNames = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "getOwnPropertyNames")?.value;
var __velarTextGetOwnPropertySymbols = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "getOwnPropertySymbols")?.value;
var __velarTextGetPrototypeOf = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "getPrototypeOf")?.value;
var __velarTextObjectPrototype = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "prototype")?.value;
var __velarTextObjectCreate = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "create")?.value;
var __velarTextObjectFreeze = __velarTextGetOwnPropertyDescriptor(__velarTextNativeObject, "freeze")?.value;
var __velarTextArrayPrototype = __velarTextGetOwnPropertyDescriptor(__velarTextNativeArray, "prototype")?.value;
var __velarTextArrayJoin = __velarTextGetOwnPropertyDescriptor(__velarTextArrayPrototype, "join")?.value;
var __velarTextStringTrimStart = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "trimStart")?.value;
var __velarTextStringTrimEnd = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "trimEnd")?.value;
var __velarTextStringNormalize = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "normalize")?.value;
var __velarTextNativeDate = globalThis.Date;
var __velarTextDateNow = __velarTextGetOwnPropertyDescriptor(__velarTextNativeDate, "now")?.value;
var nativeRegExpPrototype = __velarTextGetPrototypeOf(/(?:)/u);
var NativeRegExp = __velarTextGetOwnPropertyDescriptor(nativeRegExpPrototype, "constructor")?.value;
var nativeRegExpExec = __velarTextGetOwnPropertyDescriptor(nativeRegExpPrototype, "exec")?.value;
var __velarTextStringCodePointAt = __velarTextGetOwnPropertyDescriptor(__velarTextStringPrototype, "codePointAt")?.value;
var __velarTextStringFromCodePoint = __velarTextGetOwnPropertyDescriptor(__velarTextNativeString, "fromCodePoint")?.value;
var __velarTextPatternPrefix = /^Invalid regular expression: (?:\/[\s\S]*\/[a-z]*: )?/u;
function __velarTextAppend(values, value) {
  values[values.length] = value;
}
function __velarTextJoin(values, separator) {
  return __velarTextCall(__velarTextArrayJoin, values, [separator]);
}
function patternDeadline() {
  return __velarTextCall(__velarTextDateNow, __velarTextNativeDate, []) + maxTextPatternMillis;
}
function checkPatternDeadline(deadline) {
  if (__velarTextCall(__velarTextDateNow, __velarTextNativeDate, []) > deadline) throw new __velarTextNativeRangeError("text pattern matching cannot exceed " + maxTextPatternMillis + " ms");
}
function valueOf(value) {
  return __velarTextArgument(value, "velar/text value");
}
function textCount(value, name) {
  return __velarTextCount(value, name);
}
function textList(values, name) {
  return __velarTextList(values, name);
}
function patternOptions(value) {
  if (value == null) return {};
  const prototype = typeof value === "object" && value !== null ? __velarTextGetPrototypeOf(value) : void 0;
  if (typeof value !== "object" || value === null || __velarTextCall(__velarTextArrayIsArray, __velarTextNativeArray, [value]) || prototype !== __velarTextObjectPrototype && prototype !== null) throw new __velarTextNativeTypeError("text pattern options must be a record");
  if (__velarTextGetOwnPropertySymbols(value).length > 0) throw new __velarTextNativeTypeError("text pattern options cannot contain symbol fields");
  const output = __velarTextCall(__velarTextObjectCreate, __velarTextNativeObject, [null]);
  const names = __velarTextGetOwnPropertyNames(value);
  for (let index = 0; index < names.length; index += 1) {
    const name = names[index];
    const descriptor = __velarTextGetOwnPropertyDescriptor(value, name);
    if (!descriptor?.enumerable || !("value" in descriptor)) throw new __velarTextNativeTypeError("Text pattern option '" + name + "' must be an enumerable data field");
    if (name !== "ignoreCase" && name !== "multiline" && name !== "dotAll") throw new __velarTextNativeTypeError("Unknown text pattern option '" + name + "'");
    const option = descriptor.value;
    if (option != null && typeof option !== "boolean") throw new __velarTextNativeTypeError("Text pattern option '" + name + "' must be bool");
    output[name] = option;
  }
  return output;
}
function patternReason(error) {
  if (typeof error !== "object" || error === null) return "";
  const descriptor = __velarTextGetOwnPropertyDescriptor(error, "message");
  if (!descriptor || !("value" in descriptor) || typeof descriptor.value !== "string") return "";
  const message = descriptor.value;
  const prefix = __velarTextCall(nativeRegExpExec, __velarTextPatternPrefix, [message]);
  const head = prefix === null ? null : __velarTextGetOwnPropertyDescriptor(prefix, 0);
  const reason = head && typeof head.value === "string" ? __velarTextCall(__velarNativeStringSlice, message, [head.value.length]) : message;
  return reason === "" || reason.length > 200 ? "" : ": " + reason;
}
function patternOf(expression, options, global = false) {
  expression = valueOf(expression);
  options = patternOptions(options);
  if (expression.length > 4096) throw new __velarTextNativeRangeError("text patterns cannot exceed 4096 code units");
  let flags = "u";
  if (global) flags += "g";
  if (options.ignoreCase === true) flags += "i";
  if (options.multiline === true) flags += "m";
  if (options.dotAll === true) flags += "s";
  try {
    return new NativeRegExp(expression, flags);
  } catch (error) {
    throw new __velarTextNativeTypeError("Invalid text pattern" + patternReason(error));
  }
}
function checkedMatchValue(match, input) {
  if (!__velarTextCall(__velarTextArrayIsArray, __velarTextNativeArray, [match]) || match.length < 1 || match.length > 4097) throw new __velarTextNativeTypeError("The regular expression engine returned an invalid match");
  const groups = new __velarTextNativeArray(match.length - 1);
  for (let index = 0; index < match.length; index += 1) {
    const descriptor = __velarTextGetOwnPropertyDescriptor(match, index);
    if (!descriptor || !("value" in descriptor)) throw new __velarTextNativeTypeError("Regular expression matches must contain data values");
    const value = descriptor.value;
    if (value !== void 0 && typeof value !== "string") throw new __velarTextNativeTypeError("Regular expression match values must be strings");
    if (index === 0) {
      if (typeof value !== "string") throw new __velarTextNativeTypeError("A regular expression match requires full text");
    } else groups[index - 1] = value === void 0 ? null : value;
  }
  const indexDescriptor = __velarTextGetOwnPropertyDescriptor(match, "index");
  if (!indexDescriptor || !("value" in indexDescriptor) || !__velarTextCall(__velarTextNumberIsSafeInteger, __velarTextNativeNumber, [indexDescriptor.value]) || indexDescriptor.value < 0 || indexDescriptor.value > input.length) throw new __velarTextNativeTypeError("A regular expression match requires a valid index");
  return { value: __velarTextGetOwnPropertyDescriptor(match, 0).value, groups, unitIndex: indexDescriptor.value };
}
function publicMatchValue(checked, input, index = null) {
  if (index === null) index = __velarTextCodePointIndex(input, checked.unitIndex);
  if (index === null) throw new __velarTextNativeTypeError("A regular expression match must begin at a Unicode code-point boundary");
  return __velarTextCall(__velarTextObjectFreeze, __velarTextNativeObject, [{ value: checked.value, index, groups: checked.groups }]);
}
function nextTextIndex(value, index) {
  return index >= value.length ? index + 1 : __velarTextNextCodePointOffset(value, index);
}
function eachMatch(value, pattern, visit) {
  const deadline = patternDeadline();
  let count = 0, units = 0, previousUnitIndex = 0, previousCodePointIndex = 0;
  while (true) {
    const raw = __velarTextCall(nativeRegExpExec, pattern, [value]);
    checkPatternDeadline(deadline);
    if (raw === null) return;
    if (count >= maxTextItems) throw new __velarTextNativeRangeError("Text patterns cannot produce more than " + maxTextItems + " matches");
    count += 1;
    const checked = checkedMatchValue(raw, value);
    const distance = __velarTextCodePointDistance(value, previousUnitIndex, checked.unitIndex);
    if (distance === null) throw new __velarTextNativeTypeError("A regular expression match must begin at a Unicode code-point boundary");
    const match = publicMatchValue(checked, value, previousCodePointIndex + distance);
    previousUnitIndex = checked.unitIndex;
    previousCodePointIndex = match.index;
    units += match.value.length;
    for (let index = 0; index < match.groups.length; index += 1) {
      const group = match.groups[index];
      if (group !== null) units += group.length;
    }
    if (units > maxTextCodeUnits) throw new __velarTextNativeRangeError("Text pattern results cannot exceed 16 MiB");
    visit(match, checked.unitIndex);
    if (match.value === "") pattern.lastIndex = nextTextIndex(value, pattern.lastIndex);
  }
}
function lineStarts(value) {
  value = valueOf(value);
  const output = [0];
  let unitOffset = 0, codePointOffset = 0;
  while (unitOffset < value.length) {
    const nextUnitOffset = __velarTextNextCodePointOffset(value, unitOffset);
    const code = __velarTextCall(__velarNativeStringCharCodeAt, value, [unitOffset]);
    if (code === 13 && __velarTextCall(__velarNativeStringCharCodeAt, value, [nextUnitOffset]) === 10) {
      __velarTextAppend(output, codePointOffset + 2);
      unitOffset = __velarTextNextCodePointOffset(value, nextUnitOffset);
      codePointOffset += 2;
      continue;
    }
    if (code === 10 || code === 13) __velarTextAppend(output, codePointOffset + 1);
    unitOffset = nextUnitOffset;
    codePointOffset += 1;
  }
  return textList(output, "lineStarts");
}
function chunks(value, size) {
  value = valueOf(value);
  size = textCount(size, "chunks size");
  if (size === 0) throw new __velarTextNativeRangeError("chunks size must be greater than zero");
  if (value.length === 0) return [];
  const output = [];
  let start = 0, offset = 0, count = 0;
  while (offset < value.length) {
    offset = __velarTextNextCodePointOffset(value, offset);
    count += 1;
    if (count === size) {
      if (output.length >= maxTextItems) throw new __velarTextNativeRangeError("chunks cannot produce more than " + maxTextItems + " items");
      __velarTextAppend(output, __velarTextCall(__velarNativeStringSlice, value, [start, offset]));
      start = offset;
      count = 0;
    }
  }
  if (start < value.length) {
    if (output.length >= maxTextItems) throw new __velarTextNativeRangeError("chunks cannot produce more than " + maxTextItems + " items");
    __velarTextAppend(output, __velarTextCall(__velarNativeStringSlice, value, [start]));
  }
  return textList(output, "chunks");
}
function utf8Size(value) {
  return __velarUtf8ByteLength(valueOf(value));
}
function fromCodePoint(value) {
  if (!__velarTextCall(__velarTextNumberIsSafeInteger, __velarTextNativeNumber, [value]) || value < 0 || value > 1114111) {
    throw new __velarTextNativeRangeError("fromCodePoint requires a code point from 0 through 1114111");
  }
  if (value >= 55296 && value <= 57343) throw new __velarTextNativeRangeError("fromCodePoint refuses surrogate halves; they are not characters on their own");
  return __velarTextCall(__velarTextStringFromCodePoint, __velarTextNativeString, [value]);
}
function matches(value, expression, options = {}) {
  value = valueOf(value);
  const pattern = patternOf(expression, options);
  const deadline = patternDeadline();
  const found = __velarTextCall(nativeRegExpExec, pattern, [value]) !== null;
  checkPatternDeadline(deadline);
  return found;
}
function replaceMatches(value, expression, replacement, options = {}) {
  value = valueOf(value);
  replacement = valueOf(replacement);
  const output = [];
  let end = 0, units = 0;
  eachMatch(value, patternOf(expression, options, true), (match, unitIndex) => {
    const before = __velarTextCall(__velarNativeStringSlice, value, [end, unitIndex]);
    units += before.length + replacement.length;
    if (units > maxTextCodeUnits) throw new __velarTextNativeRangeError("replaceMatches output cannot exceed 16 MiB");
    __velarTextAppend(output, before);
    __velarTextAppend(output, replacement);
    end = unitIndex + match.value.length;
  });
  const tail = __velarTextCall(__velarNativeStringSlice, value, [end]);
  if (units + tail.length > maxTextCodeUnits) throw new __velarTextNativeRangeError("replaceMatches output cannot exceed 16 MiB");
  __velarTextAppend(output, tail);
  return __velarTextJoin(output, "");
}

// velar-standard:velar/compiler-runtime-reactive-v1
var __velarReactiveIterateKey = null;
var __velarReactiveStructureKey = null;
function __velarReactiveRaw(value) {
  return value;
}
function __velarReactiveCollectionRead(value, key, child) {
  return child === void 0 ? null : child;
}
function __velarReactiveCollectionTrack() {
}
function __velarReactiveCollectionLink() {
}
function __velarReactiveCollectionTrigger() {
}
function __velarReactiveCollectionUnlink() {
}

// velar-standard:velar/compiler-runtime-primitives-v1
var __velarMaxTextCodeUnits2 = 16 * 1024 * 1024;
var __velarTextNativeArray2 = globalThis.Array;
var __velarTextNativeString2 = globalThis.String;
var __velarTextNativeNumber2 = globalThis.Number;
var __velarTextNativeMath2 = globalThis.Math;
var __velarTextNativeObject2 = globalThis.Object;
var __velarTextNativeMap2 = globalThis.Map;
var __velarTextNativeTypeError2 = globalThis.TypeError;
var __velarTextNativeRangeError2 = globalThis.RangeError;
var __velarTextGetOwnPropertyDescriptor2 = __velarTextNativeObject2.getOwnPropertyDescriptor;
var __velarTextRuntimeGetPrototypeOf2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeObject2, "getPrototypeOf")?.value;
var __velarTextReflectApply2 = __velarTextGetOwnPropertyDescriptor2(globalThis.Reflect, "apply")?.value;
var __velarTextStringPrototype2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeString2, "prototype")?.value;
var __velarTextArrayIsArray2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeArray2, "isArray")?.value;
var __velarTextNumberIsSafeInteger2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeNumber2, "isSafeInteger")?.value;
var __velarTextNumberIsInteger2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeNumber2, "isInteger")?.value;
var __velarTextMathFloor2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeMath2, "floor")?.value;
var __velarTextMathMax2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeMath2, "max")?.value;
var __velarTextMathMin2 = __velarTextGetOwnPropertyDescriptor2(__velarTextNativeMath2, "min")?.value;
var __velarNativeStringIndexOf2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "indexOf")?.value;
var __velarNativeStringSlice2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "slice")?.value;
var __velarNativeStringCharCodeAt2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "charCodeAt")?.value;
var __velarNativeStringTrim2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "trim")?.value;
var __velarNativeStringUpper2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "toUpperCase")?.value;
var __velarNativeStringLower2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "toLowerCase")?.value;
var __velarNativeStringSplit2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "split")?.value;
var __velarNativeStringReplaceAll2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "replaceAll")?.value;
var __velarNativeStringRepeat2 = __velarTextGetOwnPropertyDescriptor2(__velarTextStringPrototype2, "repeat")?.value;
var __velarTextMapPrototype2 = typeof __velarTextNativeMap2 === "function" ? __velarTextGetOwnPropertyDescriptor2(__velarTextNativeMap2, "prototype")?.value : null;
var __velarTextMapGet2 = __velarTextMapPrototype2 ? __velarTextGetOwnPropertyDescriptor2(__velarTextMapPrototype2, "get")?.value : null;
var __velarTextMapSet2 = __velarTextMapPrototype2 ? __velarTextGetOwnPropertyDescriptor2(__velarTextMapPrototype2, "set")?.value : null;
var __velarTextMapClear2 = __velarTextMapPrototype2 ? __velarTextGetOwnPropertyDescriptor2(__velarTextMapPrototype2, "clear")?.value : null;
var __velarTextSurrogatePattern2 = /[\u{10000}-\u{10FFFF}\uD800-\uDFFF]/u;
var __velarTextRegExpPrototype2 = typeof __velarTextRuntimeGetPrototypeOf2 === "function" ? __velarTextRuntimeGetPrototypeOf2(__velarTextSurrogatePattern2) : null;
var __velarTextSurrogateExec2 = __velarTextRegExpPrototype2 ? __velarTextGetOwnPropertyDescriptor2(__velarTextRegExpPrototype2, "exec")?.value : null;
function __velarTextCall2(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarTextReflectApply2 !== "function") throw new __velarTextNativeTypeError2("The JavaScript text runtime is unavailable");
  return __velarTextReflectApply2(operation, receiver, arguments_);
}
function __velarTextValue(value) {
  if (typeof value !== "string") throw new __velarTextNativeTypeError2("String methods require a string receiver");
  if (value.length > __velarMaxTextCodeUnits2) throw new __velarTextNativeRangeError2("Strings cannot exceed 16 MiB");
  return value;
}
function __velarTextNextCodePointOffset2(value, offset) {
  const first = __velarTextCall2(__velarNativeStringCharCodeAt2, value, [offset]);
  if (first < 55296 || first > 56319 || offset + 1 >= value.length) return offset + 1;
  const second = __velarTextCall2(__velarNativeStringCharCodeAt2, value, [offset + 1]);
  return second >= 56320 && second <= 57343 ? offset + 2 : offset + 1;
}
var __velarTextCheckpointStride2 = 64;
var __velarTextMeasureMinimumUnits2 = 64;
var __velarTextMeasureCacheEntries2 = 512;
var __velarTextMeasureCacheUnits2 = 8 * 1024 * 1024;
var __velarTextMeasureCache2 = typeof __velarTextNativeMap2 === "function" && typeof __velarTextMapGet2 === "function" && typeof __velarTextMapSet2 === "function" && typeof __velarTextMapClear2 === "function" ? new __velarTextNativeMap2() : null;
var __velarTextMeasureCacheCount2 = 0;
var __velarTextMeasureCacheHeld2 = 0;
function __velarTextMeasureText2(value) {
  if (__velarTextCall2(__velarTextSurrogateExec2, __velarTextSurrogatePattern2, [value]) === null) {
    return { length: value.length, dense: true, checkpoints: null };
  }
  const checkpoints = new __velarTextNativeArray2();
  let length = 0, offset = 0;
  while (offset < value.length) {
    if (length % __velarTextCheckpointStride2 === 0) checkpoints[length / __velarTextCheckpointStride2] = offset;
    offset = __velarTextNextCodePointOffset2(value, offset);
    length += 1;
  }
  return { length, dense: length === value.length, checkpoints };
}
function __velarTextMeasure2(value) {
  if (__velarTextMeasureCache2 === null || value.length < __velarTextMeasureMinimumUnits2) return __velarTextMeasureText2(value);
  const cached = __velarTextCall2(__velarTextMapGet2, __velarTextMeasureCache2, [value]);
  if (cached !== void 0) return cached;
  const measured = __velarTextMeasureText2(value);
  if (__velarTextMeasureCacheCount2 >= __velarTextMeasureCacheEntries2 || __velarTextMeasureCacheCount2 > 0 && __velarTextMeasureCacheHeld2 + value.length > __velarTextMeasureCacheUnits2) {
    __velarTextCall2(__velarTextMapClear2, __velarTextMeasureCache2, []);
    __velarTextMeasureCacheCount2 = 0;
    __velarTextMeasureCacheHeld2 = 0;
  }
  __velarTextCall2(__velarTextMapSet2, __velarTextMeasureCache2, [value, measured]);
  __velarTextMeasureCacheCount2 += 1;
  __velarTextMeasureCacheHeld2 += value.length;
  return measured;
}
function __velarTextCodePointLength(value) {
  return __velarTextMeasure2(value).length;
}
function __velarTextCodeUnitOffset(value, position) {
  const measured = __velarTextMeasure2(value);
  if (measured.dense) return position < value.length ? position : value.length;
  if (position <= 0) return 0;
  const checkpoints = measured.checkpoints;
  let block = __velarTextCall2(__velarTextMathFloor2, __velarTextNativeMath2, [position / __velarTextCheckpointStride2]);
  if (block >= checkpoints.length) block = checkpoints.length - 1;
  let offset = checkpoints[block], current = block * __velarTextCheckpointStride2;
  while (offset < value.length && current < position) {
    offset = __velarTextNextCodePointOffset2(value, offset);
    current += 1;
  }
  return offset;
}
function __velarStringSize(value) {
  return __velarTextCodePointLength(__velarTextValue(value));
}
function __velarStringSlice(value, start = 0, end = null) {
  value = __velarTextValue(value);
  const total = __velarTextCodePointLength(value);
  if (end === null) end = total;
  if (!__velarTextCall2(__velarTextNumberIsInteger2, __velarTextNativeNumber2, [start]) || !__velarTextCall2(__velarTextNumberIsInteger2, __velarTextNativeNumber2, [end])) throw new __velarTextNativeTypeError2("String.slice positions must be integers");
  const first = start < 0 ? __velarTextCall2(__velarTextMathMax2, __velarTextNativeMath2, [total + start, 0]) : __velarTextCall2(__velarTextMathMin2, __velarTextNativeMath2, [start, total]);
  const last = end < 0 ? __velarTextCall2(__velarTextMathMax2, __velarTextNativeMath2, [total + end, 0]) : __velarTextCall2(__velarTextMathMin2, __velarTextNativeMath2, [end, total]);
  return __velarTextCall2(__velarNativeStringSlice2, value, [__velarTextCodeUnitOffset(value, first), __velarTextCodeUnitOffset(value, last)]);
}
var __velarNumberNativeMath = globalThis.Math;
var __velarNumberNativeNumber = globalThis.Number;
var __velarNumberNativeObject = globalThis.Object;
var __velarNumberNativeTypeError = globalThis.TypeError;
var __velarNumberNativeRangeError = globalThis.RangeError;
var __velarNumberGetOwnPropertyDescriptor = __velarNumberNativeObject.getOwnPropertyDescriptor;
var __velarNumberReflectApply = __velarNumberGetOwnPropertyDescriptor(globalThis.Reflect, "apply")?.value;
var __velarNumberPrototype = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeNumber, "prototype")?.value;
var __velarNumberMathAbs = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeMath, "abs")?.value;
var __velarNumberMathRound = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeMath, "round")?.value;
var __velarNumberMathFloor = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeMath, "floor")?.value;
var __velarNumberMathCeil = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeMath, "ceil")?.value;
var __velarNumberIsSafeInteger = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeNumber, "isSafeInteger")?.value;
var __velarNumberNativeIsInteger = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeNumber, "isInteger")?.value;
var __velarNumberNativeIsNaN = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeNumber, "isNaN")?.value;
var __velarNumberNativeIsFinite = __velarNumberGetOwnPropertyDescriptor(__velarNumberNativeNumber, "isFinite")?.value;
var __velarNativeNumberToFixed = __velarNumberGetOwnPropertyDescriptor(__velarNumberPrototype, "toFixed")?.value;
function __velarNumberCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarNumberReflectApply !== "function") throw new __velarNumberNativeTypeError("The JavaScript Number runtime is unavailable");
  return __velarNumberReflectApply(operation, receiver, arguments_);
}
function __velarNumberValue(value) {
  if (typeof value !== "number") throw new __velarNumberNativeTypeError("Number methods require a number receiver");
  return value;
}
function __velarNumberFloor(value) {
  return __velarNumberCall(__velarNumberMathFloor, __velarNumberNativeMath, [__velarNumberValue(value)]);
}

// velar-standard:velar/compiler-runtime-class-fields-v1
var __velarClassNativeObject = globalThis.Object;
var __velarClassNativeReflect = globalThis.Reflect;
var __velarClassNativeTypeError = globalThis.TypeError;
var __velarClassGetOwnPropertyDescriptor = __velarClassNativeObject.getOwnPropertyDescriptor;
var __velarClassReflectApply = __velarClassGetOwnPropertyDescriptor(__velarClassNativeReflect, "apply")?.value;
var __velarClassReflectGet = __velarClassGetOwnPropertyDescriptor(__velarClassNativeReflect, "get")?.value;
var __velarClassGetPrototypeOf = __velarClassGetOwnPropertyDescriptor(__velarClassNativeObject, "getPrototypeOf")?.value;
function __velarClassHostCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarClassReflectApply !== "function") throw new __velarClassNativeTypeError("The JavaScript class field runtime is unavailable");
  return __velarClassReflectApply(operation, receiver, arguments_);
}
function __velarReadInstanceField(receiver, name) {
  const value = __velarClassHostCall(__velarClassReflectGet, __velarClassNativeReflect, [receiver, name]);
  if (value === void 0) throw new __velarClassNativeTypeError("Field '" + name + "' was read before initialization or contains undefined");
  return value;
}
function __velarReadPrivateField(value, name) {
  if (value === void 0) throw new __velarClassNativeTypeError("Private field '" + name + "' was read before initialization or contains undefined");
  return value;
}

// velar-standard:velar/compiler-runtime-narrowing-v1
var __velarNarrowingNativeTypeError = globalThis.TypeError;
var __velarNarrowingDefineProperty = globalThis.Object.defineProperty;
var __VelarNarrowingError = class extends __velarNarrowingNativeTypeError {
  constructor(message) {
    super(message);
    this.name = "NarrowingError";
  }
};
__velarNarrowingDefineProperty(__VelarNarrowingError, "name", { value: "NarrowingError", writable: false, enumerable: false, configurable: true });
function __velarNarrow(value, valid, expected, description, offset) {
  if (!valid) throw new __VelarNarrowingError("Flow narrowing for '" + description + "' no longer holds: expected " + expected + " at source offset " + offset);
  return value;
}

// velar-standard:velar/compiler-runtime-errors-v1
var __velarErrorNativeError = globalThis.Error;
var __velarErrorNativeString = globalThis.String;
var __velarErrorNativeObject = globalThis.Object;
var __velarErrorNativeReflect = globalThis.Reflect;
var __velarErrorNativeTypeError = globalThis.TypeError;
var __velarErrorGetOwnPropertyDescriptor = __velarErrorNativeObject.getOwnPropertyDescriptor;
var __velarErrorGetPrototypeOf = __velarErrorNativeObject.getPrototypeOf;
var __velarErrorReflectApply = __velarErrorGetOwnPropertyDescriptor(__velarErrorNativeReflect, "apply")?.value;
var __velarErrorIsErrorOperation = __velarErrorGetOwnPropertyDescriptor(__velarErrorNativeError, "isError")?.value;
var __velarAssertionNativeError = globalThis.Error;
var __velarAssertionDefineProperty = globalThis.Object.defineProperty;
var __VelarAssertionError = class extends __velarAssertionNativeError {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
};
__velarAssertionDefineProperty(__VelarAssertionError, "name", { value: "AssertionError", writable: false, enumerable: false, configurable: true });
var __velarHostErrorNativeError = globalThis.Error;
var __velarHostErrorDefineProperty = globalThis.Object.defineProperty;
var __VelarFileNotFoundError = class extends __velarHostErrorNativeError {
  constructor(message, path = null) {
    super(message);
    this.name = "FileNotFoundError";
    this.path = path;
  }
};
__velarHostErrorDefineProperty(__VelarFileNotFoundError, "name", { value: "FileNotFoundError", writable: false, enumerable: false, configurable: true });
var __VelarPermissionError = class extends __velarHostErrorNativeError {
  constructor(message, path = null) {
    super(message);
    this.name = "PermissionError";
    this.path = path;
  }
};
__velarHostErrorDefineProperty(__VelarPermissionError, "name", { value: "PermissionError", writable: false, enumerable: false, configurable: true });
var __VelarNotADirectoryError = class extends __velarHostErrorNativeError {
  constructor(message, path = null) {
    super(message);
    this.name = "NotADirectoryError";
    this.path = path;
  }
};
__velarHostErrorDefineProperty(__VelarNotADirectoryError, "name", { value: "NotADirectoryError", writable: false, enumerable: false, configurable: true });
var __VelarFileExistsError = class extends __velarHostErrorNativeError {
  constructor(message, path = null) {
    super(message);
    this.name = "FileExistsError";
    this.path = path;
  }
};
__velarHostErrorDefineProperty(__VelarFileExistsError, "name", { value: "FileExistsError", writable: false, enumerable: false, configurable: true });
var __VelarAddressInUseError = class extends __velarHostErrorNativeError {
  constructor(message) {
    super(message);
    this.name = "AddressInUseError";
  }
};
__velarHostErrorDefineProperty(__VelarAddressInUseError, "name", { value: "AddressInUseError", writable: false, enumerable: false, configurable: true });

// velar-standard:velar/compiler-runtime-collections-v1
var __velarCollectionNativeArray = globalThis.Array;
var __velarCollectionNativeMap = globalThis.Map;
var __velarCollectionNativeSet = globalThis.Set;
var __velarCollectionNativeObject = globalThis.Object;
var __velarCollectionNativeReflect = globalThis.Reflect;
var __velarCollectionNativeWeakMap = globalThis.WeakMap;
var __velarCollectionNativeTypeError = globalThis.TypeError;
var __velarCollectionGetOwnPropertyDescriptor = __velarCollectionNativeObject.getOwnPropertyDescriptor;
var __velarCollectionReflectApply = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeReflect, "apply")?.value;
var __velarCollectionArrayIsArray = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeArray, "isArray")?.value;
var __velarCollectionGetPrototypeOf = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getPrototypeOf")?.value;
var __velarCollectionObjectPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "prototype")?.value;
var __velarCollectionMapPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeMap, "prototype")?.value;
var __velarCollectionSetPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeSet, "prototype")?.value;
var __velarCollectionMapSize = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "size")?.get;
var __velarCollectionSetSize = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "size")?.get;
function __velarCollectionHostCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarCollectionReflectApply !== "function") throw new __velarCollectionNativeTypeError("The JavaScript collection runtime is unavailable");
  return __velarCollectionReflectApply(operation, receiver, arguments_);
}
var __velarCollectionWeakMapPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeWeakMap, "prototype")?.value;
var __velarCollectionWeakMapGetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionWeakMapPrototype, "get")?.value;
var __velarCollectionWeakMapSetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionWeakMapPrototype, "set")?.value;
var __velarCollectionBrands = new __velarCollectionNativeWeakMap();
var __velarCollectionListNativeNumber = globalThis.Number;
var __velarCollectionListNativeMath = globalThis.Math;
var __velarCollectionListNativeRangeError = globalThis.RangeError;
var __velarCollectionListArrayPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeArray, "prototype")?.value;
var __velarCollectionListOwnNamesOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertyNames")?.value;
var __velarCollectionListOwnSymbolsOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertySymbols")?.value;
var __velarCollectionListDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "defineProperty")?.value;
var __velarCollectionListObjectIsOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "is")?.value;
var __velarCollectionListIntegerOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListNativeNumber, "isInteger")?.value;
var __velarCollectionListNaNOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListNativeNumber, "isNaN")?.value;
var __velarCollectionListFiniteOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListNativeNumber, "isFinite")?.value;
var __velarCollectionListMaximumOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListNativeMath, "max")?.value;
var __velarCollectionListMinimumOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListNativeMath, "min")?.value;
var __velarCollectionListJoinOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListArrayPrototype, "join")?.value;
var __velarCollectionListSortOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListArrayPrototype, "sort")?.value;
var __velarCollectionListReverseOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionListArrayPrototype, "reverse")?.value;
function __velarCollectionListIsArray(value) {
  return __velarCollectionHostCall(__velarCollectionArrayIsArray, __velarCollectionNativeArray, [value]);
}
function __velarCollectionListGetOwnPropertyDescriptor(value, key) {
  return __velarCollectionHostCall(__velarCollectionGetOwnPropertyDescriptor, __velarCollectionNativeObject, [value, key]);
}
function __velarCollectionListOwnNames(value) {
  return __velarCollectionHostCall(__velarCollectionListOwnNamesOperation, __velarCollectionNativeObject, [value]);
}
function __velarCollectionListOwnSymbols(value) {
  return __velarCollectionHostCall(__velarCollectionListOwnSymbolsOperation, __velarCollectionNativeObject, [value]);
}
function __velarCollectionListDefineProperty(value, key, descriptor) {
  return __velarCollectionHostCall(__velarCollectionListDefinePropertyOperation, __velarCollectionNativeObject, [value, key, descriptor]);
}
function __velarCollectionListIsInteger(value) {
  return __velarCollectionHostCall(__velarCollectionListIntegerOperation, __velarCollectionListNativeNumber, [value]);
}
function __velarCollectionListHostJoin(value, separator) {
  return __velarCollectionHostCall(__velarCollectionListJoinOperation, value, [separator]);
}
var __velarCollectionSetMapNativeRangeError = globalThis.RangeError;
var __velarCollectionSetMapFreezeOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "freeze")?.value;
var __velarCollectionSetAddOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "add")?.value;
var __velarCollectionSetHasOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "has")?.value;
var __velarCollectionSetDeleteOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "delete")?.value;
var __velarCollectionSetClearOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "clear")?.value;
var __velarCollectionSetValuesOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "values")?.value;
var __velarCollectionMapGetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "get")?.value;
var __velarCollectionMapSetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "set")?.value;
var __velarCollectionMapHasOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "has")?.value;
var __velarCollectionMapDeleteOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "delete")?.value;
var __velarCollectionMapClearOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "clear")?.value;
var __velarCollectionMapKeysOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "keys")?.value;
var __velarCollectionMapValuesOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "values")?.value;
var __velarCollectionMapEntriesOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "entries")?.value;
var __velarCollectionSetMapMapIteratorPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarCollectionHostCall(__velarCollectionMapEntriesOperation, new __velarCollectionNativeMap(), [])]);
var __velarCollectionSetMapSetIteratorPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarCollectionHostCall(__velarCollectionSetValuesOperation, new __velarCollectionNativeSet(), [])]);
var __velarCollectionSetMapMapIteratorNext = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetMapMapIteratorPrototype, "next")?.value;
var __velarCollectionSetMapSetIteratorNext = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetMapSetIteratorPrototype, "next")?.value;
var __velarCollectionRecordNativeRangeError = globalThis.RangeError;
var __velarCollectionRecordOwnNamesOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertyNames")?.value;
var __velarCollectionRecordOwnSymbolsOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertySymbols")?.value;
var __velarCollectionRecordDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "defineProperty")?.value;
var __velarCollectionRecordObjectIsOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "is")?.value;
var __velarCollectionRecordDeletePropertyOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeReflect, "deleteProperty")?.value;
var __velarCollectionRecordFreezeOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "freeze")?.value;
function __velarCollectionRecordGetOwnPropertyDescriptor(value, key) {
  return __velarCollectionHostCall(__velarCollectionGetOwnPropertyDescriptor, __velarCollectionNativeObject, [value, key]);
}
function __velarCollectionRecordDefineProperty(value, key, descriptor) {
  return __velarCollectionHostCall(__velarCollectionRecordDefinePropertyOperation, __velarCollectionNativeObject, [value, key, descriptor]);
}

// velar-standard:velar/compiler-runtime-types-v1
var __velarCollectionNativeArray2 = globalThis.Array;
var __velarCollectionNativeMap2 = globalThis.Map;
var __velarCollectionNativeSet2 = globalThis.Set;
var __velarCollectionNativeObject2 = globalThis.Object;
var __velarCollectionNativeReflect2 = globalThis.Reflect;
var __velarCollectionNativeWeakMap2 = globalThis.WeakMap;
var __velarCollectionNativeTypeError2 = globalThis.TypeError;
var __velarCollectionGetOwnPropertyDescriptor2 = __velarCollectionNativeObject2.getOwnPropertyDescriptor;
var __velarCollectionReflectApply2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeReflect2, "apply")?.value;
var __velarCollectionArrayIsArray2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeArray2, "isArray")?.value;
var __velarCollectionGetPrototypeOf2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getPrototypeOf")?.value;
var __velarCollectionObjectPrototype2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "prototype")?.value;
var __velarCollectionMapPrototype2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeMap2, "prototype")?.value;
var __velarCollectionSetPrototype2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeSet2, "prototype")?.value;
var __velarCollectionMapSize2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "size")?.get;
var __velarCollectionSetSize2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "size")?.get;
function __velarCollectionHostCall2(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarCollectionReflectApply2 !== "function") throw new __velarCollectionNativeTypeError2("The JavaScript collection runtime is unavailable");
  return __velarCollectionReflectApply2(operation, receiver, arguments_);
}
var __velarCollectionWeakMapPrototype2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeWeakMap2, "prototype")?.value;
var __velarCollectionWeakMapGetOperation2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionWeakMapPrototype2, "get")?.value;
var __velarCollectionWeakMapSetOperation2 = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionWeakMapPrototype2, "set")?.value;
var __velarCollectionBrands2 = new __velarCollectionNativeWeakMap2();
function __velarCollectionBrand(value) {
  if (value === null || typeof value !== "object" && typeof value !== "function") return 0;
  const known = __velarCollectionHostCall2(__velarCollectionWeakMapGetOperation2, __velarCollectionBrands2, [value]);
  if (known !== void 0) return known;
  let brand = 0;
  try {
    __velarCollectionHostCall2(__velarCollectionMapSize2, value, []);
    brand = 1;
  } catch {
    try {
      __velarCollectionHostCall2(__velarCollectionSetSize2, value, []);
      brand = 2;
    } catch {
      brand = 0;
    }
  }
  __velarCollectionHostCall2(__velarCollectionWeakMapSetOperation2, __velarCollectionBrands2, [value, brand]);
  return brand;
}
function __velarIsMap(value) {
  return __velarCollectionBrand(value) === 1;
}
function __velarIsSet(value) {
  return __velarCollectionBrand(value) === 2;
}
var __velarCollectionOwnNames = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertyNames")?.value;
var __velarCollectionOwnSymbols = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertySymbols")?.value;
var __velarCollectionOwnKeys = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeReflect2, "ownKeys")?.value;
var __velarCollectionMapEntries = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "entries")?.value;
var __velarCollectionSetValues = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "values")?.value;
var __velarCollectionMapIteratorPrototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [__velarCollectionHostCall2(__velarCollectionMapEntries, new __velarCollectionNativeMap2(), [])]);
var __velarCollectionSetIteratorPrototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [__velarCollectionHostCall2(__velarCollectionSetValues, new __velarCollectionNativeSet2(), [])]);
var __velarCollectionMapIteratorNext = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapIteratorPrototype, "next")?.value;
var __velarCollectionSetIteratorNext = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetIteratorPrototype, "next")?.value;
function __velarCollectionMapTypeIterator(value) {
  return __velarCollectionHostCall2(__velarCollectionMapEntries, value, []);
}
function __velarCollectionSetTypeIterator(value) {
  return __velarCollectionHostCall2(__velarCollectionSetValues, value, []);
}
function __velarCollectionMapTypeNext(iterator) {
  return __velarCollectionHostCall2(__velarCollectionMapIteratorNext, iterator, []);
}
function __velarCollectionSetTypeNext(iterator) {
  return __velarCollectionHostCall2(__velarCollectionSetIteratorNext, iterator, []);
}
var __velarTypeNativeWeakSet = globalThis.WeakSet;
var __velarTypeNativeObject = globalThis.Object;
var __velarTypeNativeTypeError = globalThis.TypeError;
var __velarTypeGetOwnPropertyDescriptor = __velarTypeNativeObject.getOwnPropertyDescriptor;
var __velarTypeDefineProperty = __velarTypeNativeObject.defineProperty;
var __velarTypeReflectApply = __velarTypeGetOwnPropertyDescriptor(globalThis.Reflect, "apply")?.value;
var __velarTypeSymbolFor = globalThis.Symbol.for;
var __velarTypeWeakSetPrototype = __velarTypeGetOwnPropertyDescriptor(__velarTypeNativeWeakSet, "prototype")?.value;
var __velarTypeWeakSetHas = __velarTypeGetOwnPropertyDescriptor(__velarTypeWeakSetPrototype, "has")?.value;
var __velarTypeWeakSetAdd = __velarTypeGetOwnPropertyDescriptor(__velarTypeWeakSetPrototype, "add")?.value;
function __velarTypeCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarTypeReflectApply !== "function") throw new __velarTypeNativeTypeError("The JavaScript runtime Type registry API is unavailable");
  return __velarTypeReflectApply(operation, receiver, arguments_);
}
var __velarRuntimeTypeRegistryKey = __velarTypeCall(__velarTypeSymbolFor, globalThis.Symbol, ["velar.type.registry.v1"]);
var __velarRuntimeTypeRegistry = (() => {
  const descriptor = __velarTypeGetOwnPropertyDescriptor(globalThis, __velarRuntimeTypeRegistryKey);
  if (descriptor) {
    if (!("value" in descriptor) || descriptor.enumerable || descriptor.configurable || descriptor.writable) {
      throw new __velarTypeNativeTypeError("VelarScript runtime type registry descriptor is invalid");
    }
    try {
      __velarTypeCall(__velarTypeWeakSetHas, descriptor.value, [descriptor.value]);
    } catch {
      throw new __velarTypeNativeTypeError("VelarScript runtime type registry is invalid");
    }
    return descriptor.value;
  }
  const registry = new __velarTypeNativeWeakSet();
  __velarTypeCall(__velarTypeDefineProperty, __velarTypeNativeObject, [globalThis, __velarRuntimeTypeRegistryKey, {
    value: registry,
    enumerable: false,
    configurable: false,
    writable: false
  }]);
  return registry;
})();
function __velarRegisterRuntimeType(value) {
  __velarTypeCall(__velarTypeWeakSetAdd, __velarRuntimeTypeRegistry, [value]);
  return value;
}
var __velarValidationNativeWeakMap = globalThis.WeakMap;
var __velarValidationNativeSet = globalThis.Set;
var __velarValidationNativePromise = globalThis.Promise;
var __velarValidationNativeFunction = globalThis.Function;
var __velarValidationNativeSymbol = globalThis.Symbol;
var __velarValidationWeakMapPrototype = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationNativeWeakMap, "prototype")?.value;
var __velarValidationSetPrototype = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationNativeSet, "prototype")?.value;
var __velarValidationFunctionPrototype = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationNativeFunction, "prototype")?.value;
var __velarValidationHasInstanceSymbol = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationNativeSymbol, "hasInstance")?.value;
var __velarValidationWeakMapGetOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationWeakMapPrototype, "get")?.value;
var __velarValidationWeakMapSetOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationWeakMapPrototype, "set")?.value;
var __velarValidationWeakMapDeleteOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationWeakMapPrototype, "delete")?.value;
var __velarValidationSetHasOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationSetPrototype, "has")?.value;
var __velarValidationSetAddOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationSetPrototype, "add")?.value;
var __velarValidationSetDeleteOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationSetPrototype, "delete")?.value;
var __velarValidationSetSizeOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationSetPrototype, "size")?.get;
var __velarValidationFunctionHasInstanceOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarValidationFunctionPrototype, __velarValidationHasInstanceSymbol)?.value;
var __velarValidationFreezeOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "freeze")?.value;
var __velarValidationDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "defineProperty")?.value;
var __velarValidationMapSetOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "set")?.value;
var __velarValidationMapGetOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "get")?.value;
function __velarValidationState() {
  return { active: new __velarValidationNativeWeakMap(), depth: 0, copies: null, copy: __velarValidationCopy };
}
function __velarValidationSet() {
  return new __velarValidationNativeSet();
}
function __velarValidationWeakMapGet(value, key) {
  return __velarCollectionHostCall2(__velarValidationWeakMapGetOperation, value, [key]);
}
function __velarValidationWeakMapSet(value, key, item) {
  return __velarCollectionHostCall2(__velarValidationWeakMapSetOperation, value, [key, item]);
}
function __velarValidationMapGet(value, key) {
  return __velarCollectionHostCall2(__velarValidationMapGetOperation, value, [key]);
}
function __velarValidationMapSet(value, key, item) {
  return __velarCollectionHostCall2(__velarValidationMapSetOperation, value, [key, item]);
}
function __velarValidationSetAdd(value, item) {
  return __velarCollectionHostCall2(__velarValidationSetAddOperation, value, [item]);
}
function __velarValidationIsArray(value) {
  return __velarCollectionHostCall2(__velarCollectionArrayIsArray2, __velarCollectionNativeArray2, [value]);
}
function __velarValidationOwnDescriptor(value, key) {
  return __velarCollectionHostCall2(__velarCollectionGetOwnPropertyDescriptor2, __velarCollectionNativeObject2, [value, key]);
}
function __velarValidationIsInstance(value, constructor) {
  return __velarCollectionHostCall2(__velarValidationFunctionHasInstanceOperation, constructor, [value]);
}
function __velarValidationFreeze(value) {
  return __velarCollectionHostCall2(__velarValidationFreezeOperation, __velarCollectionNativeObject2, [value]);
}
function __velarValidationIsPlainObject(value) {
  const prototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [value]);
  if (prototype === null) return true;
  return __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [prototype]) === null;
}
var __velarValidationCopy = {
  seen(state, value, plan) {
    if (state.copies === null) return void 0;
    const plans = __velarValidationWeakMapGet(state.copies, value);
    return plans === void 0 ? void 0 : __velarValidationMapGet(plans, plan);
  },
  remember(state, value, copy, plan) {
    if (state.copies === null) state.copies = new __velarValidationNativeWeakMap();
    let plans = __velarValidationWeakMapGet(state.copies, value);
    if (plans === void 0) {
      plans = new __velarCollectionNativeMap2();
      __velarValidationWeakMapSet(state.copies, value, plans);
    }
    __velarValidationMapSet(plans, plan, copy);
    return copy;
  },
  object(state, value, plan) {
    return __velarValidationCopy.remember(state, value, {}, plan);
  },
  // Fields are written through defineProperty so a field literally named
  // '__proto__' lands as an own data property instead of retargeting the
  // copy's prototype, and so every copied field is an ordinary mutable
  // enumerable data property whatever the source's descriptor said.
  field(target, name, value) {
    __velarCollectionHostCall2(__velarValidationDefinePropertyOperation, __velarCollectionNativeObject2, [target, name, { value, writable: true, enumerable: true, configurable: true }]);
  },
  // A null element callback means the element position has nothing to copy —
  // a primitive, an enum member, a class instance, or an opaque 'unknown'.
  // 'plan' is the container position's own stable identity: the emitter hoists
  // one function per distinct copy plan and hands it in as both the element
  // callback and the key this memo files the copy under.
  listOf(value, state, item, plan) {
    const found = __velarValidationCopy.seen(state, value, plan);
    if (found !== void 0) return found;
    const result = __velarValidationCopy.remember(state, value, [], plan);
    const length = __velarValidationOwnDescriptor(value, "length")?.value ?? 0;
    for (let index = 0; index < length; index += 1) {
      const descriptor = __velarValidationOwnDescriptor(value, index);
      result[index] = item === null ? descriptor?.value : item(descriptor?.value, state);
    }
    return result;
  },
  setOf(value, state, item, plan) {
    const found = __velarValidationCopy.seen(state, value, plan);
    if (found !== void 0) return found;
    const result = __velarValidationCopy.remember(state, value, __velarValidationSet(), plan);
    const iterator = __velarCollectionSetTypeIterator(value);
    while (true) {
      const step = __velarCollectionSetTypeNext(iterator);
      if (step.done) break;
      __velarValidationSetAdd(result, item === null ? step.value : item(step.value, state));
    }
    return result;
  },
  mapOf(value, state, key, item, plan) {
    const found = __velarValidationCopy.seen(state, value, plan);
    if (found !== void 0) return found;
    const result = __velarValidationCopy.remember(state, value, new __velarCollectionNativeMap2(), plan);
    const iterator = __velarCollectionMapTypeIterator(value);
    while (true) {
      const step = __velarCollectionMapTypeNext(iterator);
      if (step.done) break;
      const entry = step.value;
      __velarValidationMapSet(result, key === null ? entry[0] : key(entry[0], state), item === null ? entry[1] : item(entry[1], state));
    }
    return result;
  },
  recordOf(value, state, item, plan) {
    const found = __velarValidationCopy.seen(state, value, plan);
    if (found !== void 0) return found;
    const result = __velarValidationCopy.remember(state, value, {}, plan);
    const keys = __velarCollectionHostCall2(__velarCollectionOwnKeys, __velarCollectionNativeReflect2, [value]);
    for (let index = 0; index < keys.length; index += 1) {
      const name = keys[index];
      if (typeof name !== "string") continue;
      const descriptor = __velarValidationOwnDescriptor(value, name);
      if (!descriptor?.enumerable || !("value" in descriptor)) continue;
      __velarValidationCopy.field(result, name, item === null ? descriptor.value : item(descriptor.value, state));
    }
    return result;
  },
  // A generic instantiation supplies a predicate per type argument but no copy
  // plan, and a structural or union position is validated as a shape the
  // predicate did not fully decide. Both copy the plain data they can see:
  // arrays, Maps, Sets, and plain objects recurse; anything else — a class
  // instance, a promise, a function, a binary buffer — is not plain data and
  // passes through by reference.
  plain(value, state) {
    if (value === null || typeof value !== "object") return value;
    const found = __velarValidationCopy.seen(state, value, __velarValidationCopy.plain);
    if (found !== void 0) return found;
    if (__velarValidationIsArray(value)) return __velarValidationCopy.listOf(value, state, __velarValidationCopy.plain, __velarValidationCopy.plain);
    if (__velarIsMap(value)) return __velarValidationCopy.mapOf(value, state, __velarValidationCopy.plain, __velarValidationCopy.plain, __velarValidationCopy.plain);
    if (__velarIsSet(value)) return __velarValidationCopy.setOf(value, state, __velarValidationCopy.plain, __velarValidationCopy.plain);
    if (!__velarValidationIsPlainObject(value)) return value;
    return __velarValidationCopy.recordOf(value, state, __velarValidationCopy.plain, __velarValidationCopy.plain);
  },
  // A Type object from a target extension, or one emitted by an older build,
  // may carry no copy plan; the structural copy is what is left to fall back on.
  // A Type that does answer 'copy' owns its own plan identity — a declared
  // record files under its copy function, an instantiation under its arguments
  // — so nothing is threaded in from here.
  through(type, value, state) {
    const operation = type === null || type === void 0 ? void 0 : type.copy;
    if (typeof operation !== "function") return __velarValidationCopy.plain(value, state);
    return __velarCollectionHostCall2(operation, type, [value, state]);
  }
};
function __velarValidationRejectionHint(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || __velarValidationIsPlainObject(value)) return "";
  return "; a record accepts only plain data objects \u2014 project the fields into a record first, for example {x: instance.x}";
}
function __velarListTypeIs(value, check) {
  if (!__velarCollectionHostCall2(__velarCollectionArrayIsArray2, __velarCollectionNativeArray2, [value]) || value.length > 1e6 || __velarCollectionHostCall2(__velarCollectionOwnSymbols, __velarCollectionNativeObject2, [value]).length > 0 || __velarCollectionHostCall2(__velarCollectionOwnNames, __velarCollectionNativeObject2, [value]).length !== value.length + 1) return false;
  const lengthDescriptor = __velarCollectionHostCall2(__velarCollectionGetOwnPropertyDescriptor2, __velarCollectionNativeObject2, [value, "length"]);
  if (!lengthDescriptor || !lengthDescriptor.writable || lengthDescriptor.enumerable || lengthDescriptor.configurable || !("value" in lengthDescriptor)) return false;
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = __velarCollectionHostCall2(__velarCollectionGetOwnPropertyDescriptor2, __velarCollectionNativeObject2, [value, index]);
    if (!descriptor?.enumerable || !descriptor.configurable || !descriptor.writable || !("value" in descriptor) || !check(descriptor.value)) return false;
  }
  return true;
}
var __velarValidationErrorDefineProperty = globalThis.Object.defineProperty;
var __VelarValidationError = class extends __velarCollectionNativeTypeError2 {
  constructor(message, detail) {
    super(message);
    this.name = "ValidationError";
    this.path = detail?.path ?? null;
    this.field = detail?.field ?? null;
    this.reason = detail?.reason ?? null;
  }
};
__velarValidationErrorDefineProperty(__VelarValidationError, "name", { value: "ValidationError", writable: false, enumerable: false, configurable: true });

// velar-standard:velar/compiler-runtime-collection-lowering-v1
var __velarMaxCollectionItems = 1e6;
var __velarCollectionValue = (value) => value === void 0 ? null : value;
var __velarSameValueZero = (left, right) => {
  left = __velarCollectionValue(left);
  right = __velarCollectionValue(right);
  return left === right || left !== left && right !== right;
};
var __velarListNativeWeakMap = globalThis.WeakMap;
var __velarListWeakMapPrototype = __velarCollectionListGetOwnPropertyDescriptor(__velarListNativeWeakMap, "prototype")?.value;
var __velarListWeakMapGetOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListWeakMapPrototype, "get")?.value;
var __velarListWeakMapSetOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListWeakMapPrototype, "set")?.value;
var __velarListMemos = new __velarListNativeWeakMap();
var __velarListIsFrozenOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarCollectionNativeObject, "isFrozen")?.value;
function __velarListRejectFrozen(value, name) {
  if (__velarCollectionHostCall(__velarListIsFrozenOperation, __velarCollectionNativeObject, [value])) {
    throw new __velarCollectionNativeTypeError(name + " received a frozen JavaScript array; copy it on the JavaScript side \u2014 [...values] \u2014 before passing it to VelarScript");
  }
}
function __velarListMemo(value) {
  return __velarCollectionHostCall(__velarListWeakMapGetOperation, __velarListMemos, [value]);
}
function __velarListIsOwned(value) {
  const memo = __velarListMemo(value);
  return memo !== void 0 && memo === value.length;
}
function __velarAdoptList(value) {
  __velarCollectionHostCall(__velarListWeakMapSetOperation, __velarListMemos, [value, value.length]);
  return value;
}
function __velarMarkCheckedList(value) {
  __velarCollectionHostCall(__velarListWeakMapSetOperation, __velarListMemos, [value, ~value.length]);
  return value;
}
function __velarMarkOwnedList(value) {
  const memo = __velarListMemo(value);
  return memo !== void 0 && memo < 0 ? __velarMarkCheckedList(value) : __velarAdoptList(value);
}
function __velarListRequireMutableLength(value, name) {
  const lengthDescriptor = __velarCollectionListGetOwnPropertyDescriptor(value, "length");
  if (!lengthDescriptor || !lengthDescriptor.writable || lengthDescriptor.enumerable || lengthDescriptor.configurable || !("value" in lengthDescriptor)) throw new __velarCollectionNativeTypeError(name + " requires an ordinary mutable List length");
}
function __velarValidateDenseList(value, name) {
  value = __velarReactiveRaw(value);
  if (!__velarCollectionListIsArray(value) || value.length > __velarMaxCollectionItems || __velarCollectionListOwnSymbols(value).length > 0 || __velarCollectionListOwnNames(value).length !== value.length + 1) {
    throw new __velarCollectionNativeTypeError(name + " requires a dense VelarScript List");
  }
  __velarListRejectFrozen(value, name);
  __velarListRequireMutableLength(value, name);
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = __velarCollectionListGetOwnPropertyDescriptor(value, index);
    if (!descriptor?.enumerable || !descriptor.configurable || !descriptor.writable || !("value" in descriptor)) throw new __velarCollectionNativeTypeError(name + " requires ordinary mutable List data elements");
  }
  return __velarMarkCheckedList(value);
}
function __velarListTier(value) {
  const memo = __velarListMemo(value);
  if (memo === void 0) return 0;
  if (memo === value.length) return 1;
  return ~memo === value.length ? 2 : 0;
}
function __velarValidateListTier(value, name, tier) {
  if (tier === 1) return value;
  if (tier === 0) return __velarValidateDenseList(value, name);
  __velarListRequireMutableLength(value, name);
  return value;
}
function __velarValidateOwnedList(value, name) {
  value = __velarReactiveRaw(value);
  return __velarValidateListTier(value, name, __velarListTier(value));
}
function __velarValidateMutableList(value, name) {
  value = __velarReactiveRaw(value);
  const tier = __velarListTier(value);
  if (tier === 0) return __velarValidateDenseList(value, name);
  __velarListRequireMutableLength(value, name);
  return value;
}
function __velarCheckedListElement(value, index, name) {
  const descriptor = __velarCollectionListGetOwnPropertyDescriptor(value, index);
  if (!descriptor?.enumerable || !descriptor.configurable || !descriptor.writable || !("value" in descriptor)) throw new __velarCollectionNativeTypeError(name + " requires ordinary mutable List data elements");
  return descriptor.value;
}
function __velarOwnedListElement(value, index, name) {
  const element = value[index];
  return element === void 0 ? __velarCheckedListElement(value, index, name) : element;
}
function __velarListElement(value, index, name, owned) {
  return owned ? __velarOwnedListElement(value, index, name) : __velarCheckedListElement(value, index, name);
}
function* __velarReactiveListIterator(value) {
  __velarReactiveCollectionTrack(value);
  value = __velarValidateOwnedList(value, "List iteration");
  const owned = __velarListIsOwned(value);
  for (let index = 0; index < value.length; index += 1) yield __velarReactiveCollectionRead(value, __velarReactiveIterateKey, __velarListElement(value, index, "List iteration", owned));
}
function __velarCopyList(value, name) {
  value = __velarValidateOwnedList(value, name);
  const owned = __velarListIsOwned(value);
  const output = [];
  for (let index = 0; index < value.length; index += 1) output[index] = __velarCollectionValue(__velarListElement(value, index, name, owned));
  return __velarAdoptList(output);
}
var __velarListNativeString = globalThis.String;
var __velarListStringPrototype = __velarCollectionListGetOwnPropertyDescriptor(__velarListNativeString, "prototype")?.value;
var __velarListStringCharCodeAt = __velarCollectionListGetOwnPropertyDescriptor(__velarListStringPrototype, "charCodeAt")?.value;
var __velarListSurrogatePattern = /[\uD800-\uDFFF]/;
var __velarListRegExpPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarListSurrogatePattern]);
var __velarListSurrogateExecOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListRegExpPrototype, "exec")?.value;
function __velarListSize(value) {
  value = __velarValidateOwnedList(value, "List size");
  __velarReactiveCollectionTrack(value, __velarReactiveStructureKey);
  return value.length;
}
var __VelarIndexError = class extends __velarCollectionListNativeRangeError {
  constructor(message) {
    super(message);
    this.name = "IndexError";
  }
};
__velarCollectionListDefineProperty(__VelarIndexError, "name", { value: "IndexError", writable: false, enumerable: false, configurable: true });
function __velarStrictListIndex(value, requested) {
  if (!__velarCollectionListIsInteger(requested)) throw new __VelarIndexError("List index must be an in-range integer");
  const index = requested < 0 ? value.length + requested : requested;
  if (index < 0 || index >= value.length) throw new __VelarIndexError("List index must be an in-range integer");
  return index;
}
function __velarListIndexGet(value, index) {
  value = __velarReactiveRaw(value);
  const tier = __velarListTier(value);
  if (tier === 1) {
    index = __velarStrictListIndex(value, index);
    return __velarReactiveCollectionRead(value, index, __velarOwnedListElement(value, index, "List index"));
  }
  value = __velarValidateListTier(value, "List index", tier);
  index = __velarStrictListIndex(value, index);
  return __velarReactiveCollectionRead(value, index, __velarCheckedListElement(value, index, "List index"));
}
function __velarListAppend(value, item) {
  value = __velarValidateMutableList(value, "List.append");
  if (value.length >= __velarMaxCollectionItems) throw new __velarCollectionListNativeRangeError("A List cannot exceed 1000000 items");
  item = __velarReactiveRaw(item);
  const index = value.length;
  __velarCollectionListDefineProperty(value, index, { value: item, writable: true, enumerable: true, configurable: true });
  __velarReactiveCollectionLink(value, item);
  __velarReactiveCollectionTrigger(value, index, true, true, index);
  __velarMarkOwnedList(value);
  return null;
}
function __velarListPop(value, requested = -1) {
  value = __velarValidateMutableList(value, "List.pop");
  if (!__velarCollectionListIsInteger(requested)) throw new __VelarIndexError("List.pop index must be an integer");
  const index = requested < 0 ? value.length + requested : requested;
  if (value.length === 0) throw new __VelarIndexError("List.pop requires a non-empty List");
  if (index < 0 || index >= value.length) throw new __VelarIndexError("List.pop index must be an in-range integer");
  const owned = __velarListIsOwned(value);
  const item = __velarListElement(value, index, "List.pop", owned);
  for (let cursor = index; cursor < value.length - 1; cursor += 1) value[cursor] = __velarListElement(value, cursor + 1, "List.pop", owned);
  value.length -= 1;
  __velarMarkOwnedList(value);
  __velarReactiveCollectionUnlink(value, item);
  __velarReactiveCollectionTrigger(value, index, true, true, index);
  return item;
}
function __velarListCopy(value) {
  __velarReactiveCollectionTrack(value);
  return __velarCopyList(value, "List.copy");
}
function __velarListJoin(value, separator = "") {
  value = __velarValidateOwnedList(value, "List.join");
  __velarReactiveCollectionTrack(value);
  if (typeof separator !== "string") throw new __velarCollectionNativeTypeError("List.join separator must be string");
  const owned = __velarListIsOwned(value);
  for (let index = 0; index < value.length; index += 1) if (typeof __velarListElement(value, index, "List.join", owned) !== "string") throw new __velarCollectionNativeTypeError("List.join requires string values");
  return __velarCollectionListHostJoin(value, separator);
}

// src/src/index.vel
var __velarMaxRecordFields = 1e6;
function __velarSetRecordField(output, field, value, count) {
  const present = __velarCollectionRecordGetOwnPropertyDescriptor(output, field) !== void 0;
  if (!present && count >= __velarMaxRecordFields) throw new __velarCollectionRecordNativeRangeError("A record cannot exceed 1000000 fields");
  __velarCollectionRecordDefineProperty(output, field, { value: value ?? null, writable: true, enumerable: true, configurable: true });
  return present ? count : count + 1;
}
function __velarRecordFrom(source, overrides, fields, target) {
  if (source === null || typeof source !== "object" || __velarCollectionListIsArray(source)) throw new __velarCollectionNativeTypeError(target + ".from requires a record source");
  if (overrides !== null && (typeof overrides !== "object" || __velarCollectionListIsArray(overrides))) throw new __velarCollectionNativeTypeError(target + ".from overrides must be a record");
  const output = {};
  let count = 0;
  for (let index = 0; index < fields.length; index += 1) {
    const field = fields[index][0];
    const optional = fields[index][1];
    let owner = overrides;
    let descriptor = overrides === null ? void 0 : __velarCollectionRecordGetOwnPropertyDescriptor(overrides, field);
    if (descriptor === void 0) {
      owner = source;
      descriptor = __velarCollectionRecordGetOwnPropertyDescriptor(source, field);
    }
    if (descriptor === void 0) {
      if (optional) continue;
      throw new __velarCollectionNativeTypeError(target + ".from source is missing required field '" + field + "'");
    }
    if (!descriptor.enumerable || !("value" in descriptor)) throw new __velarCollectionNativeTypeError(target + ".from cannot read non-data field '" + field + "'");
    count = __velarSetRecordField(output, field, __velarReactiveCollectionRead(owner, field, descriptor.value), count);
  }
  return output;
}
function __velarCopyPlan0(__velarCopyItem, __velarCopyState) {
  return TextChange.copy(__velarCopyItem, __velarCopyState);
}
function __velarCopyPlan1(__velarCopyItem, __velarCopyState) {
  return __velarCopyState.copy.listOf(__velarCopyItem, __velarCopyState, __velarCopyPlan0, __velarCopyPlan1);
}
function __velarCopyPlan2(__velarCopyItem, __velarCopyState) {
  return TextEdit.copy(__velarCopyItem, __velarCopyState);
}
function __velarCopyPlan3(__velarCopyItem, __velarCopyState) {
  return __velarCopyState.copy.listOf(__velarCopyItem, __velarCopyState, __velarCopyPlan2, __velarCopyPlan3);
}
function __velarTypeExplain_TextPosition(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "TextPosition", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "line");
    if (__velarExplainField === void 0) {
      return { path: "TextPosition.line", field: "line", reason: "field 'line' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextPosition.line", field: "line", reason: "field 'line' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "column");
    if (__velarExplainField === void 0) {
      return { path: "TextPosition.column", field: "column", reason: "field 'column' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextPosition.column", field: "column", reason: "field 'column' does not match number" };
    }
  }
  return { path: "TextPosition", field: null, reason: null };
}
function __velarTypeCheck_TextPosition(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "line");
  const __velarField1 = __velarValidationOwnDescriptor(value, "column");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "number" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number");
}
function __velarTypeCopy_TextPosition(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "line");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "line", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "column");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "column", __velarCopyField.value);
  }
  return __velarCopy;
}
var TextPosition = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_TextPosition(value);
  },
  parse(value) {
    if (!__velarTypeCheck_TextPosition(value)) {
      const __velarDetail = __velarTypeExplain_TextPosition(value);
      throw new __VelarValidationError("Value does not match TextPosition" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_TextPosition(value, __velarValidationState(), __velarTypeCopy_TextPosition);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_TextPosition) {
    return __velarTypeCopy_TextPosition(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_TextSelection(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "TextSelection", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "anchor");
    if (__velarExplainField === void 0) {
      return { path: "TextSelection.anchor", field: "anchor", reason: "field 'anchor' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextSelection.anchor", field: "anchor", reason: "field 'anchor' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "head");
    if (__velarExplainField === void 0) {
      return { path: "TextSelection.head", field: "head", reason: "field 'head' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextSelection.head", field: "head", reason: "field 'head' does not match number" };
    }
  }
  return { path: "TextSelection", field: null, reason: null };
}
function __velarTypeCheck_TextSelection(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "anchor");
  const __velarField1 = __velarValidationOwnDescriptor(value, "head");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "number" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number");
}
function __velarTypeCopy_TextSelection(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "anchor");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "anchor", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "head");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "head", __velarCopyField.value);
  }
  return __velarCopy;
}
var TextSelection = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_TextSelection(value);
  },
  parse(value) {
    if (!__velarTypeCheck_TextSelection(value)) {
      const __velarDetail = __velarTypeExplain_TextSelection(value);
      throw new __VelarValidationError("Value does not match TextSelection" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_TextSelection(value, __velarValidationState(), __velarTypeCopy_TextSelection);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_TextSelection) {
    return __velarTypeCopy_TextSelection(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_TextEdit(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "TextEdit", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "start");
    if (__velarExplainField === void 0) {
      return { path: "TextEdit.start", field: "start", reason: "field 'start' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextEdit.start", field: "start", reason: "field 'start' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "end");
    if (__velarExplainField === void 0) {
      return { path: "TextEdit.end", field: "end", reason: "field 'end' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextEdit.end", field: "end", reason: "field 'end' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "inserted");
    if (__velarExplainField === void 0) {
      return { path: "TextEdit.inserted", field: "inserted", reason: "field 'inserted' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "string")) {
      return { path: "TextEdit.inserted", field: "inserted", reason: "field 'inserted' does not match string" };
    }
  }
  return { path: "TextEdit", field: null, reason: null };
}
function __velarTypeCheck_TextEdit(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "start");
  const __velarField1 = __velarValidationOwnDescriptor(value, "end");
  const __velarField2 = __velarValidationOwnDescriptor(value, "inserted");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "number" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "string");
}
function __velarTypeCopy_TextEdit(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "start");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "start", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "end");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "end", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "inserted");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "inserted", __velarCopyField.value);
  }
  return __velarCopy;
}
var TextEdit = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_TextEdit(value);
  },
  parse(value) {
    if (!__velarTypeCheck_TextEdit(value)) {
      const __velarDetail = __velarTypeExplain_TextEdit(value);
      throw new __VelarValidationError("Value does not match TextEdit" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_TextEdit(value, __velarValidationState(), __velarTypeCopy_TextEdit);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_TextEdit) {
    return __velarTypeCopy_TextEdit(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_TextChange(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "TextChange", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "start");
    if (__velarExplainField === void 0) {
      return { path: "TextChange.start", field: "start", reason: "field 'start' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextChange.start", field: "start", reason: "field 'start' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "removed");
    if (__velarExplainField === void 0) {
      return { path: "TextChange.removed", field: "removed", reason: "field 'removed' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "string")) {
      return { path: "TextChange.removed", field: "removed", reason: "field 'removed' does not match string" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "inserted");
    if (__velarExplainField === void 0) {
      return { path: "TextChange.inserted", field: "inserted", reason: "field 'inserted' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "string")) {
      return { path: "TextChange.inserted", field: "inserted", reason: "field 'inserted' does not match string" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "beforeRevision");
    if (__velarExplainField === void 0) {
      return { path: "TextChange.beforeRevision", field: "beforeRevision", reason: "field 'beforeRevision' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextChange.beforeRevision", field: "beforeRevision", reason: "field 'beforeRevision' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "afterRevision");
    if (__velarExplainField === void 0) {
      return { path: "TextChange.afterRevision", field: "afterRevision", reason: "field 'afterRevision' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextChange.afterRevision", field: "afterRevision", reason: "field 'afterRevision' does not match number" };
    }
  }
  return { path: "TextChange", field: null, reason: null };
}
function __velarTypeCheck_TextChange(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "start");
  const __velarField1 = __velarValidationOwnDescriptor(value, "removed");
  const __velarField2 = __velarValidationOwnDescriptor(value, "inserted");
  const __velarField3 = __velarValidationOwnDescriptor(value, "beforeRevision");
  const __velarField4 = __velarValidationOwnDescriptor(value, "afterRevision");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "number" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "string" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "string" && __velarField3?.enumerable && "value" in __velarField3 && typeof __velarField3.value === "number" && __velarField4?.enumerable && "value" in __velarField4 && typeof __velarField4.value === "number");
}
function __velarTypeCopy_TextChange(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "start");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "start", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "removed");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "removed", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "inserted");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "inserted", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "beforeRevision");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "beforeRevision", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "afterRevision");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "afterRevision", __velarCopyField.value);
  }
  return __velarCopy;
}
var TextChange = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_TextChange(value);
  },
  parse(value) {
    if (!__velarTypeCheck_TextChange(value)) {
      const __velarDetail = __velarTypeExplain_TextChange(value);
      throw new __VelarValidationError("Value does not match TextChange" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_TextChange(value, __velarValidationState(), __velarTypeCopy_TextChange);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_TextChange) {
    return __velarTypeCopy_TextChange(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_TextTransaction(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "TextTransaction", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "changes");
    if (__velarExplainField === void 0) {
      return { path: "TextTransaction.changes", field: "changes", reason: "field 'changes' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && __velarListTypeIs(__velarExplainField.value, (item) => __velarTypeCheck_TextChange(item)))) {
      return { path: "TextTransaction.changes", field: "changes", reason: "field 'changes' does not match List<TextChange>" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "beforeRevision");
    if (__velarExplainField === void 0) {
      return { path: "TextTransaction.beforeRevision", field: "beforeRevision", reason: "field 'beforeRevision' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextTransaction.beforeRevision", field: "beforeRevision", reason: "field 'beforeRevision' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "afterRevision");
    if (__velarExplainField === void 0) {
      return { path: "TextTransaction.afterRevision", field: "afterRevision", reason: "field 'afterRevision' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextTransaction.afterRevision", field: "afterRevision", reason: "field 'afterRevision' does not match number" };
    }
  }
  return { path: "TextTransaction", field: null, reason: null };
}
function __velarTypeCheck_TextTransaction(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "changes");
  const __velarField1 = __velarValidationOwnDescriptor(value, "beforeRevision");
  const __velarField2 = __velarValidationOwnDescriptor(value, "afterRevision");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && __velarListTypeIs(__velarField0.value, (item) => __velarTypeCheck_TextChange(item)) && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "number");
}
function __velarTypeCopy_TextTransaction(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "changes");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "changes", __velarCopyPlan1(__velarCopyField.value, __state));
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "beforeRevision");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "beforeRevision", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "afterRevision");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "afterRevision", __velarCopyField.value);
  }
  return __velarCopy;
}
var TextTransaction = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_TextTransaction(value);
  },
  parse(value) {
    if (!__velarTypeCheck_TextTransaction(value)) {
      const __velarDetail = __velarTypeExplain_TextTransaction(value);
      throw new __VelarValidationError("Value does not match TextTransaction" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_TextTransaction(value, __velarValidationState(), __velarTypeCopy_TextTransaction);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_TextTransaction) {
    return __velarTypeCopy_TextTransaction(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_TextLineSlice(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "TextLineSlice", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "startLine");
    if (__velarExplainField === void 0) {
      return { path: "TextLineSlice.startLine", field: "startLine", reason: "field 'startLine' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextLineSlice.startLine", field: "startLine", reason: "field 'startLine' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "endLine");
    if (__velarExplainField === void 0) {
      return { path: "TextLineSlice.endLine", field: "endLine", reason: "field 'endLine' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextLineSlice.endLine", field: "endLine", reason: "field 'endLine' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "start");
    if (__velarExplainField === void 0) {
      return { path: "TextLineSlice.start", field: "start", reason: "field 'start' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextLineSlice.start", field: "start", reason: "field 'start' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "end");
    if (__velarExplainField === void 0) {
      return { path: "TextLineSlice.end", field: "end", reason: "field 'end' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "TextLineSlice.end", field: "end", reason: "field 'end' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "text");
    if (__velarExplainField === void 0) {
      return { path: "TextLineSlice.text", field: "text", reason: "field 'text' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "string")) {
      return { path: "TextLineSlice.text", field: "text", reason: "field 'text' does not match string" };
    }
  }
  return { path: "TextLineSlice", field: null, reason: null };
}
function __velarTypeCheck_TextLineSlice(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "startLine");
  const __velarField1 = __velarValidationOwnDescriptor(value, "endLine");
  const __velarField2 = __velarValidationOwnDescriptor(value, "start");
  const __velarField3 = __velarValidationOwnDescriptor(value, "end");
  const __velarField4 = __velarValidationOwnDescriptor(value, "text");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "number" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "number" && __velarField3?.enumerable && "value" in __velarField3 && typeof __velarField3.value === "number" && __velarField4?.enumerable && "value" in __velarField4 && typeof __velarField4.value === "string");
}
function __velarTypeCopy_TextLineSlice(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "startLine");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "startLine", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "endLine");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "endLine", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "start");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "start", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "end");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "end", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "text");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "text", __velarCopyField.value);
  }
  return __velarCopy;
}
var TextLineSlice = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_TextLineSlice(value);
  },
  parse(value) {
    if (!__velarTypeCheck_TextLineSlice(value)) {
      const __velarDetail = __velarTypeExplain_TextLineSlice(value);
      throw new __VelarValidationError("Value does not match TextLineSlice" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_TextLineSlice(value, __velarValidationState(), __velarTypeCopy_TextLineSlice);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_TextLineSlice) {
    return __velarTypeCopy_TextLineSlice(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_HistoryStep(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "HistoryStep", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "forward");
    if (__velarExplainField === void 0) {
      return { path: "HistoryStep.forward", field: "forward", reason: "field 'forward' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && __velarListTypeIs(__velarExplainField.value, (item) => __velarTypeCheck_TextEdit(item)))) {
      return { path: "HistoryStep.forward", field: "forward", reason: "field 'forward' does not match List<TextEdit>" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "inverse");
    if (__velarExplainField === void 0) {
      return { path: "HistoryStep.inverse", field: "inverse", reason: "field 'inverse' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && __velarListTypeIs(__velarExplainField.value, (item) => __velarTypeCheck_TextEdit(item)))) {
      return { path: "HistoryStep.inverse", field: "inverse", reason: "field 'inverse' does not match List<TextEdit>" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "bytes");
    if (__velarExplainField === void 0) {
      return { path: "HistoryStep.bytes", field: "bytes", reason: "field 'bytes' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "HistoryStep.bytes", field: "bytes", reason: "field 'bytes' does not match number" };
    }
  }
  return { path: "HistoryStep", field: null, reason: null };
}
function __velarTypeCheck_HistoryStep(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "forward");
  const __velarField1 = __velarValidationOwnDescriptor(value, "inverse");
  const __velarField2 = __velarValidationOwnDescriptor(value, "bytes");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && __velarListTypeIs(__velarField0.value, (item) => __velarTypeCheck_TextEdit(item)) && __velarField1?.enumerable && "value" in __velarField1 && __velarListTypeIs(__velarField1.value, (item) => __velarTypeCheck_TextEdit(item)) && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "number");
}
function __velarTypeCopy_HistoryStep(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "forward");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "forward", __velarCopyPlan3(__velarCopyField.value, __state));
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "inverse");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "inverse", __velarCopyPlan3(__velarCopyField.value, __state));
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "bytes");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "bytes", __velarCopyField.value);
  }
  return __velarCopy;
}
var HistoryStep = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_HistoryStep(value);
  },
  parse(value) {
    if (!__velarTypeCheck_HistoryStep(value)) {
      const __velarDetail = __velarTypeExplain_HistoryStep(value);
      throw new __VelarValidationError("Value does not match HistoryStep" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_HistoryStep(value, __velarValidationState(), __velarTypeCopy_HistoryStep);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_HistoryStep) {
    return __velarTypeCopy_HistoryStep(value, __state, __velarCopyPlan);
  }
}));
var RopeNode = class {
  constructor(text, left, right, length, bytes, newlines, height, leaves, tail, starts) {
    const self = this;
    self.text = text ?? null;
    self.left = left ?? null;
    self.right = right ?? null;
    self.length = length;
    self.bytes = bytes;
    self.newlines = newlines;
    self.height = height;
    self.leaves = leaves;
    self.tail = tail;
    self.starts = starts;
  }
};
var surrogatePattern = "[\\uD800-\\uDFFF]";
function normalizedText(text) {
  if (!matches(text, surrogatePattern)) {
    return text;
  }
  return replaceMatches(text, surrogatePattern, fromCodePoint(65533));
}
function leafNode(text) {
  if (text === "") {
    return null;
  }
  const starts = lineStarts(text);
  const newlines = __velarListSize(starts) - 1;
  const tail = __velarStringSize(text) - __velarListIndexGet(starts, -1);
  return new RopeNode(text, null, null, __velarStringSize(text), utf8Size(text), newlines, 1, 1, tail, starts);
}
function requiredLeft(node) {
  const value = __velarReadInstanceField(node, "left");
  if (!((value ?? null) !== null)) {
    throw new __VelarAssertionError("Invalid TextBuffer rope left branch");
  }
  return ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "value", 2814))(value);
}
function requiredRight(node) {
  const value = __velarReadInstanceField(node, "right");
  if (!((value ?? null) !== null)) {
    throw new __VelarAssertionError("Invalid TextBuffer rope right branch");
  }
  return ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "value", 2977))(value);
}
function branchNode(left, right) {
  const height = __velarReadInstanceField(left, "height") > __velarReadInstanceField(right, "height") ? __velarReadInstanceField(left, "height") + 1 : __velarReadInstanceField(right, "height") + 1;
  const tail = __velarReadInstanceField(right, "newlines") > 0 ? __velarReadInstanceField(right, "tail") : __velarReadInstanceField(left, "tail") + __velarReadInstanceField(right, "length");
  return new RopeNode(null, left, right, __velarReadInstanceField(left, "length") + __velarReadInstanceField(right, "length"), __velarReadInstanceField(left, "bytes") + __velarReadInstanceField(right, "bytes"), __velarReadInstanceField(left, "newlines") + __velarReadInstanceField(right, "newlines"), height, __velarReadInstanceField(left, "leaves") + __velarReadInstanceField(right, "leaves"), tail, __velarAdoptList([]));
}
function rotateLeft(node) {
  const left = requiredLeft(node);
  const right = requiredRight(node);
  const rightLeft = requiredLeft(right);
  const rightRight = requiredRight(right);
  return branchNode(branchNode(left, rightLeft), rightRight);
}
function rotateRight(node) {
  const left = requiredLeft(node);
  const right = requiredRight(node);
  const leftLeft = requiredLeft(left);
  const leftRight = requiredRight(left);
  return branchNode(leftLeft, branchNode(leftRight, right));
}
function balanceNode(node) {
  const left = requiredLeft(node);
  const right = requiredRight(node);
  if (__velarReadInstanceField(left, "height") > __velarReadInstanceField(right, "height") + 1) {
    let next = node;
    if (__velarReadInstanceField(requiredLeft(left), "height") < __velarReadInstanceField(requiredRight(left), "height")) {
      next = branchNode(rotateLeft(left), right);
    }
    return rotateRight(next);
  }
  if (__velarReadInstanceField(right, "height") > __velarReadInstanceField(left, "height") + 1) {
    let next = node;
    if (__velarReadInstanceField(requiredRight(right), "height") < __velarReadInstanceField(requiredLeft(right), "height")) {
      next = branchNode(left, rotateRight(right));
    }
    return rotateLeft(next);
  }
  return node;
}
function joinNonEmpty(left, right) {
  const leftText = __velarReadInstanceField(left, "text");
  const rightText = __velarReadInstanceField(right, "text");
  if ((leftText ?? null) !== null && (rightText ?? null) !== null && __velarReadInstanceField(left, "length") + __velarReadInstanceField(right, "length") <= 4096) {
    const merged = leafNode(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "leftText", 4703))(leftText) + ((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "rightText", 4714))(rightText)) ?? null ?? left;
    if (!__velarSameValueZero(__velarReadInstanceField(merged, "length"), __velarReadInstanceField(left, "length") + __velarReadInstanceField(right, "length"))) {
      throw new __VelarAssertionError("Invalid TextBuffer rope join length");
    }
    return merged;
  }
  if (__velarReadInstanceField(left, "height") > __velarReadInstanceField(right, "height") + 1) {
    const leftLeft = requiredLeft(left);
    const leftRight = requiredRight(left);
    return balanceNode(branchNode(leftLeft, joinNonEmpty(leftRight, right)));
  }
  if (__velarReadInstanceField(right, "height") > __velarReadInstanceField(left, "height") + 1) {
    const rightLeft = requiredLeft(right);
    const rightRight = requiredRight(right);
    return balanceNode(branchNode(joinNonEmpty(left, rightLeft), rightRight));
  }
  return branchNode(left, right);
}
function joinNodes(left, right) {
  if ((left ?? null) === null) {
    return right ?? null;
  }
  if ((right ?? null) === null) {
    return ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "left", 5444))(left);
  }
  return joinNonEmpty(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "left", 5473))(left), ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "right", 5479))(right));
}
function buildNodes(parts, start, end) {
  if (start >= end) {
    return null;
  }
  if (__velarSameValueZero(start + 1, end)) {
    return leafNode(__velarListIndexGet(parts, start)) ?? null;
  }
  const middle = __velarNumberFloor((start + end) / 2);
  return joinNodes(buildNodes(parts, start, middle) ?? null, buildNodes(parts, middle, end) ?? null) ?? null;
}
function ropeFromText(text) {
  const parts = chunks(text, 4096);
  return buildNodes(parts, 0, __velarListSize(parts)) ?? null;
}
function splitNode(node, offset) {
  if ((node ?? null) === null) {
    return { left: null, right: null };
  }
  if (offset <= 0) {
    return { left: null, right: ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 6082))(node) };
  }
  if (offset >= __velarReadInstanceField(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 6105))(node), "length")) {
    return { left: ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 6132))(node), right: null };
  }
  const text = __velarReadInstanceField(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 6168))(node), "text");
  if ((text ?? null) !== null) {
    return { left: leafNode(__velarStringSlice(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "text", 6222))(text), 0, offset)) ?? null, right: leafNode(__velarStringSlice(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "text", 6262))(text), offset)) ?? null };
  }
  const left = requiredLeft(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 6313))(node));
  const right = requiredRight(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 6351))(node));
  if (offset < __velarReadInstanceField(left, "length")) {
    const split2 = splitNode(left, offset);
    return { left: split2.left ?? null, right: joinNodes(split2.right ?? null, right) ?? null };
  }
  if (__velarSameValueZero(offset, __velarReadInstanceField(left, "length"))) {
    return { left, right };
  }
  const split = splitNode(right, offset - __velarReadInstanceField(left, "length"));
  return { left: joinNodes(left, split.left ?? null) ?? null, right: split.right ?? null };
}
function replaceNode(root, start, end, inserted) {
  const prefix = splitNode(root ?? null, start);
  const suffix = splitNode(prefix.right ?? null, end - start);
  return joinNodes(joinNodes(prefix.left ?? null, ropeFromText(inserted) ?? null) ?? null, suffix.right ?? null) ?? null;
}
function appendNodeSlice(node, start, end, output) {
  if ((node ?? null) === null || start >= end) {
    return null;
  }
  const text = __velarReadInstanceField(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 7109))(node), "text");
  if ((text ?? null) !== null) {
    __velarListAppend(output, __velarStringSlice(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "text", 7162))(text), start, end));
    return null;
  }
  const left = requiredLeft(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 7236))(node));
  const right = requiredRight(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "node", 7274))(node));
  if (start < __velarReadInstanceField(left, "length")) {
    appendNodeSlice(left, start, end < __velarReadInstanceField(left, "length") ? end : __velarReadInstanceField(left, "length"), output);
  }
  if (end > __velarReadInstanceField(left, "length")) {
    appendNodeSlice(right, start > __velarReadInstanceField(left, "length") ? start - __velarReadInstanceField(left, "length") : 0, end - __velarReadInstanceField(left, "length"), output);
  }
  return null;
}
function prefixMetrics(node, offset) {
  if (offset <= 0) {
    return { newlines: 0, tail: 0 };
  }
  if (offset >= __velarReadInstanceField(node, "length")) {
    return { newlines: __velarReadInstanceField(node, "newlines"), tail: __velarReadInstanceField(node, "tail") };
  }
  const text = __velarReadInstanceField(node, "text");
  if ((text ?? null) !== null) {
    const starts = lineStarts(__velarStringSlice(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "text", 7801))(text), 0, offset));
    return { newlines: __velarListSize(starts) - 1, tail: offset - __velarListIndexGet(starts, -1) };
  }
  const left = requiredLeft(node);
  const right = requiredRight(node);
  if (offset <= __velarReadInstanceField(left, "length")) {
    return prefixMetrics(left, offset);
  }
  const suffix = prefixMetrics(right, offset - __velarReadInstanceField(left, "length"));
  return { newlines: __velarReadInstanceField(left, "newlines") + suffix.newlines, tail: suffix.newlines > 0 ? suffix.tail : __velarReadInstanceField(left, "tail") + suffix.tail };
}
function lineStartIn(node, line) {
  if (line === 0) {
    return 0;
  }
  const text = __velarReadInstanceField(node, "text");
  if ((text ?? null) !== null) {
    return __velarListIndexGet(__velarReadInstanceField(node, "starts"), line);
  }
  const left = requiredLeft(node);
  const right = requiredRight(node);
  if (line <= __velarReadInstanceField(left, "newlines")) {
    return lineStartIn(left, line);
  }
  return __velarReadInstanceField(left, "length") + lineStartIn(right, line - __velarReadInstanceField(left, "newlines"));
}
function copySelection(selection) {
  if ((selection ?? null) === null) {
    return null;
  }
  return __velarRecordFrom(((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 8732))(selection), null, [["anchor", false], ["head", false]], "TextSelection");
}
function copyEdits(changes) {
  let forward = __velarAdoptList([]);
  let inverse = __velarAdoptList([]);
  let delta = 0;
  let bytes = 0;
  for (const change of __velarReactiveListIterator(changes)) {
    __velarListAppend(forward, { start: change.start, end: change.start + __velarStringSize(change.removed), inserted: change.inserted });
    const postStart = change.start + delta;
    __velarListAppend(inverse, { start: postStart, end: postStart + __velarStringSize(change.inserted), inserted: change.removed });
    delta += __velarStringSize(change.inserted) - __velarStringSize(change.removed);
    bytes += utf8Size(change.inserted) + utf8Size(change.removed);
  }
  return { forward, inverse, bytes };
}
var TextBuffer = class _TextBuffer {
  #root;
  #version;
  static #maxBytes = 16 * 1024 * 1024;
  static #maxLeaves = 1e6;
  static #maxTransactionEdits = 1e5;
  constructor(text = "") {
    this.#version = 0;
    const self = this;
    const content = normalizedText(text);
    if (!(utf8Size(content) <= _TextBuffer.#maxBytes)) {
      throw new __VelarAssertionError("TextBuffer content cannot exceed 16 MiB of UTF-8 text");
    }
    self.#root = ropeFromText(content) ?? null;
  }
  get size() {
    const self = this;
    return ((__velarValue) => __velarValue == null ? null : __velarReadInstanceField(__velarValue, "length"))(__velarReadPrivateField(self.#root, "root")) ?? 0;
  }
  get byteSize() {
    const self = this;
    return ((__velarValue) => __velarValue == null ? null : __velarReadInstanceField(__velarValue, "bytes"))(__velarReadPrivateField(self.#root, "root")) ?? 0;
  }
  get lineCount() {
    const self = this;
    return (((__velarValue) => __velarValue == null ? null : __velarReadInstanceField(__velarValue, "newlines"))(__velarReadPrivateField(self.#root, "root")) ?? 0) + 1;
  }
  get revision() {
    const self = this;
    return __velarReadPrivateField(self.#version, "version");
  }
  text() {
    const self = this;
    const root = __velarReadPrivateField(self.#root, "root");
    if ((root ?? null) === null) {
      return "";
    }
    const text = __velarReadInstanceField(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "root", 10620))(root), "text");
    if ((text ?? null) !== null) {
      return ((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "text", 10662))(text);
    }
    return self.slice(0, __velarReadInstanceField(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "root", 10696))(root), "length"));
  }
  slice(start, end) {
    const self = this;
    self.#requireRange(start, end);
    if (__velarSameValueZero(start, end)) {
      return "";
    }
    let output = __velarAdoptList([]);
    appendNodeSlice(__velarReadPrivateField(self.#root, "root"), start, end, output);
    return __velarListJoin(output, "");
  }
  apply(edits) {
    const self = this;
    if (!(__velarListSize(edits) > 0)) {
      throw new __VelarAssertionError("TextBuffer transaction must contain at least one edit");
    }
    if (!(__velarListSize(edits) <= _TextBuffer.#maxTransactionEdits)) {
      throw new __VelarAssertionError("TextBuffer transaction cannot exceed 100000 edits");
    }
    const beforeRevision = __velarReadPrivateField(self.#version, "version");
    let previousEnd = 0;
    let first = true;
    let removedBytes = 0;
    let insertedBytes = 0;
    let changes = __velarAdoptList([]);
    let normalized = __velarAdoptList([]);
    for (const edit of __velarReactiveListIterator(edits)) {
      self.#requireRange(edit.start, edit.end);
      if (!(first || edit.start >= previousEnd)) {
        throw new __VelarAssertionError("TextBuffer transaction edits must be ordered and non-overlapping");
      }
      const inserted = normalizedText(edit.inserted);
      const removed = self.slice(edit.start, edit.end);
      removedBytes += utf8Size(removed);
      insertedBytes += utf8Size(inserted);
      __velarListAppend(normalized, __velarRecordFrom(edit, { inserted }, [["start", false], ["end", false], ["inserted", false]], "TextEdit"));
      __velarListAppend(changes, { start: edit.start, removed, inserted, beforeRevision, afterRevision: beforeRevision + 1 });
      previousEnd = edit.end;
      first = false;
    }
    if (!(self.byteSize - removedBytes + insertedBytes <= _TextBuffer.#maxBytes)) {
      throw new __VelarAssertionError("TextBuffer content cannot exceed 16 MiB of UTF-8 text");
    }
    let nextRoot = __velarReadPrivateField(self.#root, "root");
    let index = __velarListSize(normalized);
    while (index > 0) {
      index -= 1;
      const edit = __velarListIndexGet(normalized, index);
      nextRoot = replaceNode(nextRoot ?? null, edit.start, edit.end, edit.inserted) ?? null;
    }
    if (!((((__velarValue) => __velarValue == null ? null : __velarReadInstanceField(__velarValue, "leaves"))(nextRoot ?? null) ?? 0) <= _TextBuffer.#maxLeaves)) {
      throw new __VelarAssertionError("TextBuffer cannot exceed 1000000 leaves");
    }
    self.#root = nextRoot ?? null;
    {
      const __velarMemberObject12840 = self;
      __velarMemberObject12840.#version = __velarReadPrivateField(__velarMemberObject12840.#version, "version") + 1;
    }
    return { changes, beforeRevision, afterRevision: __velarReadPrivateField(self.#version, "version") };
  }
  replace(start, end, inserted) {
    const self = this;
    return __velarListIndexGet(self.apply([{ start, end, inserted }]).changes, 0);
  }
  insert(offset, text) {
    const self = this;
    return self.replace(offset, offset, text);
  }
  delete(start, end) {
    const self = this;
    return self.replace(start, end, "");
  }
  positionAt(offset) {
    const self = this;
    self.#requireOffset(offset);
    const root = __velarReadPrivateField(self.#root, "root");
    if ((root ?? null) === null) {
      return { line: 0, column: 0 };
    }
    const insideCrLf = offset > 0 && offset < self.size && self.slice(offset - 1, offset) === "\r" && self.slice(offset, offset + 1) === "\n";
    if (insideCrLf) {
      const beforeCarriageReturn = prefixMetrics(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "root", 13911))(root), offset - 1);
      return { line: beforeCarriageReturn.newlines, column: beforeCarriageReturn.tail };
    }
    const metrics = prefixMetrics(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "root", 14059))(root), offset);
    return { line: metrics.newlines, column: metrics.tail };
  }
  offsetAt(line, column) {
    const self = this;
    self.#requireLine(line);
    if (!(__velarSameValueZero(__velarNumberFloor(column), column) && column >= 0)) {
      throw new __VelarAssertionError("TextBuffer column must be a non-negative integer");
    }
    const start = self.#lineStart(line);
    if (!(start + column <= self.#lineEnd(line, start))) {
      throw new __VelarAssertionError("TextBuffer column is outside the line");
    }
    return start + column;
  }
  lineText(line) {
    const self = this;
    self.#requireLine(line);
    const start = self.#lineStart(line);
    return self.slice(start, self.#lineEnd(line, start));
  }
  lineSlice(startLine, endLine) {
    const self = this;
    self.#requireLineBoundary(startLine);
    self.#requireLineBoundary(endLine);
    if (!(startLine <= endLine)) {
      throw new __VelarAssertionError("TextBuffer line slice start must not exceed its end");
    }
    const start = __velarSameValueZero(startLine, self.lineCount) ? self.size : self.#lineStart(startLine);
    const end = __velarSameValueZero(endLine, self.lineCount) ? self.size : self.#lineStart(endLine);
    return { startLine, endLine, start, end, text: self.slice(start, end) };
  }
  #lineStart(line) {
    const self = this;
    if (line === 0) {
      return 0;
    }
    const root = __velarReadPrivateField(self.#root, "root");
    if (!((root ?? null) !== null)) {
      throw new __VelarAssertionError("TextBuffer line is outside the document");
    }
    return lineStartIn(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, RopeNode), "RopeNode", "root", 15629))(root), line);
  }
  #lineEnd(line, start) {
    const self = this;
    if (line + 1 >= self.lineCount) {
      return self.size;
    }
    const end = self.#lineStart(line + 1) - 1;
    if (end > start && self.slice(end - 1, end) === "\r") {
      return end - 1;
    }
    return end;
  }
  #requireOffset(offset) {
    const self = this;
    if (!(__velarSameValueZero(__velarNumberFloor(offset), offset) && offset >= 0 && offset <= self.size)) {
      throw new __VelarAssertionError("TextBuffer offset is outside the document");
    }
    return null;
  }
  #requireRange(start, end) {
    const self = this;
    self.#requireOffset(start);
    self.#requireOffset(end);
    if (!(start <= end)) {
      throw new __VelarAssertionError("TextBuffer range start must not exceed its end");
    }
    return null;
  }
  #requireLine(line) {
    const self = this;
    if (!(__velarSameValueZero(__velarNumberFloor(line), line) && line >= 0 && line < self.lineCount)) {
      throw new __VelarAssertionError("TextBuffer line is outside the document");
    }
    return null;
  }
  #requireLineBoundary(line) {
    const self = this;
    if (!(__velarSameValueZero(__velarNumberFloor(line), line) && line >= 0 && line <= self.lineCount)) {
      throw new __VelarAssertionError("TextBuffer line boundary is outside the document");
    }
    return null;
  }
};
var TextHistory = class _TextHistory {
  #buffer;
  #entryLimit;
  #byteLimit;
  #expectedRevision;
  #undoEntries;
  #redoEntries;
  #undoBytes;
  #groupSteps;
  #groupBytes;
  #groupBeforeSelection;
  #groupAfterSelection;
  #groupUndoEntries;
  #groupUndoBytes;
  static #maxAllowedBytes = 256 * 1024 * 1024;
  constructor(buffer, maxEntries = 1e3, maxBytes = 32 * 1024 * 1024) {
    this.#undoEntries = __velarAdoptList([]);
    this.#redoEntries = __velarAdoptList([]);
    this.#undoBytes = 0;
    this.#groupSteps = null;
    this.#groupBytes = 0;
    this.#groupBeforeSelection = null;
    this.#groupAfterSelection = null;
    this.#groupUndoEntries = __velarAdoptList([]);
    this.#groupUndoBytes = 0;
    const self = this;
    if (!(__velarSameValueZero(__velarNumberFloor(maxEntries), maxEntries) && maxEntries > 0 && maxEntries <= 1e6)) {
      throw new __VelarAssertionError("TextHistory maxEntries must be an integer from 1 to 1000000");
    }
    if (!(__velarSameValueZero(__velarNumberFloor(maxBytes), maxBytes) && maxBytes > 0 && maxBytes <= _TextHistory.#maxAllowedBytes)) {
      throw new __VelarAssertionError("TextHistory maxBytes must be an integer from 1 to 256 MiB");
    }
    self.#buffer = buffer;
    self.#entryLimit = maxEntries;
    self.#byteLimit = maxBytes;
    self.#expectedRevision = buffer.revision;
  }
  get isAttached() {
    const self = this;
    return __velarSameValueZero(__velarReadPrivateField(self.#buffer, "buffer").revision, __velarReadPrivateField(self.#expectedRevision, "expectedRevision"));
  }
  get canUndo() {
    const self = this;
    return self.isAttached && __velarReadPrivateField(self.#groupSteps, "groupSteps") === null && __velarListSize(__velarReadPrivateField(self.#undoEntries, "undoEntries")) > 0;
  }
  get canRedo() {
    const self = this;
    return self.isAttached && __velarReadPrivateField(self.#groupSteps, "groupSteps") === null && __velarListSize(__velarReadPrivateField(self.#redoEntries, "redoEntries")) > 0;
  }
  apply(edits, beforeSelection = null, afterSelection = null) {
    const self = this;
    self.#requireAttached();
    self.#requireSelection(beforeSelection ?? null, __velarReadPrivateField(self.#buffer, "buffer").size);
    let nextSize = __velarReadPrivateField(self.#buffer, "buffer").size;
    for (const edit of __velarReactiveListIterator(edits)) {
      nextSize += __velarStringSize(edit.inserted) - (edit.end - edit.start);
    }
    self.#requireSelection(afterSelection ?? null, nextSize);
    const transaction = __velarReadPrivateField(self.#buffer, "buffer").apply(edits);
    const step = copyEdits(transaction.changes);
    self.#expectedRevision = transaction.afterRevision;
    const group = __velarReadPrivateField(self.#groupSteps, "groupSteps");
    if ((group ?? null) !== null) {
      __velarListAppend(((__velarValue) => __velarNarrow(__velarValue, __velarListTypeIs(__velarValue, (item) => __velarTypeCheck_HistoryStep(item)), "List<HistoryStep>", "group", 19243))(group), step);
      {
        const __velarMemberObject19274 = self;
        __velarMemberObject19274.#groupBytes = __velarReadPrivateField(__velarMemberObject19274.#groupBytes, "groupBytes") + step.bytes;
      }
      self.#groupAfterSelection = copySelection(afterSelection ?? null) ?? null;
      self.#trimUndo();
    } else {
      self.#redoEntries = __velarAdoptList([]);
      self.#pushUndo({ steps: [step], beforeSelection: copySelection(beforeSelection ?? null) ?? null, afterSelection: copySelection(afterSelection ?? null) ?? null, bytes: step.bytes });
    }
    return transaction;
  }
  begin(beforeSelection = null) {
    const self = this;
    self.#requireAttached();
    if (!(__velarReadPrivateField(self.#groupSteps, "groupSteps") === null)) {
      throw new __VelarAssertionError("TextHistory already has an active group");
    }
    self.#requireSelection(beforeSelection ?? null, __velarReadPrivateField(self.#buffer, "buffer").size);
    self.#groupSteps = __velarAdoptList([]);
    self.#groupBytes = 0;
    self.#groupBeforeSelection = copySelection(beforeSelection ?? null) ?? null;
    self.#groupAfterSelection = copySelection(beforeSelection ?? null) ?? null;
    self.#groupUndoEntries = __velarListCopy(__velarReadPrivateField(self.#undoEntries, "undoEntries"));
    self.#groupUndoBytes = __velarReadPrivateField(self.#undoBytes, "undoBytes");
    return null;
  }
  commit(afterSelection = null) {
    const self = this;
    self.#requireAttached();
    const steps = __velarReadPrivateField(self.#groupSteps, "groupSteps");
    if (!((steps ?? null) !== null)) {
      throw new __VelarAssertionError("TextHistory has no active group");
    }
    const committedSelection = afterSelection ?? null ?? __velarReadPrivateField(self.#groupAfterSelection, "groupAfterSelection") ?? null;
    self.#requireSelection(committedSelection ?? null, __velarReadPrivateField(self.#buffer, "buffer").size);
    const beforeSelection = __velarReadPrivateField(self.#groupBeforeSelection, "groupBeforeSelection");
    let bytes = 0;
    for (const step of __velarReactiveListIterator(((__velarValue) => __velarNarrow(__velarValue, __velarListTypeIs(__velarValue, (item) => __velarTypeCheck_HistoryStep(item)), "List<HistoryStep>", "steps", 20755))(steps))) {
      bytes += step.bytes;
    }
    self.#groupSteps = null;
    self.#groupBytes = 0;
    self.#groupBeforeSelection = null;
    self.#groupAfterSelection = null;
    self.#groupUndoEntries = __velarAdoptList([]);
    self.#groupUndoBytes = 0;
    if (__velarListSize(((__velarValue) => __velarNarrow(__velarValue, __velarListTypeIs(__velarValue, (item) => __velarTypeCheck_HistoryStep(item)), "List<HistoryStep>", "steps", 21e3))(steps)) > 0) {
      self.#redoEntries = __velarAdoptList([]);
      self.#pushUndo({ steps: ((__velarValue) => __velarNarrow(__velarValue, __velarListTypeIs(__velarValue, (item) => __velarTypeCheck_HistoryStep(item)), "List<HistoryStep>", "steps", 21077))(steps), beforeSelection: beforeSelection ?? null, afterSelection: copySelection(committedSelection ?? null) ?? null, bytes });
    }
    return null;
  }
  cancel() {
    const self = this;
    self.#requireAttached();
    const steps = __velarReadPrivateField(self.#groupSteps, "groupSteps");
    if (!((steps ?? null) !== null)) {
      throw new __VelarAssertionError("TextHistory has no active group");
    }
    const selection = copySelection(__velarReadPrivateField(self.#groupBeforeSelection, "groupBeforeSelection")) ?? null;
    self.#revertSteps(((__velarValue) => __velarNarrow(__velarValue, __velarListTypeIs(__velarValue, (item) => __velarTypeCheck_HistoryStep(item)), "List<HistoryStep>", "steps", 21514))(steps));
    self.#undoEntries = __velarReadPrivateField(self.#groupUndoEntries, "groupUndoEntries");
    self.#undoBytes = __velarReadPrivateField(self.#groupUndoBytes, "groupUndoBytes");
    self.#groupSteps = null;
    self.#groupBytes = 0;
    self.#groupBeforeSelection = null;
    self.#groupAfterSelection = null;
    self.#groupUndoEntries = __velarAdoptList([]);
    self.#groupUndoBytes = 0;
    return selection ?? null;
  }
  undo() {
    const self = this;
    self.#requireReady();
    if (!(__velarListSize(__velarReadPrivateField(self.#undoEntries, "undoEntries")) > 0)) {
      throw new __VelarAssertionError("TextHistory has no edit to undo");
    }
    const entry = __velarListPop(__velarReadPrivateField(self.#undoEntries, "undoEntries"));
    {
      const __velarMemberObject22098 = self;
      __velarMemberObject22098.#undoBytes = __velarReadPrivateField(__velarMemberObject22098.#undoBytes, "undoBytes") - entry.bytes;
    }
    self.#revertSteps(entry.steps);
    __velarListAppend(__velarReadPrivateField(self.#redoEntries, "redoEntries"), entry);
    return copySelection(entry.beforeSelection ?? null) ?? null;
  }
  redo() {
    const self = this;
    self.#requireReady();
    if (!(__velarListSize(__velarReadPrivateField(self.#redoEntries, "redoEntries")) > 0)) {
      throw new __VelarAssertionError("TextHistory has no edit to redo");
    }
    const entry = __velarListPop(__velarReadPrivateField(self.#redoEntries, "redoEntries"));
    for (const step of __velarReactiveListIterator(entry.steps)) {
      const transaction = __velarReadPrivateField(self.#buffer, "buffer").apply(step.forward);
      self.#expectedRevision = transaction.afterRevision;
    }
    self.#pushUndo(entry);
    return copySelection(entry.afterSelection ?? null) ?? null;
  }
  clear() {
    const self = this;
    self.#undoEntries = __velarAdoptList([]);
    self.#redoEntries = __velarAdoptList([]);
    self.#undoBytes = 0;
    self.#groupSteps = null;
    self.#groupBytes = 0;
    self.#groupBeforeSelection = null;
    self.#groupAfterSelection = null;
    self.#groupUndoEntries = __velarAdoptList([]);
    self.#groupUndoBytes = 0;
    self.#expectedRevision = __velarReadPrivateField(self.#buffer, "buffer").revision;
    return null;
  }
  #revertSteps(steps) {
    const self = this;
    let index = __velarListSize(steps);
    while (index > 0) {
      index -= 1;
      const transaction = __velarReadPrivateField(self.#buffer, "buffer").apply(__velarListIndexGet(steps, index).inverse);
      self.#expectedRevision = transaction.afterRevision;
    }
    return null;
  }
  #pushUndo(entry) {
    const self = this;
    __velarListAppend(__velarReadPrivateField(self.#undoEntries, "undoEntries"), entry);
    {
      const __velarMemberObject23589 = self;
      __velarMemberObject23589.#undoBytes = __velarReadPrivateField(__velarMemberObject23589.#undoBytes, "undoBytes") + entry.bytes;
    }
    self.#trimUndo();
    return null;
  }
  #trimUndo() {
    const self = this;
    while (__velarListSize(__velarReadPrivateField(self.#undoEntries, "undoEntries")) > 1 && (__velarListSize(__velarReadPrivateField(self.#undoEntries, "undoEntries")) > __velarReadPrivateField(self.#entryLimit, "entryLimit") || __velarReadPrivateField(self.#undoBytes, "undoBytes") + __velarReadPrivateField(self.#groupBytes, "groupBytes") > __velarReadPrivateField(self.#byteLimit, "byteLimit"))) {
      const removed = __velarListPop(__velarReadPrivateField(self.#undoEntries, "undoEntries"), 0);
      {
        const __velarMemberObject23956 = self;
        __velarMemberObject23956.#undoBytes = __velarReadPrivateField(__velarMemberObject23956.#undoBytes, "undoBytes") - removed.bytes;
      }
    }
    return null;
  }
  #requireAttached() {
    const self = this;
    if (!self.isAttached) {
      throw new __VelarAssertionError("TextHistory buffer revision changed outside this history");
    }
    return null;
  }
  #requireReady() {
    const self = this;
    self.#requireAttached();
    if (!(__velarReadPrivateField(self.#groupSteps, "groupSteps") === null)) {
      throw new __VelarAssertionError("TextHistory cannot undo or redo an active group");
    }
    return null;
  }
  #requireSelection(selection, size) {
    const self = this;
    if ((selection ?? null) === null) {
      return null;
    }
    if (!(__velarSameValueZero(__velarNumberFloor(((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24410))(selection).anchor), ((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24438))(selection).anchor) && ((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24459))(selection).anchor >= 0 && ((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24485))(selection).anchor <= size)) {
      throw new __VelarAssertionError("TextHistory selection anchor is outside the document");
    }
    if (!(__velarSameValueZero(__velarNumberFloor(((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24585))(selection).head), ((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24611))(selection).head) && ((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24630))(selection).head >= 0 && ((__velarValue) => __velarNarrow(__velarValue, __velarTypeCheck_TextSelection(__velarValue), "TextSelection", "selection", 24654))(selection).head <= size)) {
      throw new __VelarAssertionError("TextHistory selection head is outside the document");
    }
    return null;
  }
};
export {
  TextBuffer,
  TextChange,
  TextEdit,
  TextHistory,
  TextLineSlice,
  TextPosition,
  TextSelection,
  TextTransaction
};
