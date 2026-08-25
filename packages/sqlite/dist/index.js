// velar-standard:velar/text
var __velarMaxTextCodeUnits = 16 * 1024 * 1024;
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
var __velarTextMeasureCacheUnits = 8 * 1024 * 1024;
var __velarTextMeasureCache = typeof __velarTextNativeMap === "function" && typeof __velarTextMapGet === "function" && typeof __velarTextMapSet === "function" && typeof __velarTextMapClear === "function" ? new __velarTextNativeMap() : null;
var __velarUtf8CharCodeAt = Object.getOwnPropertyDescriptor(String.prototype, "charCodeAt")?.value;
var __velarUtf8ReflectApply = Object.getOwnPropertyDescriptor(Reflect, "apply")?.value;
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
var __velarTextLatinMarks = new RegExp("(?<=\\p{Script=Latin})\\p{M}+", "gu");
var __velarTextBaselessMarks = new RegExp("(?<![\\p{L}\\p{N}\\p{M}])\\p{M}+", "gu");
function fromCodePoint(value) {
  if (!__velarTextCall(__velarTextNumberIsSafeInteger, __velarTextNativeNumber, [value]) || value < 0 || value > 1114111) {
    throw new __velarTextNativeRangeError("fromCodePoint requires a code point from 0 through 1114111");
  }
  if (value >= 55296 && value <= 57343) throw new __velarTextNativeRangeError("fromCodePoint refuses surrogate halves; they are not characters on their own");
  return __velarTextCall(__velarTextStringFromCodePoint, __velarTextNativeString, [value]);
}

// velar-standard:velar/compiler-runtime-reactive-v1
var __velarReactiveStructureKey = null;
function __velarReactiveRaw(value) {
  return value;
}
function __velarHostRaw(value) {
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
function __velarTextArgument(value, name) {
  if (typeof value !== "string") throw new __velarTextNativeTypeError2(name + " must be a string");
  if (value.length > __velarMaxTextCodeUnits2) throw new __velarTextNativeRangeError2(name + " cannot exceed 16 MiB");
  return value;
}
function __velarTextNextCodePointOffset(value, offset) {
  const first = __velarTextCall2(__velarNativeStringCharCodeAt2, value, [offset]);
  if (first < 55296 || first > 56319 || offset + 1 >= value.length) return offset + 1;
  const second = __velarTextCall2(__velarNativeStringCharCodeAt2, value, [offset + 1]);
  return second >= 56320 && second <= 57343 ? offset + 2 : offset + 1;
}
var __velarTextCheckpointStride = 64;
var __velarTextMeasureMinimumUnits = 64;
var __velarTextMeasureCacheEntries = 512;
var __velarTextMeasureCacheUnits2 = 8 * 1024 * 1024;
var __velarTextMeasureCache2 = typeof __velarTextNativeMap2 === "function" && typeof __velarTextMapGet2 === "function" && typeof __velarTextMapSet2 === "function" && typeof __velarTextMapClear2 === "function" ? new __velarTextNativeMap2() : null;
var __velarTextMeasureCacheCount = 0;
var __velarTextMeasureCacheHeld = 0;
function __velarTextMeasureText(value) {
  if (__velarTextCall2(__velarTextSurrogateExec2, __velarTextSurrogatePattern2, [value]) === null) {
    return { length: value.length, dense: true, checkpoints: null };
  }
  const checkpoints = new __velarTextNativeArray2();
  let length = 0, offset = 0;
  while (offset < value.length) {
    if (length % __velarTextCheckpointStride === 0) checkpoints[length / __velarTextCheckpointStride] = offset;
    offset = __velarTextNextCodePointOffset(value, offset);
    length += 1;
  }
  return { length, dense: length === value.length, checkpoints };
}
function __velarTextMeasure(value) {
  if (__velarTextMeasureCache2 === null || value.length < __velarTextMeasureMinimumUnits) return __velarTextMeasureText(value);
  const cached = __velarTextCall2(__velarTextMapGet2, __velarTextMeasureCache2, [value]);
  if (cached !== void 0) return cached;
  const measured = __velarTextMeasureText(value);
  if (__velarTextMeasureCacheCount >= __velarTextMeasureCacheEntries || __velarTextMeasureCacheCount > 0 && __velarTextMeasureCacheHeld + value.length > __velarTextMeasureCacheUnits2) {
    __velarTextCall2(__velarTextMapClear2, __velarTextMeasureCache2, []);
    __velarTextMeasureCacheCount = 0;
    __velarTextMeasureCacheHeld = 0;
  }
  __velarTextCall2(__velarTextMapSet2, __velarTextMeasureCache2, [value, measured]);
  __velarTextMeasureCacheCount += 1;
  __velarTextMeasureCacheHeld += value.length;
  return measured;
}
function __velarTextCodePointLength(value) {
  return __velarTextMeasure(value).length;
}
function __velarTextIsBoundary(value, offset) {
  if (offset <= 0 || offset >= value.length) return true;
  const lead = __velarTextCall2(__velarNativeStringCharCodeAt2, value, [offset - 1]);
  if (lead < 55296 || lead > 56319) return true;
  const trail = __velarTextCall2(__velarNativeStringCharCodeAt2, value, [offset]);
  return trail < 56320 || trail > 57343;
}
function __velarTextNeedsBoundaryCheck(search) {
  const first = __velarTextCall2(__velarNativeStringCharCodeAt2, search, [0]);
  if (first >= 56320 && first <= 57343) return true;
  const last = __velarTextCall2(__velarNativeStringCharCodeAt2, search, [search.length - 1]);
  return last >= 55296 && last <= 56319;
}
function __velarTextBoundedIndexOf(value, search, cursor) {
  if (!__velarTextNeedsBoundaryCheck(search)) return __velarTextCall2(__velarNativeStringIndexOf2, value, [search, cursor]);
  while (cursor <= value.length) {
    const found = __velarTextCall2(__velarNativeStringIndexOf2, value, [search, cursor]);
    if (found < 0) return -1;
    if (__velarTextIsBoundary(value, found) && __velarTextIsBoundary(value, found + search.length)) return found;
    cursor = found + 1;
  }
  return -1;
}
function __velarTextReplacementOutputUnits(value, search, replacement, all) {
  let matches = 0;
  if (search === "") matches = all ? __velarTextCodePointLength(value) + 1 : 1;
  else {
    let cursor = 0;
    while (true) {
      const index = __velarTextBoundedIndexOf(value, search, cursor);
      if (index < 0) break;
      matches += 1;
      if (!all) break;
      cursor = index + search.length;
    }
  }
  if (replacement.length <= search.length || matches === 0) return value.length;
  const growth = replacement.length - search.length;
  if (matches > __velarTextCall2(__velarTextMathFloor2, __velarTextNativeMath2, [(__velarMaxTextCodeUnits2 - value.length) / growth])) return __velarMaxTextCodeUnits2 + 1;
  return value.length + matches * growth;
}
function __velarStringSize(value) {
  return __velarTextCodePointLength(__velarTextValue(value));
}
function __velarStringIsBlank(value) {
  return __velarTextCall2(__velarNativeStringTrim2, __velarTextValue(value), []) === "";
}
function __velarStringHas(value, text) {
  value = __velarTextValue(value);
  text = __velarTextArgument(text, "String.has text");
  return text === "" || __velarTextBoundedIndexOf(value, text, 0) >= 0;
}
function __velarStringReplaceAll(value, from, to) {
  value = __velarTextValue(value);
  from = __velarTextArgument(from, "String.replaceAll from");
  to = __velarTextArgument(to, "String.replaceAll to");
  if (__velarTextReplacementOutputUnits(value, from, to, true) > __velarMaxTextCodeUnits2) throw new __velarTextNativeRangeError2("String.replaceAll output cannot exceed 16 MiB");
  if (from === "") {
    let output2 = to;
    let offset = 0;
    while (offset < value.length) {
      const next = __velarTextNextCodePointOffset(value, offset);
      output2 += __velarTextCall2(__velarNativeStringSlice2, value, [offset, next]) + to;
      offset = next;
    }
    return output2;
  }
  if (!__velarTextNeedsBoundaryCheck(from)) return __velarTextCall2(__velarNativeStringReplaceAll2, value, [from, () => to]);
  let output = "";
  let cursor = 0;
  while (true) {
    const found = __velarTextBoundedIndexOf(value, from, cursor);
    if (found < 0) break;
    output += __velarTextCall2(__velarNativeStringSlice2, value, [cursor, found]) + to;
    cursor = found + from.length;
  }
  return output + __velarTextCall2(__velarNativeStringSlice2, value, [cursor]);
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
function __velarNumberIsInteger(value) {
  return __velarNumberCall(__velarNumberNativeIsInteger, __velarNumberNativeNumber, [__velarNumberValue(value)]);
}
function __velarNumberIsFinite(value) {
  return __velarNumberCall(__velarNumberNativeIsFinite, __velarNumberNativeNumber, [__velarNumberValue(value)]);
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

// velar-standard:velar/compiler-runtime-promises-v1
var __velarNormalizeGlobal = globalThis;
var __velarNormalizeNativeObject = globalThis.Object;
var __velarNormalizeNativeReflect = globalThis.Reflect;
var __velarNormalizeNativeWeakMap = globalThis.WeakMap;
var __velarNormalizeNativePromise = globalThis.Promise;
var __velarNormalizeNativeSymbol = globalThis.Symbol;
var __velarNormalizeTypeError = globalThis.TypeError;
var __velarNormalizeGetOwnPropertyDescriptor = __velarNormalizeNativeObject.getOwnPropertyDescriptor;
var __velarNormalizeGetPrototypeOf = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeNativeObject, "getPrototypeOf")?.value;
var __velarNormalizeDefineProperty = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeNativeObject, "defineProperty")?.value;
var __velarNormalizeApply = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeNativeReflect, "apply")?.value;
var __velarNormalizeWeakMapPrototype = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeNativeWeakMap, "prototype")?.value;
var __velarNormalizeWeakMapHas = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeWeakMapPrototype, "has")?.value;
var __velarNormalizeWeakMapGet = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeWeakMapPrototype, "get")?.value;
var __velarNormalizeWeakMapSet = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeWeakMapPrototype, "set")?.value;
var __velarNormalizePromisePrototype = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeNativePromise, "prototype")?.value;
var __velarNormalizePromiseThen = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizePromisePrototype, "then")?.value;
var __velarNormalizeSymbolFor = __velarNormalizeGetOwnPropertyDescriptor(__velarNormalizeNativeSymbol, "for")?.value;
function __velarNormalizeCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarNormalizeApply !== "function") throw new __velarNormalizeTypeError("The JavaScript Promise normalization runtime is unavailable");
  return __velarNormalizeApply(operation, receiver, arguments_);
}
var __velarNormalizedPromiseRegistryKey = __velarNormalizeCall(__velarNormalizeSymbolFor, __velarNormalizeNativeSymbol, ["velar.promise.normalization.v1"]);
var __velarNormalizedPromiseValues = (() => {
  const descriptor = __velarNormalizeCall(__velarNormalizeGetOwnPropertyDescriptor, __velarNormalizeNativeObject, [__velarNormalizeGlobal, __velarNormalizedPromiseRegistryKey]);
  if (descriptor) {
    if (!("value" in descriptor) || descriptor.enumerable || descriptor.configurable || descriptor.writable) {
      throw new __velarNormalizeTypeError("VelarScript Promise normalization registry ownership is invalid");
    }
    try {
      __velarNormalizeCall(__velarNormalizeWeakMapHas, descriptor.value, [descriptor.value]);
    } catch {
      throw new __velarNormalizeTypeError("VelarScript Promise normalization registry is invalid");
    }
    return descriptor.value;
  }
  const registry = new __velarNormalizeNativeWeakMap();
  __velarNormalizeCall(__velarNormalizeDefineProperty, __velarNormalizeNativeObject, [__velarNormalizeGlobal, __velarNormalizedPromiseRegistryKey, {
    value: registry,
    enumerable: false,
    configurable: false,
    writable: false
  }]);
  return registry;
})();
function __velarNormalizeOwnsPromise(candidate) {
  if (typeof candidate !== "object" && typeof candidate !== "function" || candidate === null) return false;
  let prototype;
  try {
    prototype = __velarNormalizeCall(__velarNormalizeGetPrototypeOf, __velarNormalizeNativeObject, [candidate]);
  } catch {
    return false;
  }
  return prototype === __velarNormalizePromisePrototype;
}
function __velarNormalizePromiseValue(value) {
  if (typeof value !== "object" && typeof value !== "function" || value === null) throw new __velarNormalizeTypeError("Expected an actual Promise");
  const known = __velarNormalizeCall(__velarNormalizeWeakMapGet, __velarNormalizedPromiseValues, [value]);
  if (known) return known;
  let settle;
  let fail;
  try {
    __velarNormalizeCall(__velarNormalizePromiseThen, value, [
      (resolved) => {
        if (typeof settle === "function") settle(resolved ?? null);
      },
      (reason) => {
        if (typeof fail === "function") fail(reason);
      }
    ]);
  } catch {
    throw new __velarNormalizeTypeError("Expected an actual Promise");
  }
  if (typeof __velarNormalizeNativePromise !== "function") throw new __velarNormalizeTypeError("The JavaScript Promise normalization runtime is unavailable");
  const normalized = new __velarNormalizeNativePromise((resolve, reject) => {
    settle = resolve;
    fail = reject;
  });
  if (typeof settle !== "function" || typeof fail !== "function" || !__velarNormalizeOwnsPromise(normalized)) throw new __velarNormalizeTypeError("The JavaScript Promise normalization runtime is unavailable");
  __velarNormalizeCall(__velarNormalizeWeakMapSet, __velarNormalizedPromiseValues, [value, normalized]);
  __velarNormalizeCall(__velarNormalizeWeakMapSet, __velarNormalizedPromiseValues, [normalized, normalized]);
  return normalized;
}
function __velarAsyncResolvedValue(value) {
  if (value === void 0) return null;
  if (typeof value !== "object" && typeof value !== "function" || value === null) return value;
  try {
    return __velarNormalizePromiseValue(value);
  } catch {
  }
  let owner = value;
  for (let depth = 0; owner !== null && depth < 128; depth += 1) {
    let descriptor;
    try {
      descriptor = __velarNormalizeCall(__velarNormalizeGetOwnPropertyDescriptor, __velarNormalizeNativeObject, [owner, "then"]);
    } catch {
      throw new __velarNormalizeTypeError("An async result must not expose a callable 'then' or a 'then' getter");
    }
    if (descriptor) {
      if (!("value" in descriptor) || typeof descriptor.value === "function") throw new __velarNormalizeTypeError("An async result must not expose a callable 'then' or a 'then' getter");
      return value;
    }
    try {
      owner = __velarNormalizeCall(__velarNormalizeGetPrototypeOf, __velarNormalizeNativeObject, [owner]);
    } catch {
      throw new __velarNormalizeTypeError("An async result must have an inspectable prototype chain");
    }
  }
  if (owner !== null) throw new __velarNormalizeTypeError("An async result prototype chain is too deep");
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
function __velarErrorApply(operation, receiver, arguments_, label) {
  if (typeof operation !== "function" || typeof __velarErrorReflectApply !== "function") {
    throw new __velarErrorNativeTypeError("The JavaScript " + label + " API is unavailable");
  }
  return __velarErrorReflectApply(operation, receiver, arguments_);
}
function __velarIsError(value) {
  return __velarErrorApply(__velarErrorIsErrorOperation, __velarErrorNativeError, [value], "Error.isError");
}
function __velarNormalizeError(value) {
  if (__velarIsError(value)) return value;
  const kind = typeof value;
  let message;
  if (kind === "string") message = value;
  else if (value === null) message = "null";
  else if (kind === "undefined") message = "undefined";
  else if (kind === "number" || kind === "boolean" || kind === "bigint" || kind === "symbol") {
    message = __velarErrorApply(__velarErrorNativeString, globalThis, [value], "String");
  } else message = "A non-Error value was thrown by JavaScript";
  return new __velarErrorNativeError(message, { cause: value });
}
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

// velar-standard:velar/compiler-runtime-types-v1
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
function __velarCollectionBrand(value) {
  if (value === null || typeof value !== "object" && typeof value !== "function") return 0;
  const known = __velarCollectionHostCall(__velarCollectionWeakMapGetOperation, __velarCollectionBrands, [value]);
  if (known !== void 0) return known;
  let brand = 0;
  try {
    __velarCollectionHostCall(__velarCollectionMapSize, value, []);
    brand = 1;
  } catch {
    try {
      __velarCollectionHostCall(__velarCollectionSetSize, value, []);
      brand = 2;
    } catch {
      brand = 0;
    }
  }
  __velarCollectionHostCall(__velarCollectionWeakMapSetOperation, __velarCollectionBrands, [value, brand]);
  return brand;
}
function __velarIsMap(value) {
  return __velarCollectionBrand(value) === 1;
}
function __velarIsSet(value) {
  return __velarCollectionBrand(value) === 2;
}
var __velarCollectionOwnNames = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertyNames")?.value;
var __velarCollectionOwnSymbols = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertySymbols")?.value;
var __velarCollectionOwnKeys = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeReflect, "ownKeys")?.value;
var __velarCollectionMapEntries = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "entries")?.value;
var __velarCollectionSetValues = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "values")?.value;
var __velarCollectionMapIteratorPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarCollectionHostCall(__velarCollectionMapEntries, new __velarCollectionNativeMap(), [])]);
var __velarCollectionSetIteratorPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarCollectionHostCall(__velarCollectionSetValues, new __velarCollectionNativeSet(), [])]);
var __velarCollectionMapIteratorNext = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapIteratorPrototype, "next")?.value;
var __velarCollectionSetIteratorNext = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetIteratorPrototype, "next")?.value;
function __velarCollectionMapTypeIterator(value) {
  return __velarCollectionHostCall(__velarCollectionMapEntries, value, []);
}
function __velarCollectionSetTypeIterator(value) {
  return __velarCollectionHostCall(__velarCollectionSetValues, value, []);
}
function __velarCollectionMapTypeNext(iterator) {
  return __velarCollectionHostCall(__velarCollectionMapIteratorNext, iterator, []);
}
function __velarCollectionSetTypeNext(iterator) {
  return __velarCollectionHostCall(__velarCollectionSetIteratorNext, iterator, []);
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
var __velarValidationWeakMapPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarValidationNativeWeakMap, "prototype")?.value;
var __velarValidationSetPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarValidationNativeSet, "prototype")?.value;
var __velarValidationFunctionPrototype = __velarCollectionGetOwnPropertyDescriptor(__velarValidationNativeFunction, "prototype")?.value;
var __velarValidationHasInstanceSymbol = __velarCollectionGetOwnPropertyDescriptor(__velarValidationNativeSymbol, "hasInstance")?.value;
var __velarValidationWeakMapGetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationWeakMapPrototype, "get")?.value;
var __velarValidationWeakMapSetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationWeakMapPrototype, "set")?.value;
var __velarValidationWeakMapDeleteOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationWeakMapPrototype, "delete")?.value;
var __velarValidationSetHasOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationSetPrototype, "has")?.value;
var __velarValidationSetAddOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationSetPrototype, "add")?.value;
var __velarValidationSetDeleteOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationSetPrototype, "delete")?.value;
var __velarValidationSetSizeOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationSetPrototype, "size")?.get;
var __velarValidationFunctionHasInstanceOperation = __velarCollectionGetOwnPropertyDescriptor(__velarValidationFunctionPrototype, __velarValidationHasInstanceSymbol)?.value;
var __velarValidationFreezeOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "freeze")?.value;
var __velarValidationDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "defineProperty")?.value;
var __velarValidationMapSetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "set")?.value;
var __velarValidationMapGetOperation = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "get")?.value;
function __velarValidationState() {
  return { active: new __velarValidationNativeWeakMap(), depth: 0, copies: null, copy: __velarValidationCopy };
}
function __velarValidationSet() {
  return new __velarValidationNativeSet();
}
function __velarValidationWeakMapGet(value, key) {
  return __velarCollectionHostCall(__velarValidationWeakMapGetOperation, value, [key]);
}
function __velarValidationWeakMapSet(value, key, item) {
  return __velarCollectionHostCall(__velarValidationWeakMapSetOperation, value, [key, item]);
}
function __velarValidationMapGet(value, key) {
  return __velarCollectionHostCall(__velarValidationMapGetOperation, value, [key]);
}
function __velarValidationMapSet(value, key, item) {
  return __velarCollectionHostCall(__velarValidationMapSetOperation, value, [key, item]);
}
function __velarValidationSetAdd(value, item) {
  return __velarCollectionHostCall(__velarValidationSetAddOperation, value, [item]);
}
function __velarValidationIsArray(value) {
  return __velarCollectionHostCall(__velarCollectionArrayIsArray, __velarCollectionNativeArray, [value]);
}
function __velarValidationOwnDescriptor(value, key) {
  return __velarCollectionHostCall(__velarCollectionGetOwnPropertyDescriptor, __velarCollectionNativeObject, [value, key]);
}
function __velarValidationIsInstance(value, constructor) {
  return __velarCollectionHostCall(__velarValidationFunctionHasInstanceOperation, constructor, [value]);
}
function __velarValidationFreeze(value) {
  return __velarCollectionHostCall(__velarValidationFreezeOperation, __velarCollectionNativeObject, [value]);
}
function __velarValidationIsPlainObject(value) {
  const prototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [value]);
  if (prototype === null) return true;
  return __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [prototype]) === null;
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
      plans = new __velarCollectionNativeMap();
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
    __velarCollectionHostCall(__velarValidationDefinePropertyOperation, __velarCollectionNativeObject, [target, name, { value, writable: true, enumerable: true, configurable: true }]);
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
    const result = __velarValidationCopy.remember(state, value, new __velarCollectionNativeMap(), plan);
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
    const keys = __velarCollectionHostCall(__velarCollectionOwnKeys, __velarCollectionNativeReflect, [value]);
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
    return __velarCollectionHostCall(operation, type, [value, state]);
  }
};
function __velarValidationRejectionHint(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || __velarValidationIsPlainObject(value)) return "";
  return "; a record accepts only plain data objects \u2014 project the fields into a record first, for example {x: instance.x}";
}
var __velarValidationErrorDefineProperty = globalThis.Object.defineProperty;
var __VelarValidationError = class extends __velarCollectionNativeTypeError {
  constructor(message, detail) {
    super(message);
    this.name = "ValidationError";
    this.path = detail?.path ?? null;
    this.field = detail?.field ?? null;
    this.reason = detail?.reason ?? null;
  }
};
__velarValidationErrorDefineProperty(__VelarValidationError, "name", { value: "ValidationError", writable: false, enumerable: false, configurable: true });

// velar-standard:velar/compiler-runtime-collections-v1
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
var __velarCollectionListNativeNumber = globalThis.Number;
var __velarCollectionListNativeMath = globalThis.Math;
var __velarCollectionListNativeRangeError = globalThis.RangeError;
var __velarCollectionListArrayPrototype = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeArray2, "prototype")?.value;
var __velarCollectionListOwnNamesOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertyNames")?.value;
var __velarCollectionListOwnSymbolsOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertySymbols")?.value;
var __velarCollectionListDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "defineProperty")?.value;
var __velarCollectionListObjectIsOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "is")?.value;
var __velarCollectionListIntegerOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListNativeNumber, "isInteger")?.value;
var __velarCollectionListNaNOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListNativeNumber, "isNaN")?.value;
var __velarCollectionListFiniteOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListNativeNumber, "isFinite")?.value;
var __velarCollectionListMaximumOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListNativeMath, "max")?.value;
var __velarCollectionListMinimumOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListNativeMath, "min")?.value;
var __velarCollectionListJoinOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListArrayPrototype, "join")?.value;
var __velarCollectionListSortOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListArrayPrototype, "sort")?.value;
var __velarCollectionListReverseOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionListArrayPrototype, "reverse")?.value;
function __velarCollectionListIsArray(value) {
  return __velarCollectionHostCall2(__velarCollectionArrayIsArray2, __velarCollectionNativeArray2, [value]);
}
function __velarCollectionListGetOwnPropertyDescriptor(value, key) {
  return __velarCollectionHostCall2(__velarCollectionGetOwnPropertyDescriptor2, __velarCollectionNativeObject2, [value, key]);
}
function __velarCollectionListOwnNames(value) {
  return __velarCollectionHostCall2(__velarCollectionListOwnNamesOperation, __velarCollectionNativeObject2, [value]);
}
function __velarCollectionListOwnSymbols(value) {
  return __velarCollectionHostCall2(__velarCollectionListOwnSymbolsOperation, __velarCollectionNativeObject2, [value]);
}
function __velarCollectionListDefineProperty(value, key, descriptor) {
  return __velarCollectionHostCall2(__velarCollectionListDefinePropertyOperation, __velarCollectionNativeObject2, [value, key, descriptor]);
}
function __velarCollectionListIsInteger(value) {
  return __velarCollectionHostCall2(__velarCollectionListIntegerOperation, __velarCollectionListNativeNumber, [value]);
}
var __velarCollectionSetMapNativeRangeError = globalThis.RangeError;
var __velarCollectionSetMapFreezeOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "freeze")?.value;
var __velarCollectionSetAddOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "add")?.value;
var __velarCollectionSetHasOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "has")?.value;
var __velarCollectionSetDeleteOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "delete")?.value;
var __velarCollectionSetClearOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "clear")?.value;
var __velarCollectionSetValuesOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetPrototype2, "values")?.value;
var __velarCollectionMapGetOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "get")?.value;
var __velarCollectionMapSetOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "set")?.value;
var __velarCollectionMapHasOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "has")?.value;
var __velarCollectionMapDeleteOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "delete")?.value;
var __velarCollectionMapClearOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "clear")?.value;
var __velarCollectionMapKeysOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "keys")?.value;
var __velarCollectionMapValuesOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "values")?.value;
var __velarCollectionMapEntriesOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionMapPrototype2, "entries")?.value;
var __velarCollectionSetMapMapIteratorPrototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [__velarCollectionHostCall2(__velarCollectionMapEntriesOperation, new __velarCollectionNativeMap2(), [])]);
var __velarCollectionSetMapSetIteratorPrototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [__velarCollectionHostCall2(__velarCollectionSetValuesOperation, new __velarCollectionNativeSet2(), [])]);
var __velarCollectionSetMapMapIteratorNext = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetMapMapIteratorPrototype, "next")?.value;
var __velarCollectionSetMapSetIteratorNext = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionSetMapSetIteratorPrototype, "next")?.value;
var __velarCollectionRecordNativeRangeError = globalThis.RangeError;
var __velarCollectionRecordOwnNamesOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertyNames")?.value;
var __velarCollectionRecordOwnSymbolsOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertySymbols")?.value;
var __velarCollectionRecordDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "defineProperty")?.value;
var __velarCollectionRecordObjectIsOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "is")?.value;
var __velarCollectionRecordDeletePropertyOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeReflect2, "deleteProperty")?.value;
var __velarCollectionRecordFreezeOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "freeze")?.value;

// velar-standard:velar/compiler-runtime-collection-lowering-v1
var __velarMaxCollectionItems = 1e6;
var __velarCollectionValue = (value) => value === void 0 ? null : value;
var __velarListNativeWeakMap = globalThis.WeakMap;
var __velarListWeakMapPrototype = __velarCollectionListGetOwnPropertyDescriptor(__velarListNativeWeakMap, "prototype")?.value;
var __velarListWeakMapGetOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListWeakMapPrototype, "get")?.value;
var __velarListWeakMapSetOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListWeakMapPrototype, "set")?.value;
var __velarListMemos = new __velarListNativeWeakMap();
var __velarListIsFrozenOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarCollectionNativeObject2, "isFrozen")?.value;
function __velarListRejectFrozen(value, name) {
  if (__velarCollectionHostCall2(__velarListIsFrozenOperation, __velarCollectionNativeObject2, [value])) {
    throw new __velarCollectionNativeTypeError2(name + " received a frozen JavaScript array; copy it on the JavaScript side \u2014 [...values] \u2014 before passing it to VelarScript");
  }
}
function __velarListMemo(value) {
  return __velarCollectionHostCall2(__velarListWeakMapGetOperation, __velarListMemos, [value]);
}
function __velarListIsOwned(value) {
  const memo = __velarListMemo(value);
  return memo !== void 0 && memo === value.length;
}
function __velarAdoptList(value) {
  __velarCollectionHostCall2(__velarListWeakMapSetOperation, __velarListMemos, [value, value.length]);
  return value;
}
function __velarMarkCheckedList(value) {
  __velarCollectionHostCall2(__velarListWeakMapSetOperation, __velarListMemos, [value, ~value.length]);
  return value;
}
function __velarMarkOwnedList(value) {
  const memo = __velarListMemo(value);
  return memo !== void 0 && memo < 0 ? __velarMarkCheckedList(value) : __velarAdoptList(value);
}
function __velarListRequireMutableLength(value, name) {
  const lengthDescriptor = __velarCollectionListGetOwnPropertyDescriptor(value, "length");
  if (!lengthDescriptor || !lengthDescriptor.writable || lengthDescriptor.enumerable || lengthDescriptor.configurable || !("value" in lengthDescriptor)) throw new __velarCollectionNativeTypeError2(name + " requires an ordinary mutable List length");
}
function __velarValidateDenseList(value, name) {
  value = __velarReactiveRaw(value);
  if (!__velarCollectionListIsArray(value) || value.length > __velarMaxCollectionItems || __velarCollectionListOwnSymbols(value).length > 0 || __velarCollectionListOwnNames(value).length !== value.length + 1) {
    throw new __velarCollectionNativeTypeError2(name + " requires a dense VelarScript List");
  }
  __velarListRejectFrozen(value, name);
  __velarListRequireMutableLength(value, name);
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = __velarCollectionListGetOwnPropertyDescriptor(value, index);
    if (!descriptor?.enumerable || !descriptor.configurable || !descriptor.writable || !("value" in descriptor)) throw new __velarCollectionNativeTypeError2(name + " requires ordinary mutable List data elements");
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
  if (!descriptor?.enumerable || !descriptor.configurable || !descriptor.writable || !("value" in descriptor)) throw new __velarCollectionNativeTypeError2(name + " requires ordinary mutable List data elements");
  return descriptor.value;
}
function __velarOwnedListElement(value, index, name) {
  const element = value[index];
  return element === void 0 ? __velarCheckedListElement(value, index, name) : element;
}
function __velarListElement(value, index, name, owned) {
  return owned ? __velarOwnedListElement(value, index, name) : __velarCheckedListElement(value, index, name);
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
var __velarListRegExpPrototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [__velarListSurrogatePattern]);
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
function __velarListMap(value, transform) {
  const items = __velarCopyList(value, "List.map");
  __velarReactiveCollectionTrack(value);
  const output = new __velarCollectionNativeArray2(items.length);
  for (let index = 0; index < items.length; index += 1) {
    const item = transform(__velarReactiveCollectionRead(value, index, items[index]));
    output[index] = item === void 0 ? null : __velarReactiveRaw(item);
  }
  return __velarAdoptList(output);
}

// src/src/index.vel
import { DatabaseExecutor, DatabaseStatement, trustedSql } from "@velarscript-labs/database";

// velar-embedded:src/index.2ibbmz.embedded-1.js
import { AsyncLocalStorage } from "node:async_hooks";
import { Worker } from "node:worker_threads";
var TOKEN = Object.freeze({});
var connectionStates = /* @__PURE__ */ new WeakMap();
var transactionStates = /* @__PURE__ */ new WeakMap();
var transactionContext = new AsyncLocalStorage();
var NativeSqliteError = class extends Error {
  constructor(message = "SQLite operation failed", sqliteCode = null, operation = "unknown", retryable = false) {
    super(message);
    this.name = "NativeSqliteError";
    this.sqliteCode = sqliteCode;
    this.operation = operation;
    this.retryable = retryable;
  }
};
var NativeSqliteBackpressureError = class extends NativeSqliteError {
  constructor(message = "SQLite queue is full") {
    super(message, "SQLITE_BACKPRESSURE", "queue", true);
    this.name = "NativeSqliteBackpressureError";
  }
};
var NativeSqliteConcurrencyError = class extends NativeSqliteError {
  constructor(message = "SQLite connection cannot be used from its transaction callback") {
    super(message, "SQLITE_CONCURRENCY", "transaction", true);
    this.name = "NativeSqliteConcurrencyError";
  }
};
function integer(value, fallback, minimum, maximum, label) {
  const selected = value == null ? fallback : value;
  if (!Number.isSafeInteger(selected) || selected < minimum || selected > maximum) {
    throw new TypeError(label + " must be an integer from " + minimum + " through " + maximum);
  }
  return selected;
}
function checkedOptions(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new TypeError("SQLite options must be a record");
  const allowed = /* @__PURE__ */ new Set(["busyTimeoutMilliseconds", "queueCapacity", "maxRows", "maxResultBytes", "statementCacheCapacity", "journalMode", "readOnly"]);
  for (const key of Object.keys(value)) if (!allowed.has(key)) throw new TypeError("Unknown SQLite option " + key);
  const journalModes = /* @__PURE__ */ new Set(["delete", "truncate", "persist", "memory", "wal", "off"]);
  const journalMode = value.journalMode == null ? null : value.journalMode;
  if (journalMode !== null && (typeof journalMode !== "string" || !journalModes.has(journalMode))) throw new TypeError("SQLite journalMode must name a supported mode");
  if (value.readOnly != null && typeof value.readOnly !== "boolean") throw new TypeError("SQLite readOnly must be bool");
  if (value.readOnly === true && journalMode !== null) throw new TypeError("SQLite readOnly connections cannot change journalMode");
  return {
    busyTimeoutMilliseconds: integer(value.busyTimeoutMilliseconds, 2e3, 1, 6e4, "SQLite busy timeout"),
    queueCapacity: integer(value.queueCapacity, 64, 1, 1024, "SQLite queue capacity"),
    maxRows: integer(value.maxRows, 1e4, 1, 1e6, "SQLite row limit"),
    maxResultBytes: integer(value.maxResultBytes, 64 * 1024 * 1024, 1, 128 * 1024 * 1024, "SQLite result byte limit"),
    statementCacheCapacity: integer(value.statementCacheCapacity, 128, 1, 1024, "SQLite statement cache capacity"),
    journalMode,
    readOnly: value.readOnly === true
  };
}
function workerMain() {
  const { Buffer } = (0, globalThis.require)("node:buffer");
  const { parentPort, workerData } = (0, globalThis.require)("node:worker_threads");
  const { DatabaseSync, constants } = (0, globalThis.require)("node:sqlite");
  const { parseStmt } = (0, globalThis.require)("sqlite3-parser");
  let database = null;
  let statements = null;
  let closed = false;
  function failure(message, code, operation, retryable = false) {
    const error = new Error(message);
    error.code = code;
    error.operation = operation;
    error.retryable = retryable;
    return error;
  }
  function errorData(error, operation) {
    const message = error instanceof Error ? error.message : String(error);
    const rawCode = error && typeof error === "object" ? error.errstr ?? error.code ?? null : null;
    const code = rawCode == null ? null : String(rawCode);
    const upper = code == null ? "" : code.toUpperCase();
    return {
      message,
      sqliteCode: code,
      operation: error && typeof error.operation === "string" ? error.operation : operation,
      retryable: error && error.retryable === true || upper.includes("BUSY") || upper.includes("LOCKED")
    };
  }
  function parameter(value, budget) {
    if (value === null) return null;
    if (typeof value === "boolean") return value ? 1 : 0;
    if (typeof value === "string") {
      budget.value += Buffer.byteLength(value, "utf8");
      return value;
    }
    if (typeof value === "number") {
      if (!Number.isFinite(value)) throw failure("SQLite number parameters must be finite", "SQLITE_INPUT", "params");
      if (Number.isInteger(value) && !Number.isSafeInteger(value)) throw failure("SQLite integer parameters must be safe integers", "SQLITE_INPUT", "params");
      budget.value += 8;
      return value;
    }
    if (value instanceof Uint8Array) {
      budget.value += value.byteLength;
      return value;
    }
    throw failure("SQLite parameters support only null, bool, string, finite number, and Bytes", "SQLITE_INPUT", "params");
  }
  function parameters(value) {
    if (!Array.isArray(value) || value.length > 999) throw failure("SQLite parameters must be a List with at most 999 values", "SQLITE_INPUT", "params");
    const budget = { value: 0 };
    const output = value.map((item) => parameter(item, budget));
    if (budget.value > workerData.maxResultBytes) throw failure("SQLite parameters exceed the connection byte limit", "SQLITE_INPUT", "params");
    return output;
  }
  function statementParts(rawFragments, rawParameters, operation) {
    if (!Array.isArray(rawFragments) || rawFragments.length !== rawParameters.length + 1 || rawFragments.length > 1e3) {
      throw failure("SQLite statements require exactly one more SQL fragment than bound parameters", "SQLITE_INPUT", operation);
    }
    let sourceBytes = 0;
    const fragments = rawFragments.map((fragment) => {
      if (typeof fragment !== "string" || fragment.includes("\0") || fragment.includes("?")) {
        throw failure("SQLite SQL fragments must be text without NUL or raw parameter placeholders", "SQLITE_INPUT", operation);
      }
      sourceBytes += Buffer.byteLength(fragment, "utf8");
      return fragment;
    });
    if (sourceBytes === 0 || sourceBytes > 1024 * 1024) throw failure("SQLite SQL must be non-empty text no longer than 1 MiB", "SQLITE_INPUT", operation);
    const bound = parameters(rawParameters);
    const source = fragments.join("?");
    const parsed = parseStmt(source);
    if (parsed.status !== "ok") {
      const message = parsed.errors.length === 0 ? "invalid statement" : parsed.errors[0].message;
      throw failure("SQLite requires exactly one valid statement: " + message, "SQLITE_INPUT", operation);
    }
    return { fragments, bound };
  }
  function count(value, label) {
    const number = typeof value === "bigint" ? Number(value) : value;
    if (!Number.isSafeInteger(number) || number < 0) throw failure(label + " is outside VelarScript's safe integer range", "SQLITE_INTEGER_RANGE", "result");
    return number;
  }
  function resultValue(value, budget, field) {
    if (value === null) return null;
    if (typeof value === "string") {
      budget.value += Buffer.byteLength(value, "utf8");
      return value;
    }
    if (typeof value === "number") {
      if (!Number.isFinite(value)) throw failure("SQLite returned a non-finite number in " + field, "SQLITE_RESULT", "result");
      budget.value += 8;
      return value;
    }
    if (typeof value === "bigint") {
      const number = Number(value);
      if (!Number.isSafeInteger(number)) throw failure("SQLite returned an integer outside VelarScript's safe range in " + field, "SQLITE_INTEGER_RANGE", "result");
      budget.value += 8;
      return number;
    }
    if (value instanceof Uint8Array) {
      budget.value += value.byteLength;
      return value;
    }
    throw failure("SQLite returned an unsupported value in " + field, "SQLITE_RESULT", "result");
  }
  function resultRow(value, budget) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) throw failure("SQLite returned a non-record row", "SQLITE_RESULT", "result");
    const output = /* @__PURE__ */ Object.create(null);
    for (const key of Object.keys(value)) {
      budget.value += Buffer.byteLength(key, "utf8");
      output[key] = resultValue(value[key], budget, key);
      if (budget.value > workerData.maxResultBytes) throw failure("SQLite result exceeds the connection byte limit", "SQLITE_RESULT_LIMIT", "result");
    }
    return output;
  }
  function execute(message) {
    const statement = statementParts(message.fragments, message.params, "execute");
    const result = statements.run(statement.fragments, ...statement.bound);
    return count(result.changes, "SQLite affected row count");
  }
  function one(message) {
    const statement = statementParts(message.fragments, message.params, "one");
    const row = statements.get(statement.fragments, ...statement.bound);
    if (row === void 0) return null;
    return resultRow(row, { value: 0 });
  }
  function all(message) {
    const statement = statementParts(message.fragments, message.params, "all");
    const rows = [];
    const budget = { value: 0 };
    for (const row of statements.iterate(statement.fragments, ...statement.bound)) {
      if (rows.length >= workerData.maxRows) throw failure("SQLite result exceeds the connection row limit", "SQLITE_ROW_LIMIT", "all");
      rows.push(resultRow(row, budget));
    }
    return rows;
  }
  function dispatch(message) {
    if (closed) throw failure("SQLite connection is closed", "SQLITE_CLOSED", message.operation);
    if (message.operation === "execute") return execute(message);
    if (message.operation === "one") return one(message);
    if (message.operation === "all") return all(message);
    if (message.operation === "begin") {
      if (database.isTransaction) throw failure("SQLite transaction is already active", "SQLITE_TRANSACTION", "begin", true);
      database.exec("BEGIN IMMEDIATE");
      return null;
    }
    if (message.operation === "commit") {
      if (!database.isTransaction) throw failure("SQLite transaction is not active", "SQLITE_TRANSACTION", "commit");
      database.exec("COMMIT");
      return null;
    }
    if (message.operation === "rollback") {
      if (database.isTransaction) database.exec("ROLLBACK");
      return null;
    }
    if (message.operation === "close") {
      try {
        if (database.isTransaction) database.exec("ROLLBACK");
      } finally {
        database.close();
        closed = true;
      }
      return null;
    }
    throw failure("Unknown SQLite operation", "SQLITE_PROTOCOL", String(message.operation));
  }
  try {
    database = new DatabaseSync(workerData.path, {
      timeout: workerData.busyTimeoutMilliseconds,
      readOnly: workerData.readOnly,
      enableForeignKeyConstraints: true,
      enableDoubleQuotedStringLiterals: false,
      allowExtension: false,
      readBigInts: true,
      allowBareNamedParameters: false,
      allowUnknownNamedParameters: false,
      defensive: true,
      limits: {
        length: workerData.maxResultBytes,
        sqlLength: 1024 * 1024,
        column: 2e3,
        exprDepth: 1e3,
        compoundSelect: 500,
        vdbeOp: 25e4,
        functionArg: 1e3,
        attach: 0,
        likePatternLength: 5e4,
        variableNumber: 999,
        triggerDepth: 100
      }
    });
    database.enableDefensive(true);
    database.enableLoadExtension(false);
    database.setAuthorizer((actionCode, arg1, arg2) => {
      if (actionCode === constants.SQLITE_ATTACH || actionCode === constants.SQLITE_DETACH) return constants.SQLITE_DENY;
      if (actionCode === constants.SQLITE_FUNCTION && typeof arg2 === "string" && arg2.toLowerCase() === "load_extension") return constants.SQLITE_DENY;
      return constants.SQLITE_OK;
    });
    statements = database.createTagStore(workerData.statementCacheCapacity);
    if (workerData.journalMode !== null) database.exec("PRAGMA journal_mode = " + workerData.journalMode.toUpperCase());
    parentPort.postMessage({ kind: "ready" });
  } catch (error) {
    parentPort.postMessage({ kind: "ready", error: errorData(error, "open") });
    parentPort.close();
    return;
  }
  parentPort.on("message", (message) => {
    try {
      const value = dispatch(message);
      parentPort.postMessage({ kind: "response", id: message.id, value });
      if (message.operation === "close") parentPort.close();
    } catch (error) {
      parentPort.postMessage({ kind: "response", id: message.id, error: errorData(error, message.operation) });
    }
  });
}
function nativeError(value) {
  return new NativeSqliteError(value.message, value.sqliteCode, value.operation, value.retryable);
}
function failPending(state, error) {
  if (state.readyReject !== null) {
    state.readyReject(error);
    state.readyReject = null;
    state.readyResolve = null;
  }
  for (const pending of state.pending.values()) pending.reject(error);
  state.pending.clear();
}
function request(state, operation, fragments = [""], params = []) {
  if (state.closed) return Promise.reject(new NativeSqliteError("SQLite connection is closed", "SQLITE_CLOSED", operation));
  const id = state.nextId++;
  return new Promise((resolve, reject) => {
    state.pending.set(id, { resolve, reject });
    try {
      state.worker.postMessage({ id, operation, fragments, params });
    } catch (error) {
      state.pending.delete(id);
      reject(error);
    }
  });
}
function stateOf(connection) {
  const state = connectionStates.get(connection);
  if (!state) throw new TypeError("Invalid SQLite connection");
  return state;
}
function transactionStateOf(transaction) {
  const state = transactionStates.get(transaction);
  if (!state || !state.active) throw new NativeSqliteConcurrencyError("SQLite transaction is no longer active");
  return state;
}
function transactionRequest(transaction, operation, fragments = [""], params = []) {
  const state = transactionStateOf(transaction);
  if (state.busy) return Promise.reject(new NativeSqliteConcurrencyError("SQLite transaction operations must be awaited one at a time"));
  state.busy = true;
  return request(state.connection, operation, fragments, params).finally(() => {
    state.busy = false;
  });
}
function enqueue(state, operation) {
  if (state.closed || state.closing) return Promise.reject(new NativeSqliteError("SQLite connection is closed", "SQLITE_CLOSED", "queue"));
  if (transactionContext.getStore() === state) return Promise.reject(new NativeSqliteConcurrencyError());
  if (state.queued >= state.queueCapacity) return Promise.reject(new NativeSqliteBackpressureError());
  state.queued += 1;
  const running = state.tail.then(operation, operation);
  state.tail = running.then(() => null, () => null);
  return running.finally(() => {
    state.queued -= 1;
  });
}
var NativeSqliteTransaction = class {
  constructor(token, state) {
    if (token !== TOKEN) throw new TypeError("SQLite transactions are created by connection.transaction");
    transactionStates.set(this, state);
  }
  execute(fragments, params = []) {
    return transactionRequest(this, "execute", fragments, params);
  }
  one(fragments, params = []) {
    return transactionRequest(this, "one", fragments, params);
  }
  all(fragments, params = []) {
    return transactionRequest(this, "all", fragments, params);
  }
};
var NativeSqliteConnection = class {
  constructor(token, state) {
    if (token !== TOKEN) throw new TypeError("Use openSqlite to create a SQLite connection");
    connectionStates.set(this, state);
  }
  execute(fragments, params = []) {
    const state = stateOf(this);
    return enqueue(state, () => request(state, "execute", fragments, params));
  }
  one(fragments, params = []) {
    const state = stateOf(this);
    return enqueue(state, () => request(state, "one", fragments, params));
  }
  all(fragments, params = []) {
    const state = stateOf(this);
    return enqueue(state, () => request(state, "all", fragments, params));
  }
  transaction(operation) {
    if (typeof operation !== "function") return Promise.reject(new TypeError("SQLite transaction requires an async operation"));
    const state = stateOf(this);
    return enqueue(state, async () => {
      await request(state, "begin");
      const transactionState = { connection: state, active: true, busy: false };
      const transaction = new NativeSqliteTransaction(TOKEN, transactionState);
      try {
        await transactionContext.run(state, () => operation(transaction));
        await transactionRequest(transaction, "commit");
        transactionState.active = false;
        return null;
      } catch (error) {
        try {
          if (transactionState.active) await transactionRequest(transaction, "rollback");
        } catch {
          state.closing = true;
          state.worker.terminate();
        } finally {
          transactionState.active = false;
        }
        throw error;
      }
    });
  }
  close() {
    const state = stateOf(this);
    if (state.closePromise !== null) return state.closePromise;
    if (transactionContext.getStore() === state) return Promise.reject(new NativeSqliteConcurrencyError("SQLite connection cannot close inside its transaction callback"));
    state.closing = true;
    state.closePromise = state.tail.then(async () => {
      try {
        if (!state.closed) await request(state, "close");
        await state.exited;
      } finally {
        state.closed = true;
      }
    });
    return state.closePromise;
  }
};
async function openNativeSqlite(path, options = {}) {
  if (typeof path !== "string" || path.trim() === "" || path.length > 4096 || path.includes("\0")) throw new TypeError("SQLite path must be non-empty bounded text");
  const checked = checkedOptions(options);
  const source = "(" + workerMain.toString() + ")()";
  const worker = new Worker(source, { eval: true, workerData: { path, ...checked } });
  let readyResolve;
  let readyReject;
  let exitResolve;
  const ready = new Promise((resolve, reject) => {
    readyResolve = resolve;
    readyReject = reject;
  });
  const exited = new Promise((resolve) => {
    exitResolve = resolve;
  });
  const state = {
    worker,
    readyResolve,
    readyReject,
    exited,
    pending: /* @__PURE__ */ new Map(),
    nextId: 1,
    queueCapacity: checked.queueCapacity,
    queued: 0,
    tail: Promise.resolve(),
    closing: false,
    closed: false,
    closePromise: null
  };
  worker.on("message", (message) => {
    if (message.kind === "ready") {
      const resolve = state.readyResolve;
      const reject = state.readyReject;
      state.readyResolve = null;
      state.readyReject = null;
      if (message.error) reject(nativeError(message.error));
      else resolve();
      return;
    }
    if (message.kind !== "response") return;
    const pending = state.pending.get(message.id);
    if (!pending) return;
    state.pending.delete(message.id);
    if (message.error) pending.reject(nativeError(message.error));
    else pending.resolve(message.value);
  });
  worker.on("error", (error) => {
    state.closed = true;
    failPending(state, new NativeSqliteError(error.message, "SQLITE_WORKER", "worker"));
  });
  worker.on("exit", (code) => {
    exitResolve(code);
    if (code !== 0 && !state.closed) {
      state.closed = true;
      failPending(state, new NativeSqliteError("SQLite Worker exited with code " + code, "SQLITE_WORKER", "worker"));
    }
  });
  await ready;
  return new NativeSqliteConnection(TOKEN, state);
}

// src/src/index.vel
var SqliteJournalMode = __velarRegisterRuntimeType(__velarValidationFreeze({
  delete: "delete",
  truncate: "truncate",
  persist: "persist",
  memory: "memory",
  wal: "wal",
  off: "off",
  is(value) {
    return value === "delete" || value === "truncate" || value === "persist" || value === "memory" || value === "wal" || value === "off";
  },
  parse(value) {
    if (!SqliteJournalMode.is(value)) {
      throw new __VelarValidationError("Value does not match SqliteJournalMode", { path: "SqliteJournalMode" });
    }
    return value;
  },
  copy(value) {
    return value;
  },
  values() {
    return ["delete", "truncate", "persist", "memory", "wal", "off"];
  }
}));
function __velarTypeExplain_SqliteOptions(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "SqliteOptions", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "busyTimeoutMilliseconds");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || typeof __velarExplainField.value === "number"))) {
      return { path: "SqliteOptions.busyTimeoutMilliseconds", field: "busyTimeoutMilliseconds", reason: "field 'busyTimeoutMilliseconds' does not match number?" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "queueCapacity");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || typeof __velarExplainField.value === "number"))) {
      return { path: "SqliteOptions.queueCapacity", field: "queueCapacity", reason: "field 'queueCapacity' does not match number?" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "maxRows");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || typeof __velarExplainField.value === "number"))) {
      return { path: "SqliteOptions.maxRows", field: "maxRows", reason: "field 'maxRows' does not match number?" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "maxResultBytes");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || typeof __velarExplainField.value === "number"))) {
      return { path: "SqliteOptions.maxResultBytes", field: "maxResultBytes", reason: "field 'maxResultBytes' does not match number?" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "statementCacheCapacity");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || typeof __velarExplainField.value === "number"))) {
      return { path: "SqliteOptions.statementCacheCapacity", field: "statementCacheCapacity", reason: "field 'statementCacheCapacity' does not match number?" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "journalMode");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || SqliteJournalMode.is(__velarExplainField.value)))) {
      return { path: "SqliteOptions.journalMode", field: "journalMode", reason: "field 'journalMode' does not match SqliteJournalMode?" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "readOnly");
    if (__velarExplainField !== void 0 && !(__velarExplainField.enumerable && "value" in __velarExplainField && (__velarExplainField.value == null || typeof __velarExplainField.value === "boolean"))) {
      return { path: "SqliteOptions.readOnly", field: "readOnly", reason: "field 'readOnly' does not match bool?" };
    }
  }
  return { path: "SqliteOptions", field: null, reason: null };
}
function __velarTypeCheck_SqliteOptions(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "busyTimeoutMilliseconds");
  const __velarField1 = __velarValidationOwnDescriptor(value, "queueCapacity");
  const __velarField2 = __velarValidationOwnDescriptor(value, "maxRows");
  const __velarField3 = __velarValidationOwnDescriptor(value, "maxResultBytes");
  const __velarField4 = __velarValidationOwnDescriptor(value, "statementCacheCapacity");
  const __velarField5 = __velarValidationOwnDescriptor(value, "journalMode");
  const __velarField6 = __velarValidationOwnDescriptor(value, "readOnly");
  return !!((__velarField0 === void 0 || __velarField0?.enumerable && "value" in __velarField0 && (__velarField0.value == null || typeof __velarField0.value === "number")) && (__velarField1 === void 0 || __velarField1?.enumerable && "value" in __velarField1 && (__velarField1.value == null || typeof __velarField1.value === "number")) && (__velarField2 === void 0 || __velarField2?.enumerable && "value" in __velarField2 && (__velarField2.value == null || typeof __velarField2.value === "number")) && (__velarField3 === void 0 || __velarField3?.enumerable && "value" in __velarField3 && (__velarField3.value == null || typeof __velarField3.value === "number")) && (__velarField4 === void 0 || __velarField4?.enumerable && "value" in __velarField4 && (__velarField4.value == null || typeof __velarField4.value === "number")) && (__velarField5 === void 0 || __velarField5?.enumerable && "value" in __velarField5 && (__velarField5.value == null || SqliteJournalMode.is(__velarField5.value))) && (__velarField6 === void 0 || __velarField6?.enumerable && "value" in __velarField6 && (__velarField6.value == null || typeof __velarField6.value === "boolean")));
}
function __velarTypeCopy_SqliteOptions(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "busyTimeoutMilliseconds");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "busyTimeoutMilliseconds", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "queueCapacity");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "queueCapacity", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "maxRows");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "maxRows", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "maxResultBytes");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "maxResultBytes", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "statementCacheCapacity");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "statementCacheCapacity", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "journalMode");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "journalMode", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "readOnly");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "readOnly", __velarCopyField.value);
  }
  return __velarCopy;
}
var SqliteOptions = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqliteOptions(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqliteOptions(value)) {
      const __velarDetail = __velarTypeExplain_SqliteOptions(value);
      throw new __VelarValidationError("Value does not match SqliteOptions" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_SqliteOptions(value, __velarValidationState(), __velarTypeCopy_SqliteOptions);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_SqliteOptions) {
    return __velarTypeCopy_SqliteOptions(value, __state, __velarCopyPlan);
  }
}));
var SqliteError = class extends Error {
  constructor(message, sqliteCode = null, operation = "unknown", retryable = false) {
    super(message);
    this.name = "SqliteError";
    const self = this;
    self.sqliteCode = sqliteCode ?? null;
    self.operation = operation;
    self.retryable = retryable;
  }
};
var SqliteBackpressureError = class extends SqliteError {
  constructor(message = "SQLite queue is full") {
    super(message, "SQLITE_BACKPRESSURE", "queue", true);
    this.name = "SqliteBackpressureError";
    const self = this;
  }
};
var SqliteConcurrencyError = class extends SqliteError {
  constructor(message = "SQLite connection cannot be used from its transaction callback") {
    super(message, "SQLITE_CONCURRENCY", "transaction", true);
    this.name = "SqliteConcurrencyError";
    const self = this;
  }
};
function sqliteFailure(error) {
  if (error instanceof NativeSqliteBackpressureError) {
    return new SqliteBackpressureError(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteBackpressureError), "NativeSqliteBackpressureError", "error", 24251))(error).message);
  }
  if (error instanceof NativeSqliteConcurrencyError) {
    return new SqliteConcurrencyError(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteConcurrencyError), "NativeSqliteConcurrencyError", "error", 24342))(error).message);
  }
  if (error instanceof NativeSqliteError) {
    return new SqliteError(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 24411))(error).message, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 24426))(error).sqliteCode ?? null, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 24444))(error).operation, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 24461))(error).retryable);
  }
  return new SqliteError(error.message);
}
function sqliteLiteral(value) {
  if ((value ?? null) === null) {
    return trustedSql("NULL");
  }
  if (typeof (value ?? null) === "boolean") {
    return trustedSql(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "boolean", "bool", "value", 24887))(value) ? "1" : "0");
  }
  if (typeof (value ?? null) === "string") {
    return trustedSql("'" + __velarStringReplaceAll(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "value", 24954))(value), "'", "''") + "'");
  }
  if (typeof (value ?? null) === "number") {
    if (!__velarNumberIsFinite(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "value", 25028))(value))) {
      throw new __VelarAssertionError("SQLite numeric literals must be finite");
    }
    if (!(!__velarNumberIsInteger(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "value", 25110))(value)) || ((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "value", 25132))(value) >= -9007199254740991 && ((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "value", 25163))(value) <= 9007199254740991)) {
      throw new __VelarAssertionError("SQLite integer literals must be safe integers");
    }
    return trustedSql(String(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "value", 25273))(value)));
  }
  throw new Error("SQLite literals support only null, bool, string, and finite number");
}
function sqliteIdentifier(value) {
  if (!(!__velarStringIsBlank(value) && __velarStringSize(value) <= 255 && !__velarStringHas(value, fromCodePoint(0)))) {
    throw new __VelarAssertionError("SQLite identifiers must be non-blank text with no NUL and no longer than 255 characters");
  }
  return trustedSql('"' + __velarStringReplaceAll(value, '"', '""') + '"');
}
var SqliteTransaction = class {
  #native;
  constructor(native) {
    this.#native = native;
    const self = this;
  }
  async execute(statement) {
    const self = this;
    const data = statement.data();
    try {
      return await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").execute(data.fragments, data.parameters));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 26194))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  executor() {
    const self = this;
    async function executeStatement(statement) {
      return await __velarNormalizePromiseValue(self.execute(statement));
    }
    async function oneRow(statement) {
      const data = statement.data();
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(data.fragments, data.parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 26767))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    async function allRows(statement) {
      const data = statement.data();
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(data.fragments, data.parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 27111))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    return { execute: executeStatement, one: oneRow, all: allRows };
  }
  async one(statement, RowType) {
    const self = this;
    const data = statement.data();
    try {
      const row = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(data.fragments, data.parameters));
      if ((row ?? null) === null) {
        return null;
      }
      return __velarAsyncResolvedValue(RowType.parse(row ?? null));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 27607))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  async all(statement, RowType) {
    const self = this;
    const data = statement.data();
    try {
      const rows = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(data.fragments, data.parameters));
      return __velarAsyncResolvedValue(__velarListMap(rows, (row) => RowType.parse(row ?? null)));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 28011))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
};
var SqliteConnection = class {
  #native;
  constructor(native) {
    this.#native = native;
    const self = this;
  }
  async execute(statement) {
    const self = this;
    const data = statement.data();
    try {
      return await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").execute(data.fragments, data.parameters));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 28428))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  executor() {
    const self = this;
    async function executeStatement(statement) {
      return await __velarNormalizePromiseValue(self.execute(statement));
    }
    async function oneRow(statement) {
      const data = statement.data();
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(data.fragments, data.parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 29e3))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    async function allRows(statement) {
      const data = statement.data();
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(data.fragments, data.parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 29344))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    return { execute: executeStatement, one: oneRow, all: allRows };
  }
  async one(statement, RowType) {
    const self = this;
    const data = statement.data();
    try {
      const row = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(data.fragments, data.parameters));
      if ((row ?? null) === null) {
        return null;
      }
      return __velarAsyncResolvedValue(RowType.parse(row ?? null));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 29840))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  async all(statement, RowType) {
    const self = this;
    const data = statement.data();
    try {
      const rows = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(data.fragments, data.parameters));
      return __velarAsyncResolvedValue(__velarListMap(rows, (row) => RowType.parse(row ?? null)));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 30244))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  async transaction(operation) {
    const self = this;
    const results = __velarAdoptList([]);
    async function run(native) {
      __velarListAppend(results, await __velarNormalizePromiseValue(operation(new SqliteTransaction(native))));
      return null;
    }
    try {
      await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").transaction(run));
      if (!(__velarListSize(results) === 1)) {
        throw new __VelarAssertionError("SQLite transaction did not return exactly one result");
      }
      return __velarAsyncResolvedValue(__velarListIndexGet(results, 0));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 30803))(error));
      }
      throw error;
    }
  }
  async close() {
    const self = this;
    try {
      await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").close());
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 30981))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
    return null;
  }
  async ["__velar:dispose"]() {
    const self = this;
    await __velarNormalizePromiseValue(self.close());
    return null;
  }
};
async function openSqlite(path, options = {}) {
  try {
    return __velarAsyncResolvedValue(new SqliteConnection(await __velarNormalizePromiseValue(openNativeSqlite(__velarHostRaw(path), __velarHostRaw(options)))));
  } catch (error) {
    error = __velarNormalizeError(error);
    if (error instanceof NativeSqliteError) {
      throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 31308))(error));
    }
    throw new SqliteError(__velarReadInstanceField(error, "message"));
  }
}
export {
  SqliteBackpressureError,
  SqliteConcurrencyError,
  SqliteConnection,
  SqliteError,
  SqliteJournalMode,
  SqliteOptions,
  SqliteTransaction,
  openSqlite,
  sqliteIdentifier,
  sqliteLiteral
};
