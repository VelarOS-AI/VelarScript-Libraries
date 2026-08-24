// velar-standard:velar/compiler-runtime-reactive-v1
function __velarHostRaw(value) {
  return value;
}

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
var __velarTextMeasureCacheUnits = 8 * 1024 * 1024;
var __velarTextMeasureCache = typeof __velarTextNativeMap === "function" && typeof __velarTextMapGet === "function" && typeof __velarTextMapSet === "function" && typeof __velarTextMapClear === "function" ? new __velarTextNativeMap() : null;
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
function __velarNumberIsFinite(value) {
  return __velarNumberCall(__velarNumberNativeIsFinite, __velarNumberNativeNumber, [__velarNumberValue(value)]);
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

// velar-standard:velar/random
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
var __velarRandomNativeObject = globalThis.Object;
var __velarRandomNativeNumber = globalThis.Number;
var __velarRandomNativeArray = globalThis.Array;
var __velarRandomNativeWeakMap = globalThis.WeakMap;
var __velarRandomNativeTypeError = globalThis.TypeError;
var __velarRandomNativeRangeError = globalThis.RangeError;
var __velarRandomNativeMath = globalThis.Math;
var __velarRandomGetOwnPropertyDescriptor = __velarRandomNativeObject.getOwnPropertyDescriptor;
var __velarRandomFreeze = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeObject, "freeze")?.value;
var __velarRandomCreate = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeObject, "create")?.value;
var __velarRandomApply = __velarRandomGetOwnPropertyDescriptor(globalThis.Reflect, "apply")?.value;
var __velarRandomNumberIsSafeInteger = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeNumber, "isSafeInteger")?.value;
var __velarRandomArrayIsArray = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeArray, "isArray")?.value;
var __velarRandomMathImul = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeMath, "imul")?.value;
var __velarRandomMathFloor = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeMath, "floor")?.value;
var __velarRandomStringPrototype = __velarRandomGetOwnPropertyDescriptor(globalThis.String, "prototype")?.value;
var __velarRandomStringCharCodeAt = __velarRandomGetOwnPropertyDescriptor(__velarRandomStringPrototype, "charCodeAt")?.value;
var __velarRandomWeakMapPrototype = __velarRandomGetOwnPropertyDescriptor(__velarRandomNativeWeakMap, "prototype")?.value;
var __velarRandomWeakMapGet = __velarRandomGetOwnPropertyDescriptor(__velarRandomWeakMapPrototype, "get")?.value;
var __velarRandomWeakMapHas = __velarRandomGetOwnPropertyDescriptor(__velarRandomWeakMapPrototype, "has")?.value;
var __velarRandomWeakMapSet = __velarRandomGetOwnPropertyDescriptor(__velarRandomWeakMapPrototype, "set")?.value;
if (typeof __velarRandomFreeze !== "function" || typeof __velarRandomCreate !== "function" || typeof __velarRandomApply !== "function" || typeof __velarRandomNumberIsSafeInteger !== "function" || typeof __velarRandomArrayIsArray !== "function" || typeof __velarRandomMathImul !== "function" || typeof __velarRandomMathFloor !== "function" || typeof __velarRandomStringCharCodeAt !== "function" || typeof __velarRandomWeakMapGet !== "function" || typeof __velarRandomWeakMapHas !== "function" || typeof __velarRandomWeakMapSet !== "function") {
  throw new __velarRandomNativeTypeError("The deterministic random runtime is unavailable");
}
function __velarRandomCall(operation, receiver, arguments_) {
  return __velarRandomApply(operation, receiver, arguments_);
}
function __velarRandomImul(left, right) {
  return __velarRandomCall(__velarRandomMathImul, __velarRandomNativeMath, [left, right]);
}
function __velarRandomRotl(value, count) {
  return (value << count | value >>> 32 - count) >>> 0;
}
function __velarRandomHash(text) {
  let first = (1779033703 ^ text.length) >>> 0;
  let second = (3144134277 ^ text.length) >>> 0;
  let third = (1013904242 ^ text.length) >>> 0;
  let fourth = (2773480762 ^ text.length) >>> 0;
  for (let index = 0; index < text.length; index += 1) {
    const code = __velarRandomCall(__velarRandomStringCharCodeAt, text, [index]);
    first = second ^ __velarRandomImul(first ^ code, 597399067);
    second = third ^ __velarRandomImul(second ^ code, 2869860233);
    third = fourth ^ __velarRandomImul(third ^ code, 951274213);
    fourth = first ^ __velarRandomImul(fourth ^ code, 2716044179);
  }
  first = __velarRandomImul(third ^ first >>> 18, 597399067);
  second = __velarRandomImul(fourth ^ second >>> 22, 2869860233);
  third = __velarRandomImul(first ^ third >>> 17, 951274213);
  fourth = __velarRandomImul(second ^ fourth >>> 19, 2716044179);
  const output = new __velarRandomNativeArray(4);
  output[0] = first >>> 0;
  output[1] = second >>> 0;
  output[2] = third >>> 0;
  output[3] = fourth >>> 0;
  if ((output[0] | output[1] | output[2] | output[3]) === 0) output[0] = 1;
  return output;
}
function __velarRandomSeed(seed) {
  if (typeof seed === "string") return __velarRandomHash("s:" + seed);
  if (typeof seed !== "number" || !__velarRandomCall(__velarRandomNumberIsSafeInteger, __velarRandomNativeNumber, [seed])) {
    throw new __velarRandomNativeTypeError("random seed must be a string or safe integer");
  }
  return __velarRandomHash("n:" + seed);
}
var __velarRandomStates = new __velarRandomNativeWeakMap();
function __velarRandomState(value) {
  const state = __velarRandomCall(__velarRandomWeakMapGet, __velarRandomStates, [value]);
  if (state === void 0) throw new __velarRandomNativeTypeError("Random method requires a Random receiver");
  return state;
}
function __velarRandomNext(receiver) {
  const state = __velarRandomState(receiver).state;
  const result = __velarRandomImul(__velarRandomRotl(__velarRandomImul(state[1], 5) >>> 0, 7), 9) >>> 0;
  const temporary = state[1] << 9;
  state[2] ^= state[0];
  state[3] ^= state[1];
  state[1] ^= state[2];
  state[0] ^= state[3];
  state[2] ^= temporary;
  state[3] = __velarRandomRotl(state[3], 11);
  state[0] >>>= 0;
  state[1] >>>= 0;
  state[2] >>>= 0;
  return result;
}
function __velarRandomRange(start, end) {
  if (end === null) {
    end = start;
    start = 0;
  }
  const width = end - start;
  if (!__velarRandomCall(__velarRandomNumberIsSafeInteger, __velarRandomNativeNumber, [start]) || !__velarRandomCall(__velarRandomNumberIsSafeInteger, __velarRandomNativeNumber, [end]) || !__velarRandomCall(__velarRandomNumberIsSafeInteger, __velarRandomNativeNumber, [width]) || width <= 0) {
    throw new __velarRandomNativeRangeError("Random.int requires an increasing safe-integer range");
  }
  return [start, width];
}
var __velarRandomPrototype = {
  number() {
    return __velarRandomNext(this) / 4294967296;
  },
  int(start, end = null) {
    const range = __velarRandomRange(start, end);
    if (range[1] <= 4294967296) {
      const limit2 = __velarRandomCall(__velarRandomMathFloor, __velarRandomNativeMath, [4294967296 / range[1]]) * range[1];
      let value2;
      do {
        value2 = __velarRandomNext(this);
      } while (value2 >= limit2);
      return range[0] + value2 % range[1];
    }
    const limit = __velarRandomCall(__velarRandomMathFloor, __velarRandomNativeMath, [9007199254740992 / range[1]]) * range[1];
    let value;
    do {
      value = __velarRandomNext(this) * 2097152 + (__velarRandomNext(this) >>> 11);
    } while (value >= limit);
    return range[0] + value % range[1];
  },
  bool(probability = 0.5) {
    if (typeof probability !== "number" || probability < 0 || probability > 1 || probability !== probability) throw new __velarRandomNativeRangeError("Random.bool probability must be a number from 0 through 1");
    if (probability === 0) return false;
    if (probability === 1) return true;
    return this.number() < probability;
  },
  pick(values) {
    if (!__velarRandomCall(__velarRandomArrayIsArray, __velarRandomNativeArray, [values])) throw new __velarRandomNativeTypeError("Random.pick requires a List");
    if (values.length === 0) throw new __velarRandomNativeRangeError("Random.pick requires a non-empty List");
    return values[this.int(values.length)];
  },
  shuffle(values) {
    if (!__velarRandomCall(__velarRandomArrayIsArray, __velarRandomNativeArray, [values])) throw new __velarRandomNativeTypeError("Random.shuffle requires a List");
    const output = new __velarRandomNativeArray(values.length);
    for (let index = 0; index < values.length; index += 1) output[index] = values[index];
    for (let index = output.length - 1; index > 0; index -= 1) {
      const other = this.int(index + 1);
      const value = output[index];
      output[index] = output[other];
      output[other] = value;
    }
    return output;
  },
  fork(label) {
    if (typeof label !== "string") throw new __velarRandomNativeTypeError("Random.fork label must be a string");
    const key = __velarRandomState(this).key;
    return __velarRandomMake(__velarRandomHash("f:" + key[0] + ":" + key[1] + ":" + key[2] + ":" + key[3] + ":" + label));
  }
};
__velarRandomFreeze(__velarRandomPrototype);
function __velarRandomMake(key) {
  const value = __velarRandomCreate(__velarRandomPrototype);
  __velarRandomCall(__velarRandomWeakMapSet, __velarRandomStates, [value, { key: [key[0], key[1], key[2], key[3]], state: [key[0], key[1], key[2], key[3]] }]);
  return __velarRandomFreeze(value);
}
var Random = __velarRegisterRuntimeType(__velarRandomFreeze({
  is(value) {
    return (typeof value === "object" || typeof value === "function") && value !== null && __velarRandomCall(__velarRandomWeakMapHas, __velarRandomStates, [value]);
  },
  parse(value) {
    if (!Random.is(value)) throw new __velarRandomNativeTypeError("Value does not match Random");
    return value;
  }
}));
function random(seed) {
  return __velarRandomMake(__velarRandomSeed(seed));
}

// src/src/index.vel
import { createNoise2D, createNoise3D, createNoise4D } from "simplex-noise";
import * as __velarExternModule336 from "simplex-noise";
function __velarExternExport(namespace, name, source) {
  const value = namespace[name];
  if (value === void 0 && !(name in namespace)) {
    throw new TypeError(name === "default" ? `Extern module '${source}' declares 'default', but the JavaScript module has no default export; declare the module's real named exports instead` : `Extern module '${source}' declares '${name}', but the JavaScript module has no such export; prototype methods and instance members belong on a declared class or singleton const, not module exports`);
  }
  return value;
}
__velarExternExport(__velarExternModule336, "createNoise2D", "simplex-noise");
__velarExternExport(__velarExternModule336, "createNoise3D", "simplex-noise");
__velarExternExport(__velarExternModule336, "createNoise4D", "simplex-noise");
function coordinate(value) {
  if (!__velarNumberIsFinite(value)) {
    throw new __VelarAssertionError("Simplex noise coordinates must be finite numbers");
  }
  return value;
}
function finite2(source) {
  return (x, y) => source(coordinate(x), coordinate(y));
}
function finite3(source) {
  return (x, y, z) => source(coordinate(x), coordinate(y), coordinate(z));
}
function finite4(source) {
  return (x, y, z, w) => source(coordinate(x), coordinate(y), coordinate(z), coordinate(w));
}
function simplex2(seed) {
  const source = random(seed).fork("simplex2");
  return finite2(createNoise2D(__velarHostRaw(() => source.number())));
}
function simplex3(seed) {
  const source = random(seed).fork("simplex3");
  return finite3(createNoise3D(__velarHostRaw(() => source.number())));
}
function simplex4(seed) {
  const source = random(seed).fork("simplex4");
  return finite4(createNoise4D(__velarHostRaw(() => source.number())));
}
export {
  simplex2,
  simplex3,
  simplex4
};
