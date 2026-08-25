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
function fromCodePoint(value) {
  if (!__velarTextCall(__velarTextNumberIsSafeInteger, __velarTextNativeNumber, [value]) || value < 0 || value > 1114111) {
    throw new __velarTextNativeRangeError("fromCodePoint requires a code point from 0 through 1114111");
  }
  if (value >= 55296 && value <= 57343) throw new __velarTextNativeRangeError("fromCodePoint refuses surrogate halves; they are not characters on their own");
  return __velarTextCall(__velarTextStringFromCodePoint, __velarTextNativeString, [value]);
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

// velar-standard:velar/compiler-runtime-class-fields-v1
var __velarClassNativeObject = globalThis.Object;
var __velarClassNativeReflect = globalThis.Reflect;
var __velarClassNativeTypeError = globalThis.TypeError;
var __velarClassGetOwnPropertyDescriptor = __velarClassNativeObject.getOwnPropertyDescriptor;
var __velarClassReflectApply = __velarClassGetOwnPropertyDescriptor(__velarClassNativeReflect, "apply")?.value;
var __velarClassReflectGet = __velarClassGetOwnPropertyDescriptor(__velarClassNativeReflect, "get")?.value;
var __velarClassGetPrototypeOf = __velarClassGetOwnPropertyDescriptor(__velarClassNativeObject, "getPrototypeOf")?.value;
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
var __velarCollectionOwnNames = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertyNames")?.value;
var __velarCollectionOwnSymbols = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeObject, "getOwnPropertySymbols")?.value;
var __velarCollectionOwnKeys = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionNativeReflect, "ownKeys")?.value;
var __velarCollectionMapEntries = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapPrototype, "entries")?.value;
var __velarCollectionSetValues = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetPrototype, "values")?.value;
var __velarCollectionMapIteratorPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarCollectionHostCall(__velarCollectionMapEntries, new __velarCollectionNativeMap(), [])]);
var __velarCollectionSetIteratorPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarCollectionHostCall(__velarCollectionSetValues, new __velarCollectionNativeSet(), [])]);
var __velarCollectionMapIteratorNext = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionMapIteratorPrototype, "next")?.value;
var __velarCollectionSetIteratorNext = __velarCollectionGetOwnPropertyDescriptor(__velarCollectionSetIteratorPrototype, "next")?.value;
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
function __velarValidationIsInstance(value, constructor) {
  return __velarCollectionHostCall(__velarValidationFunctionHasInstanceOperation, constructor, [value]);
}
function __velarValidationFreeze(value) {
  return __velarCollectionHostCall(__velarValidationFreezeOperation, __velarCollectionNativeObject, [value]);
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
function __velarIsSet(value) {
  return __velarCollectionBrand(value) === 2;
}
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
function __velarCollectionSetMapSetSize(value) {
  return __velarCollectionHostCall2(__velarCollectionSetSize2, value, []);
}
function __velarCollectionSetMapSetAdd(value, item) {
  return __velarCollectionHostCall2(__velarCollectionSetAddOperation, value, [item]);
}
function __velarCollectionSetMapSetHas(value, item) {
  return __velarCollectionHostCall2(__velarCollectionSetHasOperation, value, [item]);
}
function __velarCollectionSetMapSetValues(value) {
  return __velarCollectionHostCall2(__velarCollectionSetValuesOperation, value, []);
}
function __velarCollectionSetMapSetNext(iterator) {
  return __velarCollectionHostCall2(__velarCollectionSetMapSetIteratorNext, iterator, []);
}
var __velarCollectionRecordNativeRangeError = globalThis.RangeError;
var __velarCollectionRecordOwnNamesOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertyNames")?.value;
var __velarCollectionRecordOwnSymbolsOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "getOwnPropertySymbols")?.value;
var __velarCollectionRecordDefinePropertyOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "defineProperty")?.value;
var __velarCollectionRecordObjectIsOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "is")?.value;
var __velarCollectionRecordDeletePropertyOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeReflect2, "deleteProperty")?.value;
var __velarCollectionRecordFreezeOperation = __velarCollectionGetOwnPropertyDescriptor2(__velarCollectionNativeObject2, "freeze")?.value;

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
var __velarListRegExpPrototype = __velarCollectionHostCall2(__velarCollectionGetPrototypeOf2, __velarCollectionNativeObject2, [__velarListSurrogatePattern]);
var __velarListSurrogateExecOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListRegExpPrototype, "exec")?.value;
function __velarCheckedSetSize(value, name) {
  try {
    return __velarCollectionSetMapSetSize(value);
  } catch {
    throw new __velarCollectionNativeTypeError2(name + " requires a Set");
  }
}
function __velarListSize(value) {
  value = __velarValidateOwnedList(value, "List size");
  __velarReactiveCollectionTrack(value, __velarReactiveStructureKey);
  return value.length;
}
function __velarCreateSet(value) {
  const output = new __velarCollectionNativeSet2();
  if (value === void 0) return output;
  value = __velarReactiveRaw(value);
  if (__velarCollectionListIsArray(value)) {
    const values = __velarValidateOwnedList(value, "Set construction");
    const owned = __velarListIsOwned(values);
    for (let index = 0; index < values.length; index += 1) __velarCollectionSetMapSetAdd(output, __velarCollectionValue(__velarReactiveRaw(__velarListElement(values, index, "Set construction", owned))));
    return output;
  }
  if (!__velarIsSet(value)) throw new __velarCollectionNativeTypeError2("Set construction requires a List or Set");
  if (__velarCollectionSetMapSetSize(value) > __velarMaxCollectionItems) throw new __velarCollectionSetMapNativeRangeError("A Set cannot exceed 1000000 items");
  const iterator = __velarCollectionSetMapSetValues(value);
  while (true) {
    const step = __velarCollectionSetMapSetNext(iterator);
    if (step.done) return output;
    __velarCollectionSetMapSetAdd(output, __velarCollectionValue(__velarReactiveRaw(step.value)));
  }
}
var __VelarIndexError = class extends __velarCollectionListNativeRangeError {
  constructor(message) {
    super(message);
    this.name = "IndexError";
  }
};
__velarCollectionListDefineProperty(__VelarIndexError, "name", { value: "IndexError", writable: false, enumerable: false, configurable: true });
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
function __velarSetAdd(value, item) {
  value = __velarReactiveRaw(value);
  item = __velarReactiveRaw(item);
  const size = __velarCollectionSetMapSetSize(value);
  if (size >= __velarMaxCollectionItems && !__velarCollectionSetMapSetHas(value, item)) throw new __velarCollectionSetMapNativeRangeError("A Set cannot exceed 1000000 items");
  if (__velarCollectionSetMapSetHas(value, item)) return null;
  __velarCollectionSetMapSetAdd(value, item);
  __velarReactiveCollectionLink(value, item);
  __velarReactiveCollectionTrigger(value, item, true, true);
  return null;
}
function __velarSetHas(value, item) {
  value = __velarReactiveRaw(value);
  item = __velarReactiveRaw(item);
  const size = __velarCheckedSetSize(value, "Set.has");
  if (size > __velarMaxCollectionItems) throw new __velarCollectionSetMapNativeRangeError("A Set cannot exceed 1000000 items");
  __velarReactiveCollectionTrack(value, item);
  return __velarCollectionSetMapSetHas(value, item);
}
function __velarSetContains(item, value) {
  return __velarSetHas(value, item);
}

// src/src/index.vel
import { DatabaseCommand, DatabaseParameterStyle, DatabaseQuery, DatabaseStatement, command, query, sqlConcat, sqlJoin, sqlParameter, sqlRows, trustedSql } from "@velarscript-labs/database";
function checkedIdentifier(value, label) {
  if (!!__velarStringIsBlank(value)) {
    throw new __VelarAssertionError(`${label} must not be blank`);
  }
  if (!(__velarStringSize(value) <= 255)) {
    throw new __VelarAssertionError(`${label} must be no longer than 255 characters`);
  }
  if (!!__velarStringHas(value, fromCodePoint(0))) {
    throw new __VelarAssertionError(`${label} must not contain NUL`);
  }
  return value;
}
function quotedIdentifier(value, label = "SQL identifier") {
  const identifier = checkedIdentifier(value, label);
  return trustedSql('"' + __velarStringReplaceAll(identifier, '"', '""') + '"');
}
function quotedPath(parts, label) {
  if (!(__velarListSize(parts) > 0)) {
    throw new __VelarAssertionError(`${label} must contain at least one identifier`);
  }
  return sqlJoin(__velarListMap(parts, (part) => quotedIdentifier(part, label)), trustedSql("."));
}
function checkedOptionalIdentifier(value, label) {
  if ((value ?? null) === null) {
    return null;
  }
  return checkedIdentifier(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "value", 1094))(value), label);
}
var ComposedSqlTable = class {
  #name;
  #schema;
  #alias;
  constructor(name, schema, alias) {
    this.#name = name;
    this.#schema = schema;
    this.#alias = alias;
    const self = this;
    checkedIdentifier(name, "SQL table name");
    checkedOptionalIdentifier(schema ?? null, "SQL schema name") ?? null;
    checkedOptionalIdentifier(alias ?? null, "SQL table alias") ?? null;
  }
  reference() {
    const self = this;
    const parts = __velarReadPrivateField(self.#schema, "schema") === null ? [__velarReadPrivateField(self.#name, "name")] : [((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", ".schema", 1512))(__velarReadPrivateField(self.#schema, "schema")), __velarReadPrivateField(self.#name, "name")];
    const name = quotedPath(parts, "SQL table name");
    if (__velarReadPrivateField(self.#alias, "alias") === null) {
      return name;
    }
    return sqlConcat([name, trustedSql(" AS "), quotedIdentifier(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", ".alias", 1705))(__velarReadPrivateField(self.#alias, "alias")), "SQL table alias")]);
  }
  writeTarget() {
    const self = this;
    if (!(__velarReadPrivateField(self.#alias, "alias") === null)) {
      throw new __VelarAssertionError("SQL write targets must not use a table alias");
    }
    const parts = __velarReadPrivateField(self.#schema, "schema") === null ? [__velarReadPrivateField(self.#name, "name")] : [((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", ".schema", 1928))(__velarReadPrivateField(self.#schema, "schema")), __velarReadPrivateField(self.#name, "name")];
    return quotedPath(parts, "SQL table name");
  }
};
function __velarTypeCheck_SqlTable(value) {
  return __velarValidationIsInstance(value, ComposedSqlTable);
}
var SqlTable = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlTable(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlTable(value)) {
      throw new __VelarValidationError("Value does not match SqlTable", { path: "SqlTable" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function sqlTable(name, schema = null, alias = null) {
  return new ComposedSqlTable(name, schema ?? null, alias ?? null);
}
var ComposedSqlExpression = class {
  #value;
  constructor(value) {
    this.#value = value;
    const self = this;
    value.render(DatabaseParameterStyle.questionMark);
  }
  statement() {
    const self = this;
    return __velarReadPrivateField(self.#value, "value");
  }
};
function __velarTypeCheck_SqlExpression(value) {
  return __velarValidationIsInstance(value, ComposedSqlExpression);
}
var SqlExpression = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlExpression(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlExpression(value)) {
      throw new __VelarValidationError("Value does not match SqlExpression", { path: "SqlExpression" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function sqlColumn(name, qualifier = null) {
  const column = quotedIdentifier(name, "SQL column name");
  if ((qualifier ?? null) === null) {
    return new ComposedSqlExpression(column);
  }
  return new ComposedSqlExpression(sqlConcat([quotedIdentifier(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", "qualifier", 2938))(qualifier), "SQL column qualifier"), trustedSql("."), column]));
}
function sqlValue(value) {
  return new ComposedSqlExpression(sqlParameter(value ?? null));
}
var ComposedSqlField = class {
  #expression;
  #qualifier;
  #alias;
  constructor(expression, qualifier, alias) {
    this.#expression = expression;
    this.#qualifier = qualifier;
    this.#alias = alias;
    const self = this;
    checkedOptionalIdentifier(qualifier ?? null, "SQL field qualifier") ?? null;
    checkedOptionalIdentifier(alias ?? null, "SQL field alias") ?? null;
    if (!((expression ?? null) !== null || (alias ?? null) === null)) {
      throw new __VelarAssertionError("SQL wildcard fields cannot have aliases");
    }
  }
  statement() {
    const self = this;
    let value = trustedSql("*");
    if (__velarReadPrivateField(self.#expression, "expression") === null) {
      if (__velarReadPrivateField(self.#qualifier, "qualifier") !== null) {
        value = sqlConcat([quotedIdentifier(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", ".qualifier", 3759))(__velarReadPrivateField(self.#qualifier, "qualifier")), "SQL field qualifier"), trustedSql(".*")]);
      }
    } else {
      value = ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, ComposedSqlExpression), "ComposedSqlExpression", ".expression", 3840))(__velarReadPrivateField(self.#expression, "expression")).statement();
    }
    if (__velarReadPrivateField(self.#alias, "alias") === null) {
      return value;
    }
    return sqlConcat([value, trustedSql(" AS "), quotedIdentifier(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "string", "string", ".alias", 3982))(__velarReadPrivateField(self.#alias, "alias")), "SQL field alias")]);
  }
};
function __velarTypeCheck_SqlField(value) {
  return __velarValidationIsInstance(value, ComposedSqlField);
}
var SqlField = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlField(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlField(value)) {
      throw new __VelarValidationError("Value does not match SqlField", { path: "SqlField" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function sqlField(expression, alias = null) {
  return new ComposedSqlField(expression, null, alias ?? null);
}
function sqlNamedField(name, alias = null, qualifier = null) {
  return sqlField(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1]])([sqlColumn(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1]])([name, qualifier ?? null])), alias ?? null]));
}
function sqlAllFields(qualifier = null) {
  return new ComposedSqlField(null, qualifier ?? null, null);
}
var ComposedSqlPredicate = class {
  #value;
  constructor(value) {
    this.#value = value;
    const self = this;
    value.render(DatabaseParameterStyle.questionMark);
  }
  statement() {
    const self = this;
    return __velarReadPrivateField(self.#value, "value");
  }
};
function __velarTypeCheck_SqlPredicate(value) {
  return __velarValidationIsInstance(value, ComposedSqlPredicate);
}
var SqlPredicate = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlPredicate(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlPredicate(value)) {
      throw new __VelarValidationError("Value does not match SqlPredicate", { path: "SqlPredicate" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function binaryPredicate(left, operator, right) {
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), left.statement(), trustedSql(" " + operator + " "), right.statement(), trustedSql(")")]));
}
function sqlEqual(left, right) {
  return binaryPredicate(left, "=", right);
}
function sqlNotEqual(left, right) {
  return binaryPredicate(left, "<>", right);
}
function sqlLessThan(left, right) {
  return binaryPredicate(left, "<", right);
}
function sqlLessThanOrEqual(left, right) {
  return binaryPredicate(left, "<=", right);
}
function sqlGreaterThan(left, right) {
  return binaryPredicate(left, ">", right);
}
function sqlGreaterThanOrEqual(left, right) {
  return binaryPredicate(left, ">=", right);
}
function sqlLike(left, pattern) {
  return binaryPredicate(left, "LIKE", sqlValue(pattern ?? null));
}
function sqlColumnEqual(name, value, qualifier = null) {
  return sqlEqual(sqlColumn(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1]])([name, qualifier ?? null])), sqlValue(value ?? null));
}
function sqlColumnNotEqual(name, value, qualifier = null) {
  return sqlNotEqual(sqlColumn(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1]])([name, qualifier ?? null])), sqlValue(value ?? null));
}
function sqlIsNull(expression) {
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), expression.statement(), trustedSql(" IS NULL)")]));
}
function sqlIsNotNull(expression) {
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), expression.statement(), trustedSql(" IS NOT NULL)")]));
}
function sqlBetween(expression, minimum, maximum) {
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), expression.statement(), trustedSql(" BETWEEN "), sqlParameter(minimum ?? null), trustedSql(" AND "), sqlParameter(maximum ?? null), trustedSql(")")]));
}
function sqlAllRows() {
  return new ComposedSqlPredicate(trustedSql("(1 = 1)"));
}
function sqlNoRows() {
  return new ComposedSqlPredicate(trustedSql("(1 = 0)"));
}
function sqlNot(predicate) {
  return new ComposedSqlPredicate(sqlConcat([trustedSql("(NOT "), predicate.statement(), trustedSql(")")]));
}
function joinedPredicates(predicates, separator, empty) {
  if (__velarListSize(predicates) === 0) {
    return empty;
  }
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), sqlJoin(__velarListMap(predicates, (predicate) => predicate.statement()), trustedSql(separator)), trustedSql(")")]));
}
function sqlAnd(predicates) {
  return joinedPredicates(predicates, " AND ", sqlAllRows());
}
function sqlOr(predicates) {
  return joinedPredicates(predicates, " OR ", sqlNoRows());
}
function sqlInValues(expression, values) {
  if (__velarListSize(values) === 0) {
    return sqlNoRows();
  }
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), expression.statement(), trustedSql(" IN ("), sqlJoin(__velarListMap(values, (value) => sqlParameter(value ?? null)), trustedSql(", ")), trustedSql("))")]));
}
function sqlTupleIn(expressions, rows) {
  if (!(__velarListSize(expressions) > 0)) {
    throw new __VelarAssertionError("SQL tuple predicates require at least one expression");
  }
  if (__velarListSize(rows) === 0) {
    return sqlNoRows();
  }
  for (const row of __velarReactiveListIterator(rows)) {
    if (!__velarSameValueZero(__velarListSize(row), __velarListSize(expressions))) {
      throw new __VelarAssertionError("SQL tuple predicate rows must match the expression width");
    }
  }
  return new ComposedSqlPredicate(sqlConcat([trustedSql("("), sqlJoin(__velarListMap(expressions, (expression) => expression.statement()), trustedSql(", ")), trustedSql(") IN ("), sqlRows(rows), trustedSql(")")]));
}
var ComposedSqlOrder = class {
  #expression;
  #descending;
  constructor(expression, descending) {
    this.#expression = expression;
    this.#descending = descending;
    const self = this;
  }
  statement() {
    const self = this;
    return sqlConcat([__velarReadPrivateField(self.#expression, "expression").statement(), trustedSql(__velarReadPrivateField(self.#descending, "descending") ? " DESC" : " ASC")]);
  }
};
function __velarTypeCheck_SqlOrder(value) {
  return __velarValidationIsInstance(value, ComposedSqlOrder);
}
var SqlOrder = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlOrder(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlOrder(value)) {
      throw new __VelarValidationError("Value does not match SqlOrder", { path: "SqlOrder" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function sqlAscending(expression) {
  return new ComposedSqlOrder(expression, false);
}
function sqlDescending(expression) {
  return new ComposedSqlOrder(expression, true);
}
var ComposedSqlJoin = class {
  #kind;
  #table;
  #predicate;
  constructor(kind, table, predicate) {
    this.#kind = kind;
    this.#table = table;
    this.#predicate = predicate;
    const self = this;
  }
  statement() {
    const self = this;
    const base = sqlConcat([trustedSql(" " + __velarReadPrivateField(self.#kind, "kind") + " "), __velarReadPrivateField(self.#table, "table").reference()]);
    if (__velarReadPrivateField(self.#predicate, "predicate") === null) {
      return base;
    }
    return sqlConcat([base, trustedSql(" ON "), ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, ComposedSqlPredicate), "ComposedSqlPredicate", ".predicate", 10505))(__velarReadPrivateField(self.#predicate, "predicate")).statement()]);
  }
};
function __velarTypeCheck_SqlJoin(value) {
  return __velarValidationIsInstance(value, ComposedSqlJoin);
}
var SqlJoin = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlJoin(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlJoin(value)) {
      throw new __VelarValidationError("Value does not match SqlJoin", { path: "SqlJoin" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function sqlInnerJoin(table, predicate) {
  return new ComposedSqlJoin("INNER JOIN", table, predicate);
}
function sqlLeftJoin(table, predicate) {
  return new ComposedSqlJoin("LEFT JOIN", table, predicate);
}
function sqlCrossJoin(table) {
  return new ComposedSqlJoin("CROSS JOIN", table, null);
}
function checkedLimit(value, label, minimum) {
  if (!(__velarNumberIsInteger(value) && value >= minimum && value <= 1e6)) {
    throw new __VelarAssertionError(`${label} must be an integer from ${minimum} through 1000000`);
  }
  return value;
}
function selectStatement(table, fields, joins = __velarAdoptList([]), where = null, orderBy = __velarAdoptList([]), limit = null, offset = null, distinct = false) {
  if (!(__velarListSize(fields) > 0)) {
    throw new __VelarAssertionError("SQL SELECT requires at least one field");
  }
  if (!((offset ?? null) === null || (limit ?? null) !== null)) {
    throw new __VelarAssertionError("SQL SELECT offset requires a limit for portable behavior");
  }
  const parts = [trustedSql(distinct ? "SELECT DISTINCT " : "SELECT "), sqlJoin(__velarListMap(fields, (field) => field.statement()), trustedSql(", ")), trustedSql(" FROM "), table.reference()];
  for (const join of __velarReactiveListIterator(joins)) {
    __velarListAppend(parts, join.statement());
  }
  if ((where ?? null) !== null) {
    __velarListAppend(parts, trustedSql(" WHERE "));
    __velarListAppend(parts, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, ComposedSqlPredicate), "ComposedSqlPredicate", "where", 12137))(where).statement());
  }
  if (__velarListSize(orderBy) > 0) {
    __velarListAppend(parts, trustedSql(" ORDER BY "));
    __velarListAppend(parts, sqlJoin(__velarListMap(orderBy, (order) => order.statement()), trustedSql(", ")));
  }
  if ((limit ?? null) !== null) {
    __velarListAppend(parts, trustedSql(" LIMIT "));
    __velarListAppend(parts, sqlParameter(checkedLimit(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "limit", 12430))(limit), "SQL SELECT limit", 1)));
  }
  if ((offset ?? null) !== null) {
    __velarListAppend(parts, trustedSql(" OFFSET "));
    __velarListAppend(parts, sqlParameter(checkedLimit(((__velarValue) => __velarNarrow(__velarValue, typeof __velarValue === "number", "number", "offset", 12577))(offset), "SQL SELECT offset", 0)));
  }
  return sqlConcat(parts);
}
function selectQuery(table, fields, RowType, joins = __velarAdoptList([]), where = null, orderBy = __velarAdoptList([]), limit = null, offset = null, distinct = false, maximumRows = 1e4) {
  return query(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1], __velarNamedArguments[2]])([selectStatement(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1], __velarNamedArguments[2], __velarNamedArguments[3], __velarNamedArguments[4], __velarNamedArguments[5], __velarNamedArguments[6], __velarNamedArguments[7]])([table, fields, joins, where ?? null, orderBy, limit ?? null, offset ?? null, distinct])), RowType, maximumRows]));
}
function checkedColumns(columns) {
  if (!(__velarListSize(columns) > 0)) {
    throw new __VelarAssertionError("SQL write operations require at least one column");
  }
  const seen = __velarCreateSet();
  const statements = __velarAdoptList([]);
  for (const column of __velarReactiveListIterator(columns)) {
    const checked = checkedIdentifier(column, "SQL write column name");
    if (!!__velarSetContains(checked, seen)) {
      throw new __VelarAssertionError(`SQL write column '${checked}' is duplicated`);
    }
    __velarSetAdd(seen, checked);
    __velarListAppend(statements, quotedIdentifier(checked, "SQL write column name"));
  }
  return statements;
}
function insertStatement(table, columns, rows) {
  const names = checkedColumns(columns);
  if (!(__velarListSize(rows) > 0)) {
    throw new __VelarAssertionError("SQL INSERT requires at least one row");
  }
  for (const row of __velarReactiveListIterator(rows)) {
    if (!__velarSameValueZero(__velarListSize(row), __velarListSize(names))) {
      throw new __VelarAssertionError("SQL INSERT rows must match the column count");
    }
  }
  return sqlConcat([trustedSql("INSERT INTO "), table.writeTarget(), trustedSql(" ("), sqlJoin(names, trustedSql(", ")), trustedSql(") VALUES "), sqlRows(rows)]);
}
function insertCommand(table, columns, rows, minimumAffected = 0, maximumAffected = 1e6) {
  return command(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1], __velarNamedArguments[2]])([insertStatement(table, columns, rows), minimumAffected, maximumAffected]));
}
var ComposedSqlAssignment = class {
  #column;
  #expression;
  constructor(column, expression) {
    this.#column = column;
    this.#expression = expression;
    const self = this;
    checkedIdentifier(column, "SQL assignment column name");
  }
  statement() {
    const self = this;
    return sqlConcat([quotedIdentifier(__velarReadPrivateField(self.#column, "column"), "SQL assignment column name"), trustedSql(" = "), __velarReadPrivateField(self.#expression, "expression").statement()]);
  }
};
function __velarTypeCheck_SqlAssignment(value) {
  return __velarValidationIsInstance(value, ComposedSqlAssignment);
}
var SqlAssignment = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_SqlAssignment(value);
  },
  parse(value) {
    if (!__velarTypeCheck_SqlAssignment(value)) {
      throw new __VelarValidationError("Value does not match SqlAssignment", { path: "SqlAssignment" });
    }
    return value;
  },
  copy(value) {
    return value;
  }
}));
function sqlAssign(column, expression) {
  return new ComposedSqlAssignment(column, expression);
}
function sqlSet(column, value) {
  return sqlAssign(column, sqlValue(value ?? null));
}
function updateStatement(table, assignments, where) {
  if (!(__velarListSize(assignments) > 0)) {
    throw new __VelarAssertionError("SQL UPDATE requires at least one assignment");
  }
  return sqlConcat([trustedSql("UPDATE "), table.writeTarget(), trustedSql(" SET "), sqlJoin(__velarListMap(assignments, (assignment) => assignment.statement()), trustedSql(", ")), trustedSql(" WHERE "), where.statement()]);
}
function updateCommand(table, assignments, where, minimumAffected = 0, maximumAffected = 1e6) {
  return command(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1], __velarNamedArguments[2]])([updateStatement(table, assignments, where), minimumAffected, maximumAffected]));
}
function deleteStatement(table, where) {
  return sqlConcat([trustedSql("DELETE FROM "), table.writeTarget(), trustedSql(" WHERE "), where.statement()]);
}
function deleteCommand(table, where, minimumAffected = 0, maximumAffected = 1e6) {
  return command(...((__velarNamedArguments) => [__velarNamedArguments[0], __velarNamedArguments[1], __velarNamedArguments[2]])([deleteStatement(table, where), minimumAffected, maximumAffected]));
}
export {
  SqlAssignment,
  SqlExpression,
  SqlField,
  SqlJoin,
  SqlOrder,
  SqlPredicate,
  SqlTable,
  deleteCommand,
  deleteStatement,
  insertCommand,
  insertStatement,
  selectQuery,
  selectStatement,
  sqlAllFields,
  sqlAllRows,
  sqlAnd,
  sqlAscending,
  sqlAssign,
  sqlBetween,
  sqlColumn,
  sqlColumnEqual,
  sqlColumnNotEqual,
  sqlCrossJoin,
  sqlDescending,
  sqlEqual,
  sqlField,
  sqlGreaterThan,
  sqlGreaterThanOrEqual,
  sqlInValues,
  sqlInnerJoin,
  sqlIsNotNull,
  sqlIsNull,
  sqlLeftJoin,
  sqlLessThan,
  sqlLessThanOrEqual,
  sqlLike,
  sqlNamedField,
  sqlNoRows,
  sqlNot,
  sqlNotEqual,
  sqlOr,
  sqlSet,
  sqlTable,
  sqlTupleIn,
  sqlValue,
  updateCommand,
  updateStatement
};
