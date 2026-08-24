// velar-standard:velar/compiler-runtime-primitives-v1
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
function __velarTextValue(value) {
  if (typeof value !== "string") throw new __velarTextNativeTypeError("String methods require a string receiver");
  if (value.length > __velarMaxTextCodeUnits) throw new __velarTextNativeRangeError("Strings cannot exceed 16 MiB");
  return value;
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
function __velarTextCodePointLength(value) {
  return __velarTextMeasure(value).length;
}
function __velarStringSize(value) {
  return __velarTextCodePointLength(__velarTextValue(value));
}
function __velarStringIsBlank(value) {
  return __velarTextCall(__velarNativeStringTrim, __velarTextValue(value), []) === "";
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
function __velarValidationWeakMapDelete(value, key) {
  return __velarCollectionHostCall(__velarValidationWeakMapDeleteOperation, value, [key]);
}
function __velarValidationMapGet(value, key) {
  return __velarCollectionHostCall(__velarValidationMapGetOperation, value, [key]);
}
function __velarValidationMapSet(value, key, item) {
  return __velarCollectionHostCall(__velarValidationMapSetOperation, value, [key, item]);
}
function __velarValidationSetHas(value, item) {
  return __velarCollectionHostCall(__velarValidationSetHasOperation, value, [item]);
}
function __velarValidationSetAdd(value, item) {
  return __velarCollectionHostCall(__velarValidationSetAddOperation, value, [item]);
}
function __velarValidationSetDelete(value, item) {
  return __velarCollectionHostCall(__velarValidationSetDeleteOperation, value, [item]);
}
function __velarValidationSetSize(value) {
  return __velarCollectionHostCall(__velarValidationSetSizeOperation, value, []);
}
function __velarValidationIsArray(value) {
  return __velarCollectionHostCall(__velarCollectionArrayIsArray, __velarCollectionNativeArray, [value]);
}
function __velarValidationOwnDescriptor(value, key) {
  return __velarCollectionHostCall(__velarCollectionGetOwnPropertyDescriptor, __velarCollectionNativeObject, [value, key]);
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

// velar-standard:velar/compiler-runtime-reactive-v1
var __velarReactiveStructureKey = null;
function __velarReactiveRaw(value) {
  return value;
}
function __velarReactiveCollectionRead(value, key, child) {
  return child === void 0 ? null : child;
}
function __velarReactiveCollectionTrack() {
}

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
function __velarListCopy(value) {
  __velarReactiveCollectionTrack(value);
  return __velarCopyList(value, "List.copy");
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
function __velarTypeExplain_DatabaseExecutor(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "DatabaseExecutor", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "execute");
    if (__velarExplainField === void 0) {
      return { path: "DatabaseExecutor.execute", field: "execute", reason: "field 'execute' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "function")) {
      return { path: "DatabaseExecutor.execute", field: "execute", reason: "field 'execute' does not match (text: string, parameters: List<unknown>) -> Promise<number>" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "one");
    if (__velarExplainField === void 0) {
      return { path: "DatabaseExecutor.one", field: "one", reason: "field 'one' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "function")) {
      return { path: "DatabaseExecutor.one", field: "one", reason: "field 'one' does not match (text: string, parameters: List<unknown>) -> Promise<unknown>" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "all");
    if (__velarExplainField === void 0) {
      return { path: "DatabaseExecutor.all", field: "all", reason: "field 'all' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "function")) {
      return { path: "DatabaseExecutor.all", field: "all", reason: "field 'all' does not match (text: string, parameters: List<unknown>) -> Promise<List<unknown>>" };
    }
  }
  return { path: "DatabaseExecutor", field: null, reason: null };
}
function __velarTypeCheck_DatabaseExecutor(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "execute");
  const __velarField1 = __velarValidationOwnDescriptor(value, "one");
  const __velarField2 = __velarValidationOwnDescriptor(value, "all");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "function" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "function" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "function");
}
function __velarTypeCopy_DatabaseExecutor(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "execute");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "execute", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "one");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "one", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "all");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "all", __velarCopyField.value);
  }
  return __velarCopy;
}
var DatabaseExecutor = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_DatabaseExecutor(value);
  },
  parse(value) {
    if (!__velarTypeCheck_DatabaseExecutor(value)) {
      const __velarDetail = __velarTypeExplain_DatabaseExecutor(value);
      throw new __VelarValidationError("Value does not match DatabaseExecutor" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_DatabaseExecutor(value, __velarValidationState(), __velarTypeCopy_DatabaseExecutor);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_DatabaseExecutor) {
    return __velarTypeCopy_DatabaseExecutor(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_DatabaseCommand(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: "DatabaseCommand", field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "text");
    if (__velarExplainField === void 0) {
      return { path: "DatabaseCommand.text", field: "text", reason: "field 'text' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "string")) {
      return { path: "DatabaseCommand.text", field: "text", reason: "field 'text' does not match string" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "minimumAffected");
    if (__velarExplainField === void 0) {
      return { path: "DatabaseCommand.minimumAffected", field: "minimumAffected", reason: "field 'minimumAffected' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "DatabaseCommand.minimumAffected", field: "minimumAffected", reason: "field 'minimumAffected' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "maximumAffected");
    if (__velarExplainField === void 0) {
      return { path: "DatabaseCommand.maximumAffected", field: "maximumAffected", reason: "field 'maximumAffected' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: "DatabaseCommand.maximumAffected", field: "maximumAffected", reason: "field 'maximumAffected' does not match number" };
    }
  }
  return { path: "DatabaseCommand", field: null, reason: null };
}
function __velarTypeCheck_DatabaseCommand(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "text");
  const __velarField1 = __velarValidationOwnDescriptor(value, "minimumAffected");
  const __velarField2 = __velarValidationOwnDescriptor(value, "maximumAffected");
  return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "string" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "number");
}
function __velarTypeCopy_DatabaseCommand(value, __state, __velarCopyPlan) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "text");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "text", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "minimumAffected");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "minimumAffected", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "maximumAffected");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "maximumAffected", __velarCopyField.value);
  }
  return __velarCopy;
}
var DatabaseCommand = __velarRegisterRuntimeType(__velarValidationFreeze({
  is(value) {
    return __velarTypeCheck_DatabaseCommand(value);
  },
  parse(value) {
    if (!__velarTypeCheck_DatabaseCommand(value)) {
      const __velarDetail = __velarTypeExplain_DatabaseCommand(value);
      throw new __VelarValidationError("Value does not match DatabaseCommand" + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
    }
    return __velarTypeCopy_DatabaseCommand(value, __velarValidationState(), __velarTypeCopy_DatabaseCommand);
  },
  copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarTypeCopy_DatabaseCommand) {
    return __velarTypeCopy_DatabaseCommand(value, __state, __velarCopyPlan);
  }
}));
function __velarTypeExplain_DatabaseQuery(value, __velarArguments) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) {
    return { path: __velarArguments.name, field: null, reason: "the value is not a record" };
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "text");
    if (__velarExplainField === void 0) {
      return { path: __velarArguments.name + ".text", field: "text", reason: "field 'text' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "string")) {
      return { path: __velarArguments.name + ".text", field: "text", reason: "field 'text' does not match string" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "maximumRows");
    if (__velarExplainField === void 0) {
      return { path: __velarArguments.name + ".maximumRows", field: "maximumRows", reason: "field 'maximumRows' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "number")) {
      return { path: __velarArguments.name + ".maximumRows", field: "maximumRows", reason: "field 'maximumRows' does not match number" };
    }
  }
  {
    const __velarExplainField = __velarValidationOwnDescriptor(value, "parse");
    if (__velarExplainField === void 0) {
      return { path: __velarArguments.name + ".parse", field: "parse", reason: "field 'parse' is missing" };
    }
    if (!(__velarExplainField.enumerable && "value" in __velarExplainField && typeof __velarExplainField.value === "function")) {
      return { path: __velarArguments.name + ".parse", field: "parse", reason: "field 'parse' does not match (unknown) -> T" };
    }
  }
  return { path: __velarArguments.name, field: null, reason: null };
}
function __velarTypeCheck_DatabaseQuery(value, __state = __velarValidationState(), __velarArguments) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value) || __state.depth >= 1e3) return false;
  let __active = __velarValidationWeakMapGet(__state.active, value);
  if (__active && __velarValidationSetHas(__active, __velarArguments)) return false;
  if (!__active) {
    __active = __velarValidationSet();
    __velarValidationWeakMapSet(__state.active, value, __active);
  }
  __velarValidationSetAdd(__active, __velarArguments);
  __state.depth += 1;
  try {
    const __velarField0 = __velarValidationOwnDescriptor(value, "text");
    const __velarField1 = __velarValidationOwnDescriptor(value, "maximumRows");
    const __velarField2 = __velarValidationOwnDescriptor(value, "parse");
    return !!(__velarField0?.enumerable && "value" in __velarField0 && typeof __velarField0.value === "string" && __velarField1?.enumerable && "value" in __velarField1 && typeof __velarField1.value === "number" && __velarField2?.enumerable && "value" in __velarField2 && typeof __velarField2.value === "function");
  } finally {
    __state.depth -= 1;
    __velarValidationSetDelete(__active, __velarArguments);
    if (__velarValidationSetSize(__active) === 0) __velarValidationWeakMapDelete(__state.active, value);
  }
}
function __velarTypeCopy_DatabaseQuery(value, __state, __velarCopyPlan, __velarArguments) {
  const __velarCopySeen = __state.copy.seen(__state, value, __velarCopyPlan);
  if (__velarCopySeen !== void 0) return __velarCopySeen;
  const __velarCopy = __state.copy.object(__state, value, __velarCopyPlan);
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "text");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "text", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "maximumRows");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "maximumRows", __velarCopyField.value);
  }
  {
    const __velarCopyField = __velarValidationOwnDescriptor(value, "parse");
    if (__velarCopyField !== void 0) __state.copy.field(__velarCopy, "parse", __velarCopyField.value);
  }
  return __velarCopy;
}
var __velarGenericInstances_DatabaseQuery = [];
var DatabaseQuery = __velarValidationFreeze({
  of(__velarKeys, __velarTexts, __velarChecks) {
    let __velarKey = "DatabaseQuery";
    for (let __velarIndex2 = 0; __velarIndex2 < __velarKeys.length; __velarIndex2 += 1) __velarKey += "\0" + __velarKeys[__velarIndex2];
    for (let __velarIndex2 = 0; __velarIndex2 < __velarGenericInstances_DatabaseQuery.length; __velarIndex2 += 1) {
      if (__velarGenericInstances_DatabaseQuery[__velarIndex2].key === __velarKey) return __velarGenericInstances_DatabaseQuery[__velarIndex2].type;
    }
    let __velarName = "DatabaseQuery<";
    for (let __velarIndex2 = 0; __velarIndex2 < __velarTexts.length; __velarIndex2 += 1) __velarName += (__velarIndex2 === 0 ? "" : ", ") + __velarTexts[__velarIndex2];
    __velarName += ">";
    const __velarArguments = { keys: __velarKeys, texts: __velarTexts, checks: __velarChecks, name: __velarName };
    const __velarType = __velarRegisterRuntimeType(__velarValidationFreeze({
      is(value, __state) {
        return __velarTypeCheck_DatabaseQuery(value, __state, __velarArguments);
      },
      parse(value) {
        if (!__velarTypeCheck_DatabaseQuery(value, __velarValidationState(), __velarArguments)) {
          const __velarDetail = __velarTypeExplain_DatabaseQuery(value, __velarArguments);
          throw new __VelarValidationError("Value does not match " + __velarArguments.name + (__velarDetail.reason ? " \u2014 " + __velarDetail.reason : "") + __velarValidationRejectionHint(value), __velarDetail);
        }
        return __velarTypeCopy_DatabaseQuery(value, __velarValidationState(), __velarArguments, __velarArguments);
      },
      copy(value, __state = __velarValidationState(), __velarCopyPlan = __velarArguments) {
        return __velarTypeCopy_DatabaseQuery(value, __state, __velarCopyPlan, __velarArguments);
      }
    }));
    __velarGenericInstances_DatabaseQuery[__velarGenericInstances_DatabaseQuery.length] = { key: __velarKey, type: __velarType };
    return __velarType;
  }
});
var DatabaseAffectedRowsError = class extends Error {
  constructor(affected, minimum, maximum) {
    super(`Database command affected ${affected} rows; expected ${minimum} through ${maximum}`);
    this.name = "DatabaseAffectedRowsError";
    this.affected = affected;
    this.minimum = minimum;
    this.maximum = maximum;
    const self = this;
  }
};
var DatabaseRowNotFoundError = class extends Error {
  constructor(message = "Database query returned no row") {
    super(message);
    this.name = "DatabaseRowNotFoundError";
    const self = this;
  }
};
function statementText(value) {
  if (!(!__velarStringIsBlank(value) && __velarStringSize(value) <= 1024 * 1024)) {
    throw new __VelarAssertionError("Database statement must be non-blank text no longer than 1 MiB");
  }
  return value;
}
function rowLimit(value, label) {
  if (!(__velarNumberIsInteger(value) && value >= 1 && value <= 1e6)) {
    throw new __VelarAssertionError(`${label} must be an integer from 1 through 1000000`);
  }
  return value;
}
function command(text, minimumAffected = 0, maximumAffected = 1e6) {
  if (!(__velarNumberIsInteger(minimumAffected) && minimumAffected >= 0 && minimumAffected <= 1e6)) {
    throw new __VelarAssertionError("Database command minimumAffected must be an integer from 0 through 1000000");
  }
  if (!(__velarNumberIsInteger(maximumAffected) && maximumAffected >= minimumAffected && maximumAffected <= 1e6)) {
    throw new __VelarAssertionError("Database command maximumAffected must be an integer from minimumAffected through 1000000");
  }
  return { text: statementText(text), minimumAffected, maximumAffected };
}
function query(text, RowType, maximumRows = 1e4) {
  const parseRow = (value) => RowType.parse(value ?? null);
  return { text: statementText(text), maximumRows: rowLimit(maximumRows, "Database query maximumRows"), parse: parseRow };
}
async function execute(executor, operation, parameters = __velarAdoptList([])) {
  const affected = await __velarNormalizePromiseValue(executor.execute(operation.text, __velarListCopy(parameters)));
  if (affected < operation.minimumAffected || affected > operation.maximumAffected) {
    throw new DatabaseAffectedRowsError(affected, operation.minimumAffected, operation.maximumAffected);
  }
  return affected;
}
async function one(executor, operation, parameters = __velarAdoptList([])) {
  const row = await __velarNormalizePromiseValue(executor.one(operation.text, __velarListCopy(parameters)));
  if ((row ?? null) === null) {
    return null;
  }
  return __velarAsyncResolvedValue(operation.parse(row ?? null));
}
async function requireOne(executor, operation, parameters = __velarAdoptList([]), message = "Database query returned no row") {
  const row = await __velarNormalizePromiseValue(one(executor, operation, parameters));
  if ((row ?? null) === null) {
    throw new DatabaseRowNotFoundError(message);
  }
  return __velarAsyncResolvedValue(((__velarValue) => __velarNarrow(__velarValue, __velarValue != null, "T", "row", 3983))(row));
}
async function all(executor, operation, parameters = __velarAdoptList([])) {
  const rows = await __velarNormalizePromiseValue(executor.all(operation.text, __velarListCopy(parameters)));
  if (!(__velarListSize(rows) <= operation.maximumRows)) {
    throw new __VelarAssertionError(`Database query returned more than its ${operation.maximumRows} row limit`);
  }
  return __velarAsyncResolvedValue(__velarListMap(rows, (row) => operation.parse(row ?? null)));
}
export {
  DatabaseAffectedRowsError,
  DatabaseCommand,
  DatabaseExecutor,
  DatabaseQuery,
  DatabaseRowNotFoundError,
  all,
  command,
  execute,
  one,
  query,
  requireOne
};
