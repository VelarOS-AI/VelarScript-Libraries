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

// velar-standard:velar/compiler-runtime-reactive-v1
function __velarReactiveRaw(value) {
  return value;
}
function __velarHostRaw(value) {
  return value;
}
function __velarReactiveCollectionLink() {
}
function __velarReactiveCollectionTrigger() {
}

// velar-standard:velar/compiler-runtime-collection-lowering-v1
var __velarMaxCollectionItems = 1e6;
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
function __velarValidateMutableList(value, name) {
  value = __velarReactiveRaw(value);
  const tier = __velarListTier(value);
  if (tier === 0) return __velarValidateDenseList(value, name);
  __velarListRequireMutableLength(value, name);
  return value;
}
var __velarListNativeString = globalThis.String;
var __velarListStringPrototype = __velarCollectionListGetOwnPropertyDescriptor(__velarListNativeString, "prototype")?.value;
var __velarListStringCharCodeAt = __velarCollectionListGetOwnPropertyDescriptor(__velarListStringPrototype, "charCodeAt")?.value;
var __velarListSurrogatePattern = /[\uD800-\uDFFF]/;
var __velarListRegExpPrototype = __velarCollectionHostCall(__velarCollectionGetPrototypeOf, __velarCollectionNativeObject, [__velarListSurrogatePattern]);
var __velarListSurrogateExecOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListRegExpPrototype, "exec")?.value;
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

// velar-standard:velar/binary
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
var __velarBinaryNativeObject = globalThis.Object;
var __velarBinaryNativeArray = globalThis.Array;
var __velarBinaryNativeNumber = globalThis.Number;
var __velarBinaryNativeUint8Array = globalThis.Uint8Array;
var __velarBinaryNativeUint16Array = globalThis.Uint16Array;
var __velarBinaryNativeUint32Array = globalThis.Uint32Array;
var __velarBinaryNativeFloat32Array = globalThis.Float32Array;
var __velarBinaryNativeDataView = globalThis.DataView;
var __velarBinaryNativeWeakMap = globalThis.WeakMap;
var __velarBinaryNativeTypeError = globalThis.TypeError;
var __velarBinaryNativeRangeError = globalThis.RangeError;
var __velarBinaryGetOwnPropertyDescriptor = __velarBinaryNativeObject.getOwnPropertyDescriptor;
var __velarBinaryGetPrototypeOf = __velarBinaryNativeObject.getPrototypeOf;
var __velarBinaryFreeze = __velarBinaryNativeObject.freeze;
var __velarBinaryApply = __velarBinaryGetOwnPropertyDescriptor(globalThis.Reflect, "apply")?.value;
var __velarBinaryNumberIsInteger = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryNativeNumber, "isInteger")?.value;
var __velarBinaryNumberIsSafeInteger = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryNativeNumber, "isSafeInteger")?.value;
var __velarBinaryNumberIsFinite = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryNativeNumber, "isFinite")?.value;
var __velarBinaryTypedArrayPrototype = __velarBinaryGetPrototypeOf(__velarBinaryNativeUint8Array.prototype);
var __velarBinaryTypedArrayTag = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryTypedArrayPrototype, globalThis.Symbol.toStringTag)?.get;
var __velarBinaryTypedArrayLength = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryTypedArrayPrototype, "length")?.get;
var __velarBinaryTypedArraySet = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryTypedArrayPrototype, "set")?.value;
if (typeof __velarBinaryApply !== "function" || typeof __velarBinaryNumberIsInteger !== "function" || typeof __velarBinaryNumberIsSafeInteger !== "function" || typeof __velarBinaryTypedArrayTag !== "function" || typeof __velarBinaryNumberIsFinite !== "function" || typeof __velarBinaryTypedArrayLength !== "function" || typeof __velarBinaryTypedArraySet !== "function" || typeof __velarBinaryNativeArray !== "function" || typeof __velarBinaryNativeDataView !== "function" || typeof __velarBinaryNativeWeakMap !== "function") {
  throw new __velarBinaryNativeTypeError("The JavaScript typed-array runtime is unavailable");
}
function __velarBinaryCall(operation, receiver, arguments_) {
  return __velarBinaryApply(operation, receiver, arguments_);
}
function __velarBinaryKind(value) {
  try {
    return __velarBinaryCall(__velarBinaryTypedArrayTag, value, []);
  } catch {
    return null;
  }
}
function __velarBinaryLength(value, expected, name) {
  if (__velarBinaryKind(value) !== expected) throw new __velarBinaryNativeTypeError(name + " requires " + expected);
  return __velarBinaryCall(__velarBinaryTypedArrayLength, value, []);
}
function __velarBinaryOrder(order) {
  if (order !== "little" && order !== "big") throw new __velarBinaryNativeTypeError("Byte order must be ByteOrder.little or ByteOrder.big");
  return order;
}
function __velarBinaryCheckedIndex(value, index, expected, name) {
  const length = __velarBinaryLength(value, expected, name);
  if (!__velarBinaryCall(__velarBinaryNumberIsInteger, __velarBinaryNativeNumber, [index]) || index < 0 || index >= length) {
    throw new __VelarIndexError(name + " index must be an integer from 0 up to but excluding size");
  }
  return index;
}
function __velarBinarySnapshot(value, expected, Constructor, name) {
  const length = __velarBinaryLength(value, expected, name);
  const bytes = expected === "Uint8Array" ? 1 : expected === "Uint16Array" ? 2 : 4;
  __velarBinarySizeLimit(length, bytes, name);
  const output = new Constructor(length);
  __velarBinaryCall(__velarBinaryTypedArraySet, output, [value]);
  return output;
}
function __velarBinaryWithinLimit(value, expected, bytes) {
  return __velarBinaryKind(value) === expected && __velarBinaryCall(__velarBinaryTypedArrayLength, value, []) <= 64 * 1024 * 1024 / bytes;
}
function __velarBinarySpec(value, name = "Binary buffer") {
  switch (__velarBinaryKind(value)) {
    case "Uint8Array":
      return { name: "UInt8Buffer", bytes: 1, Constructor: __velarBinaryNativeUint8Array, minimum: 0, maximum: 255, integer: true };
    case "Uint16Array":
      return { name: "UInt16Buffer", bytes: 2, Constructor: __velarBinaryNativeUint16Array, minimum: 0, maximum: 65535, integer: true };
    case "Uint32Array":
      return { name: "UInt32Buffer", bytes: 4, Constructor: __velarBinaryNativeUint32Array, minimum: 0, maximum: 4294967295, integer: true };
    case "Float32Array":
      return { name: "Float32Buffer", bytes: 4, Constructor: __velarBinaryNativeFloat32Array, minimum: -34028234663852886e22, maximum: 34028234663852886e22, integer: false };
    default:
      throw new __velarBinaryNativeTypeError(name + " requires a supported fixed numeric buffer");
  }
}
function __velarBinarySizeLimit(size, bytes, name) {
  if (!__velarBinaryCall(__velarBinaryNumberIsSafeInteger, __velarBinaryNativeNumber, [size]) || size < 0 || size > 64 * 1024 * 1024 / bytes) {
    throw new __velarBinaryNativeRangeError(name + " size exceeds the 64 MiB binary-memory limit");
  }
  return size;
}
function __velarBinaryValue(spec, value) {
  const valid = typeof value === "number" && __velarBinaryCall(__velarBinaryNumberIsFinite, __velarBinaryNativeNumber, [value]) && value >= spec.minimum && value <= spec.maximum && (!spec.integer || __velarBinaryCall(__velarBinaryNumberIsInteger, __velarBinaryNativeNumber, [value]));
  if (!valid) throw new __velarBinaryNativeRangeError(spec.name + " value is outside its supported numeric range");
  return value;
}
var ByteOrder = __velarRegisterRuntimeType(__velarBinaryFreeze({
  little: "little",
  big: "big",
  is(value) {
    return value === "little" || value === "big";
  },
  parse(value) {
    if (!ByteOrder.is(value)) throw new __velarBinaryNativeTypeError("Value does not match ByteOrder");
    return value;
  },
  values() {
    return ["little", "big"];
  }
}));
var Bytes = __velarRegisterRuntimeType(__velarBinaryFreeze({
  is(value) {
    return __velarBinaryWithinLimit(value, "Uint8Array", 1);
  },
  parse(value) {
    return __velarBinarySnapshot(value, "Uint8Array", __velarBinaryNativeUint8Array, "Bytes.parse");
  },
  __velarSize(value) {
    return __velarBinarySize(value);
  },
  __velarIndex(value, index) {
    return __velarBytesIndex(value, index);
  },
  __velarSetIndex(value, index, next) {
    return __velarBytesSetIndex(value, index, next);
  },
  __velarUInt8Index(value, index) {
    return __velarUInt8Index(value, index);
  },
  __velarUInt8SetIndex(value, index, next) {
    return __velarUInt8SetIndex(value, index, next);
  },
  __velarUInt16Index(value, index) {
    return __velarUInt16Index(value, index);
  },
  __velarUInt16SetIndex(value, index, next) {
    return __velarUInt16SetIndex(value, index, next);
  },
  __velarUInt32Index(value, index) {
    return __velarUInt32Index(value, index);
  },
  __velarUInt32SetIndex(value, index, next) {
    return __velarUInt32SetIndex(value, index, next);
  },
  __velarFloat32Index(value, index) {
    return __velarFloat32Index(value, index);
  },
  __velarFloat32SetIndex(value, index, next) {
    return __velarFloat32SetIndex(value, index, next);
  },
  __velarBufferCopy(value) {
    return __velarBufferCopy(value);
  },
  __velarBufferSlice(value, start, end) {
    return __velarBufferSlice(value, start, end);
  },
  __velarBufferToBytes(value, order) {
    return __velarBufferToBytes(value, order);
  },
  __velarBufferValues(value) {
    return __velarBufferValues(value);
  }
}));
var UInt8Buffer = __velarRegisterRuntimeType(__velarBinaryFreeze({
  is(value) {
    return __velarBinaryWithinLimit(value, "Uint8Array", 1);
  },
  parse(value) {
    return __velarBinarySnapshot(value, "Uint8Array", __velarBinaryNativeUint8Array, "UInt8Buffer.parse");
  }
}));
var UInt16Buffer = __velarRegisterRuntimeType(__velarBinaryFreeze({
  is(value) {
    return __velarBinaryWithinLimit(value, "Uint16Array", 2);
  },
  parse(value) {
    return __velarBinarySnapshot(value, "Uint16Array", __velarBinaryNativeUint16Array, "UInt16Buffer.parse");
  }
}));
var UInt32Buffer = __velarRegisterRuntimeType(__velarBinaryFreeze({
  is(value) {
    return __velarBinaryWithinLimit(value, "Uint32Array", 4);
  },
  parse(value) {
    return __velarBinarySnapshot(value, "Uint32Array", __velarBinaryNativeUint32Array, "UInt32Buffer.parse");
  }
}));
var Float32Buffer = __velarRegisterRuntimeType(__velarBinaryFreeze({
  is(value) {
    return __velarBinaryFloat32Is(value);
  },
  parse(value) {
    return __velarBinaryFloat32Snapshot(value, "Float32Buffer.parse");
  }
}));
function __velarBinarySize(value) {
  const kind = __velarBinaryKind(value);
  if (kind !== "Uint8Array" && kind !== "Uint16Array" && kind !== "Uint32Array" && kind !== "Float32Array") throw new __velarBinaryNativeTypeError("Binary size requires Bytes or a fixed numeric buffer");
  return __velarBinaryCall(__velarBinaryTypedArrayLength, value, []);
}
function __velarBytesIndex(value, index) {
  return value[__velarBinaryCheckedIndex(value, index, "Uint8Array", "Bytes")];
}
function __velarBytesSetIndex() {
  throw new __velarBinaryNativeTypeError("Bytes is a read-only binary snapshot");
}
function __velarBinaryIntegerValue(value, minimum, maximum, name) {
  if (!__velarBinaryCall(__velarBinaryNumberIsInteger, __velarBinaryNativeNumber, [value]) || value < minimum || value > maximum) throw new __velarBinaryNativeRangeError(name + " value is outside its supported integer range");
  return value;
}
function __velarBinaryFloat32Value(value) {
  if (typeof value !== "number" || !__velarBinaryCall(__velarBinaryNumberIsFinite, __velarBinaryNativeNumber, [value]) || value < -34028234663852886e22 || value > 34028234663852886e22) throw new __velarBinaryNativeRangeError("Float32Buffer value is outside its supported finite range");
  return value;
}
function __velarBinaryFloat32Is(value) {
  if (__velarBinaryKind(value) !== "Float32Array") return false;
  const length = __velarBinaryCall(__velarBinaryTypedArrayLength, value, []);
  if (length > 64 * 1024 * 1024 / 4) return false;
  for (let index = 0; index < length; index += 1) {
    const item = value[index];
    if (typeof item !== "number" || !__velarBinaryCall(__velarBinaryNumberIsFinite, __velarBinaryNativeNumber, [item])) return false;
  }
  return true;
}
function __velarBinaryFloat32Snapshot(value, name) {
  const length = __velarBinaryLength(value, "Float32Array", name);
  __velarBinarySizeLimit(length, 4, name);
  const output = new __velarBinaryNativeFloat32Array(length);
  for (let index = 0; index < length; index += 1) output[index] = __velarBinaryFloat32Value(value[index]);
  return output;
}
function __velarUInt8Index(value, index) {
  return value[__velarBinaryCheckedIndex(value, index, "Uint8Array", "UInt8Buffer")];
}
function __velarUInt8SetIndex(value, index, next) {
  index = __velarBinaryCheckedIndex(value, index, "Uint8Array", "UInt8Buffer");
  value[index] = __velarBinaryIntegerValue(next, 0, 255, "UInt8Buffer");
  return next;
}
function __velarUInt16Index(value, index) {
  return value[__velarBinaryCheckedIndex(value, index, "Uint16Array", "UInt16Buffer")];
}
function __velarUInt16SetIndex(value, index, next) {
  index = __velarBinaryCheckedIndex(value, index, "Uint16Array", "UInt16Buffer");
  value[index] = __velarBinaryIntegerValue(next, 0, 65535, "UInt16Buffer");
  return next;
}
function __velarUInt32Index(value, index) {
  return value[__velarBinaryCheckedIndex(value, index, "Uint32Array", "UInt32Buffer")];
}
function __velarUInt32SetIndex(value, index, next) {
  index = __velarBinaryCheckedIndex(value, index, "Uint32Array", "UInt32Buffer");
  value[index] = __velarBinaryIntegerValue(next, 0, 4294967295, "UInt32Buffer");
  return next;
}
function __velarFloat32Index(value, index) {
  return value[__velarBinaryCheckedIndex(value, index, "Float32Array", "Float32Buffer")];
}
function __velarFloat32SetIndex(value, index, next) {
  index = __velarBinaryCheckedIndex(value, index, "Float32Array", "Float32Buffer");
  value[index] = __velarBinaryFloat32Value(next);
  return next;
}
function __velarBufferCopy(value) {
  return __velarBufferSlice(value, 0, __velarBinarySize(value));
}
function __velarBufferValues(value) {
  const spec = __velarBinarySpec(value);
  const length = __velarBinarySize(value);
  if (length > 1e6) throw new __velarBinaryNativeRangeError(spec.name + ".values cannot produce more than 1000000 List items");
  const output = new __velarBinaryNativeArray(length);
  for (let index = 0; index < length; index += 1) output[index] = value[index];
  return output;
}
function __velarBufferSlice(value, start = 0, end = __velarBinarySize(value)) {
  const spec = __velarBinarySpec(value);
  const length = __velarBinarySize(value);
  if (!__velarBinaryCall(__velarBinaryNumberIsSafeInteger, __velarBinaryNativeNumber, [start]) || !__velarBinaryCall(__velarBinaryNumberIsSafeInteger, __velarBinaryNativeNumber, [end]) || start < 0 || end < start || end > length) {
    throw new __velarBinaryNativeRangeError(spec.name + ".slice requires 0 <= start <= end <= size");
  }
  const output = new spec.Constructor(end - start);
  for (let index = start; index < end; index += 1) output[index - start] = value[index];
  return output;
}
function __velarBufferToBytes(value, order = null) {
  const spec = __velarBinarySpec(value);
  const length = __velarBinarySize(value);
  if (spec.bytes === 1) return __velarBinarySnapshot(value, "Uint8Array", __velarBinaryNativeUint8Array, "UInt8Buffer.toBytes");
  order = __velarBinaryOrder(order);
  const output = new __velarBinaryNativeUint8Array(length * spec.bytes);
  const view = new __velarBinaryNativeDataView(output.buffer);
  const operation = spec.name === "UInt16Buffer" ? "setUint16" : spec.name === "UInt32Buffer" ? "setUint32" : "setFloat32";
  const setter = __velarBinaryGetOwnPropertyDescriptor(__velarBinaryNativeDataView.prototype, operation)?.value;
  if (typeof setter !== "function") throw new __velarBinaryNativeTypeError("DataView " + operation + " is unavailable");
  for (let index = 0; index < length; index += 1) {
    __velarBinaryCall(setter, view, [index * spec.bytes, value[index], order === "little"]);
  }
  return output;
}
var __velarBinaryBuilders = new __velarBinaryNativeWeakMap();
var __velarBinaryBuilderPrototype = __velarBinaryFreeze({
  get size() {
    const state = __velarBinaryBuilders.get(this);
    if (!state) throw new __velarBinaryNativeTypeError("Builder size requires a binary builder");
    return state.size;
  },
  get maxElements() {
    const state = __velarBinaryBuilders.get(this);
    if (!state) throw new __velarBinaryNativeTypeError("Builder maxElements requires a binary builder");
    return state.maximum;
  },
  push(value) {
    const state = __velarBinaryBuilders.get(this);
    if (!state || state.finished) throw new __velarBinaryNativeTypeError("Binary builder is finished");
    if (state.size >= state.maximum) throw new __velarBinaryNativeRangeError(state.spec.name + " builder exceeds maxElements");
    if (state.size === state.storage.length) {
      let capacity = state.storage.length * 2;
      if (capacity < 8) capacity = 8;
      if (capacity > state.maximum) capacity = state.maximum;
      const storage = new state.spec.Constructor(capacity);
      __velarBinaryCall(__velarBinaryTypedArraySet, storage, [state.storage]);
      state.storage = storage;
    }
    state.storage[state.size] = __velarBinaryValue(state.spec, value);
    state.size += 1;
    return null;
  },
  finish() {
    const state = __velarBinaryBuilders.get(this);
    if (!state || state.finished) throw new __velarBinaryNativeTypeError("Binary builder is finished");
    const output = new state.spec.Constructor(state.size);
    for (let index = 0; index < state.size; index += 1) output[index] = state.storage[index];
    state.finished = true;
    state.storage = null;
    return output;
  }
});
function __velarBinaryBuilderType(name, Constructor) {
  return __velarRegisterRuntimeType(__velarBinaryFreeze({ is(value) {
    const state = __velarBinaryBuilders.get(value);
    return !!state && state.spec.Constructor === Constructor && !state.finished;
  }, parse(value) {
    if (!this.is(value)) throw new __velarBinaryNativeTypeError("Value does not match " + name);
    return value;
  } }));
}
var UInt32Builder = __velarBinaryBuilderType("UInt32Builder", __velarBinaryNativeUint32Array);
var Float32Builder = __velarBinaryBuilderType("Float32Builder", __velarBinaryNativeFloat32Array);

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
function __velarNumberCeil(value) {
  return __velarNumberCall(__velarNumberMathCeil, __velarNumberNativeMath, [__velarNumberValue(value)]);
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
import { Gunzip, Unzlib, gzipSync, zlibSync } from "fflate";
import * as __velarExternModule521 from "fflate";

// velar-embedded:src/index.2ibbmz.embedded-1.js
function sliceBytes(value, start, end) {
  return value.subarray(start, end);
}
function joinBytes(chunks, size) {
  const output = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return output;
}

// src/src/index.vel
function __velarExternExport(namespace, name, source) {
  const value = namespace[name];
  if (value === void 0 && !(name in namespace)) {
    throw new TypeError(name === "default" ? `Extern module '${source}' declares 'default', but the JavaScript module has no default export; declare the module's real named exports instead` : `Extern module '${source}' declares '${name}', but the JavaScript module has no such export; prototype methods and instance members belong on a declared class or singleton const, not module exports`);
  }
  return value;
}
__velarExternExport(__velarExternModule521, "Gunzip", "fflate");
__velarExternExport(__velarExternModule521, "Unzlib", "fflate");
__velarExternExport(__velarExternModule521, "gzipSync", "fflate");
__velarExternExport(__velarExternModule521, "zlibSync", "fflate");
function checkedLevel(value) {
  if (!(__velarNumberIsInteger(value) && value >= 0 && value <= 9)) {
    throw new __VelarAssertionError("Compression level must be an integer from 0 through 9");
  }
  return value;
}
function checkedLimit(value) {
  if (!(__velarNumberIsInteger(value) && value >= 1 && value <= 64 * 1024 * 1024)) {
    throw new __VelarAssertionError("Decompression maxBytes must be an integer from 1 through 67108864");
  }
  return value;
}
function inputChunk(source, start, end) {
  return Bytes.parse(sliceBytes(__velarHostRaw(source), __velarHostRaw(start), __velarHostRaw(end)) ?? null);
}
function inputChunkSize(maximum) {
  const estimated = __velarNumberCeil(maximum / 1032);
  return estimated < 256 ? 256 : estimated > 65536 ? 65536 : estimated;
}
function productiveInput(consumed, produced) {
  return consumed <= 1024 * 1024 + produced * 64;
}
function feedStream(value, maximum, push) {
  if (Bytes.__velarSize(value) === 0) {
    push(value, true);
  } else {
    const inputBytes = inputChunkSize(maximum);
    let offset = 0;
    while (offset < Bytes.__velarSize(value)) {
      const end = offset + inputBytes < Bytes.__velarSize(value) ? offset + inputBytes : Bytes.__velarSize(value);
      const produced = push(inputChunk(value, offset, end), end >= Bytes.__velarSize(value));
      offset = end;
      if (!productiveInput(offset, produced)) {
        throw new __VelarAssertionError("Decompression consumed too much input for the output it produced");
      }
    }
  }
  return null;
}
function joined(chunks, size) {
  return Bytes.parse(joinBytes(__velarHostRaw(chunks), __velarHostRaw(size)) ?? null);
}
function deflate(value, level = 6) {
  return Bytes.parse(zlibSync(__velarHostRaw(value), __velarHostRaw({ level: checkedLevel(level) })) ?? null);
}
function inflate(value, maxBytes = 67108864) {
  const maximum = checkedLimit(maxBytes);
  let chunks = __velarAdoptList([]);
  let size = 0;
  function consume(chunk, final) {
    size += Bytes.__velarSize(chunk);
    if (!(size <= maximum)) {
      throw new __VelarAssertionError("Decompressed output exceeds maxBytes");
    }
    __velarListAppend(chunks, chunk);
    return null;
  }
  const stream = new Unzlib(__velarHostRaw(consume));
  function push(chunk, final) {
    stream.push(__velarHostRaw(chunk), __velarHostRaw(final));
    return size;
  }
  feedStream(value, maximum, push);
  return joined(chunks, size);
}
function gzip(value, level = 6) {
  return Bytes.parse(gzipSync(__velarHostRaw(value), __velarHostRaw({ level: checkedLevel(level) })) ?? null);
}
function gunzip(value, maxBytes = 67108864) {
  const maximum = checkedLimit(maxBytes);
  let chunks = __velarAdoptList([]);
  let size = 0;
  function consume(chunk, final) {
    size += Bytes.__velarSize(chunk);
    if (!(size <= maximum)) {
      throw new __VelarAssertionError("Decompressed output exceeds maxBytes");
    }
    __velarListAppend(chunks, chunk);
    return null;
  }
  const stream = new Gunzip(__velarHostRaw(consume));
  function push(chunk, final) {
    stream.push(__velarHostRaw(chunk), __velarHostRaw(final));
    return size;
  }
  feedStream(value, maximum, push);
  return joined(chunks, size);
}
export {
  deflate,
  gunzip,
  gzip,
  inflate
};
