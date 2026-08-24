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
function __velarTextArgument(value, name) {
  if (typeof value !== "string") throw new __velarTextNativeTypeError(name + " must be a string");
  if (value.length > __velarMaxTextCodeUnits) throw new __velarTextNativeRangeError(name + " cannot exceed 16 MiB");
  return value;
}
var __velarTextMeasureCacheUnits = 8 * 1024 * 1024;
var __velarTextMeasureCache = typeof __velarTextNativeMap === "function" && typeof __velarTextMapGet === "function" && typeof __velarTextMapSet === "function" && typeof __velarTextMapClear === "function" ? new __velarTextNativeMap() : null;
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
function valueOf(value) {
  return __velarTextArgument(value, "velar/text value");
}
function utf8Size(value) {
  return __velarUtf8ByteLength(valueOf(value));
}

// velar-standard:velar/compiler-runtime-reactive-v1
function __velarHostRaw(value) {
  return value;
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
function __velarTextCall(operation, receiver, arguments_) {
  if (typeof operation !== "function" || typeof __velarTextReflectApply2 !== "function") throw new __velarTextNativeTypeError2("The JavaScript text runtime is unavailable");
  return __velarTextReflectApply2(operation, receiver, arguments_);
}
function __velarTextValue(value) {
  if (typeof value !== "string") throw new __velarTextNativeTypeError2("String methods require a string receiver");
  if (value.length > __velarMaxTextCodeUnits2) throw new __velarTextNativeRangeError2("Strings cannot exceed 16 MiB");
  return value;
}
var __velarTextMeasureCacheUnits2 = 8 * 1024 * 1024;
var __velarTextMeasureCache2 = typeof __velarTextNativeMap2 === "function" && typeof __velarTextMapGet2 === "function" && typeof __velarTextMapSet2 === "function" && typeof __velarTextMapClear2 === "function" ? new __velarTextNativeMap2() : null;
function __velarStringIsBlank(value) {
  return __velarTextCall(__velarNativeStringTrim2, __velarTextValue(value), []) === "";
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

// src/src/index.vel
import { parse } from "yaml";
import * as __velarExternModule188 from "yaml";
function __velarExternExport(namespace, name, source) {
  const value = namespace[name];
  if (value === void 0 && !(name in namespace)) {
    throw new TypeError(name === "default" ? `Extern module '${source}' declares 'default', but the JavaScript module has no default export; declare the module's real named exports instead` : `Extern module '${source}' declares '${name}', but the JavaScript module has no such export; prototype methods and instance members belong on a declared class or singleton const, not module exports`);
  }
  return value;
}
__velarExternExport(__velarExternModule188, "parse", "yaml");
function parseYaml(source, maxBytes = 1048576, maxAliases = 100) {
  if (!(__velarNumberIsInteger(maxBytes) && maxBytes >= 1 && maxBytes <= 64 * 1024 * 1024)) {
    throw new __VelarAssertionError("YAML maxBytes must be an integer from 1 through 67108864");
  }
  if (!(__velarNumberIsInteger(maxAliases) && maxAliases >= 0 && maxAliases <= 1e3)) {
    throw new __VelarAssertionError("YAML maxAliases must be an integer from 0 through 1000");
  }
  if (!!__velarStringIsBlank(source)) {
    throw new __VelarAssertionError("YAML source cannot be blank");
  }
  if (!(utf8Size(source) <= maxBytes)) {
    throw new __VelarAssertionError("YAML source exceeds maxBytes");
  }
  return parse(__velarHostRaw(source), __velarHostRaw({ strict: true, uniqueKeys: true, maxAliasCount: maxAliases })) ?? null;
}
export {
  parseYaml
};
