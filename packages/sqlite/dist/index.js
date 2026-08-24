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
import { DatabaseExecutor } from "@velarscript-labs/database";

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
  const allowed = /* @__PURE__ */ new Set(["busyTimeoutMilliseconds", "queueCapacity", "maxRows", "maxResultBytes"]);
  for (const key of Object.keys(value)) if (!allowed.has(key)) throw new TypeError("Unknown SQLite option " + key);
  return {
    busyTimeoutMilliseconds: integer(value.busyTimeoutMilliseconds, 2e3, 1, 6e4, "SQLite busy timeout"),
    queueCapacity: integer(value.queueCapacity, 64, 1, 1024, "SQLite queue capacity"),
    maxRows: integer(value.maxRows, 1e4, 1, 1e6, "SQLite row limit"),
    maxResultBytes: integer(value.maxResultBytes, 64 * 1024 * 1024, 1, 128 * 1024 * 1024, "SQLite result byte limit")
  };
}
function workerMain() {
  const { Buffer } = (0, globalThis.require)("node:buffer");
  const { parentPort, workerData } = (0, globalThis.require)("node:worker_threads");
  const { DatabaseSync } = (0, globalThis.require)("node:sqlite");
  let database = null;
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
  function sqlText(value, operation) {
    if (typeof value !== "string" || value.length === 0 || value.length > 1024 * 1024 || value.includes("\0")) {
      throw failure("SQLite SQL must be non-empty text no longer than 1 MiB", "SQLITE_INPUT", operation);
    }
    return value;
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
  function statement(sql, operation) {
    const prepared = database.prepare(sqlText(sql, operation));
    if (typeof prepared.setReadBigInts === "function") prepared.setReadBigInts(true);
    return prepared;
  }
  function execute(message) {
    const prepared = statement(message.sql, "execute");
    const result = prepared.run(...parameters(message.params));
    return count(result.changes, "SQLite affected row count");
  }
  function one(message) {
    const prepared = statement(message.sql, "one");
    const row = prepared.get(...parameters(message.params));
    if (row === void 0) return null;
    return resultRow(row, { value: 0 });
  }
  function all(message) {
    const prepared = statement(message.sql, "all");
    const rows = [];
    const budget = { value: 0 };
    for (const row of prepared.iterate(...parameters(message.params))) {
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
    database = new DatabaseSync(workerData.path, { timeout: workerData.busyTimeoutMilliseconds });
    database.exec("PRAGMA foreign_keys = ON");
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
function request(state, operation, sql = "", params = []) {
  if (state.closed) return Promise.reject(new NativeSqliteError("SQLite connection is closed", "SQLITE_CLOSED", operation));
  const id = state.nextId++;
  return new Promise((resolve, reject) => {
    state.pending.set(id, { resolve, reject });
    try {
      state.worker.postMessage({ id, operation, sql, params });
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
function transactionRequest(transaction, operation, sql = "", params = []) {
  const state = transactionStateOf(transaction);
  if (state.busy) return Promise.reject(new NativeSqliteConcurrencyError("SQLite transaction operations must be awaited one at a time"));
  state.busy = true;
  return request(state.connection, operation, sql, params).finally(() => {
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
  execute(sql, params = []) {
    return transactionRequest(this, "execute", sql, params);
  }
  one(sql, params = []) {
    return transactionRequest(this, "one", sql, params);
  }
  all(sql, params = []) {
    return transactionRequest(this, "all", sql, params);
  }
};
var NativeSqliteConnection = class {
  constructor(token, state) {
    if (token !== TOKEN) throw new TypeError("Use openSqlite to create a SQLite connection");
    connectionStates.set(this, state);
  }
  execute(sql, params = []) {
    const state = stateOf(this);
    return enqueue(state, () => request(state, "execute", sql, params));
  }
  one(sql, params = []) {
    const state = stateOf(this);
    return enqueue(state, () => request(state, "one", sql, params));
  }
  all(sql, params = []) {
    const state = stateOf(this);
    return enqueue(state, () => request(state, "all", sql, params));
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
  return { path: "SqliteOptions", field: null, reason: null };
}
function __velarTypeCheck_SqliteOptions(value) {
  if (value === null || typeof value !== "object" || __velarValidationIsArray(value) || !__velarValidationIsPlainObject(value)) return false;
  const __velarField0 = __velarValidationOwnDescriptor(value, "busyTimeoutMilliseconds");
  const __velarField1 = __velarValidationOwnDescriptor(value, "queueCapacity");
  const __velarField2 = __velarValidationOwnDescriptor(value, "maxRows");
  const __velarField3 = __velarValidationOwnDescriptor(value, "maxResultBytes");
  return !!((__velarField0 === void 0 || __velarField0?.enumerable && "value" in __velarField0 && (__velarField0.value == null || typeof __velarField0.value === "number")) && (__velarField1 === void 0 || __velarField1?.enumerable && "value" in __velarField1 && (__velarField1.value == null || typeof __velarField1.value === "number")) && (__velarField2 === void 0 || __velarField2?.enumerable && "value" in __velarField2 && (__velarField2.value == null || typeof __velarField2.value === "number")) && (__velarField3 === void 0 || __velarField3?.enumerable && "value" in __velarField3 && (__velarField3.value == null || typeof __velarField3.value === "number")));
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
    return new SqliteBackpressureError(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteBackpressureError), "NativeSqliteBackpressureError", "error", 20523))(error).message);
  }
  if (error instanceof NativeSqliteConcurrencyError) {
    return new SqliteConcurrencyError(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteConcurrencyError), "NativeSqliteConcurrencyError", "error", 20622))(error).message);
  }
  if (error instanceof NativeSqliteError) {
    return new SqliteError(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 20699))(error).message, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 20714))(error).sqliteCode ?? null, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 20732))(error).operation, ((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 20749))(error).retryable);
  }
  return new SqliteError(error.message);
}
var SqliteTransaction = class {
  #native;
  constructor(native) {
    this.#native = native;
    const self = this;
  }
  async execute(sql, params = __velarAdoptList([])) {
    const self = this;
    try {
      return await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").execute(sql, params));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 21160))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  executor() {
    const self = this;
    async function executeStatement(text, parameters) {
      return await __velarNormalizePromiseValue(self.execute(text, parameters));
    }
    async function oneRow(text, parameters) {
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(text, parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 21753))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    async function allRows(text, parameters) {
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(text, parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 22087))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    return { execute: executeStatement, one: oneRow, all: allRows };
  }
  async one(sql, RowType, params = __velarAdoptList([])) {
    const self = this;
    try {
      const row = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(sql, params));
      if ((row ?? null) === null) {
        return null;
      }
      return __velarAsyncResolvedValue(RowType.parse(row ?? null));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 22568))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  async all(sql, RowType, params = __velarAdoptList([])) {
    const self = this;
    try {
      const rows = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(sql, params));
      return __velarAsyncResolvedValue(__velarListMap(rows, (row) => RowType.parse(row ?? null)));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 22941))(error));
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
  async execute(sql, params = __velarAdoptList([])) {
    const self = this;
    try {
      return await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").execute(sql, params));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 23347))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  executor() {
    const self = this;
    async function executeStatement(text, parameters) {
      return await __velarNormalizePromiseValue(self.execute(text, parameters));
    }
    async function oneRow(text, parameters) {
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(text, parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 23939))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    async function allRows(text, parameters) {
      try {
        return __velarAsyncResolvedValue(await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(text, parameters)));
      } catch (error) {
        error = __velarNormalizeError(error);
        if (error instanceof NativeSqliteError) {
          throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 24273))(error));
        }
        throw new SqliteError(__velarReadInstanceField(error, "message"));
      }
    }
    return { execute: executeStatement, one: oneRow, all: allRows };
  }
  async one(sql, RowType, params = __velarAdoptList([])) {
    const self = this;
    try {
      const row = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").one(sql, params));
      if ((row ?? null) === null) {
        return null;
      }
      return __velarAsyncResolvedValue(RowType.parse(row ?? null));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 24754))(error));
      }
      throw new SqliteError(__velarReadInstanceField(error, "message"));
    }
  }
  async all(sql, RowType, params = __velarAdoptList([])) {
    const self = this;
    try {
      const rows = await __velarNormalizePromiseValue(__velarReadPrivateField(self.#native, "native").all(sql, params));
      return __velarAsyncResolvedValue(__velarListMap(rows, (row) => RowType.parse(row ?? null)));
    } catch (error) {
      error = __velarNormalizeError(error);
      if (error instanceof NativeSqliteError) {
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 25127))(error));
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
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 25714))(error));
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
        throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 25920))(error));
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
      throw sqliteFailure(((__velarValue) => __velarNarrow(__velarValue, __velarValidationIsInstance(__velarValue, NativeSqliteError), "NativeSqliteError", "error", 26275))(error));
    }
    throw new SqliteError(__velarReadInstanceField(error, "message"));
  }
}
export {
  SqliteBackpressureError,
  SqliteConcurrencyError,
  SqliteConnection,
  SqliteError,
  SqliteOptions,
  SqliteTransaction,
  openSqlite
};
