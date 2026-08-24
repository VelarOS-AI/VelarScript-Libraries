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
function __velarCollectionListGetOwnPropertyDescriptor(value, key) {
  return __velarCollectionHostCall(__velarCollectionGetOwnPropertyDescriptor, __velarCollectionNativeObject, [value, key]);
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
function __velarHostRaw(value) {
  return value;
}

// velar-standard:velar/compiler-runtime-collection-lowering-v1
var __velarListNativeWeakMap = globalThis.WeakMap;
var __velarListWeakMapPrototype = __velarCollectionListGetOwnPropertyDescriptor(__velarListNativeWeakMap, "prototype")?.value;
var __velarListWeakMapGetOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListWeakMapPrototype, "get")?.value;
var __velarListWeakMapSetOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarListWeakMapPrototype, "set")?.value;
var __velarListMemos = new __velarListNativeWeakMap();
var __velarListIsFrozenOperation = __velarCollectionListGetOwnPropertyDescriptor(__velarCollectionNativeObject, "isFrozen")?.value;
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
if (typeof __velarBinaryApply !== "function" || typeof __velarBinaryNumberIsInteger !== "function" || typeof __velarBinaryNumberIsSafeInteger !== "function" || typeof __velarBinaryTypedArrayTag !== "function" || typeof __velarBinaryNumberIsFinite !== "function" || typeof __velarBinaryTypedArrayLength !== "function" || typeof __velarBinaryTypedArraySet !== "function" || typeof __velarBinaryNativeDataView !== "function" || typeof __velarBinaryNativeWeakMap !== "function") {
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
import { pack, unpack } from "msgpackr";
import * as __velarExternModule157 from "msgpackr";

// velar-embedded:src/index.2ibbmz.embedded-1.js
function unsupportedTag(value, maxDepth) {
  if (value === null || typeof value !== "object" || ArrayBuffer.isView(value)) return "";
  if (maxDepth <= 0) return "depth";
  if (value instanceof Map) return "map";
  if (value instanceof Set) return "set";
  if (Array.isArray(value)) {
    for (const item of value) {
      const tag = unsupportedTag(item, maxDepth - 1);
      if (tag !== "") return tag;
    }
    return "";
  }
  for (const key of Object.keys(value)) {
    if (key === "__proto__") return "proto";
    const tag = unsupportedTag(value[key], maxDepth - 1);
    if (tag !== "") return tag;
  }
  return "";
}
function uintAt(bytes, offset, width) {
  let result = 0;
  for (let index = 0; index < width; index++) result = result * 256 + bytes[offset + index];
  return result;
}
var readableExtensions = [0, 255];
function nestingTag(bytes, maxDepth) {
  const size = bytes.length;
  const counts = [];
  let depth = 0;
  let offset = 0;
  for (; ; ) {
    if (offset >= size) return "truncated";
    const tag = bytes[offset];
    let children = 0;
    let width = 1;
    let extensionAt = -1;
    if (tag <= 127 || tag >= 224 || tag === 192 || tag === 194 || tag === 195) width = 1;
    else if (tag <= 143) children = (tag - 128) * 2;
    else if (tag <= 159) children = tag - 144;
    else if (tag <= 191) width = 1 + (tag - 160);
    else switch (tag) {
      case 193:
        return "reserved";
      case 204:
      case 208:
        width = 2;
        break;
      case 205:
      case 209:
        width = 3;
        break;
      case 202:
      case 206:
      case 210:
        width = 5;
        break;
      case 203:
      case 207:
      case 211:
        width = 9;
        break;
      case 212:
        width = 3;
        extensionAt = offset + 1;
        break;
      case 213:
        width = 4;
        extensionAt = offset + 1;
        break;
      case 214:
        width = 6;
        extensionAt = offset + 1;
        break;
      case 215:
        width = 10;
        extensionAt = offset + 1;
        break;
      case 216:
        width = 18;
        extensionAt = offset + 1;
        break;
      case 196:
      case 217:
        if (offset + 2 > size) return "truncated";
        width = 2 + uintAt(bytes, offset + 1, 1);
        break;
      case 197:
      case 218:
        if (offset + 3 > size) return "truncated";
        width = 3 + uintAt(bytes, offset + 1, 2);
        break;
      case 198:
      case 219:
        if (offset + 5 > size) return "truncated";
        width = 5 + uintAt(bytes, offset + 1, 4);
        break;
      case 199:
        if (offset + 2 > size) return "truncated";
        width = 3 + uintAt(bytes, offset + 1, 1);
        extensionAt = offset + 2;
        break;
      case 200:
        if (offset + 3 > size) return "truncated";
        width = 4 + uintAt(bytes, offset + 1, 2);
        extensionAt = offset + 3;
        break;
      case 201:
        if (offset + 5 > size) return "truncated";
        width = 6 + uintAt(bytes, offset + 1, 4);
        extensionAt = offset + 5;
        break;
      case 220:
        if (offset + 3 > size) return "truncated";
        children = uintAt(bytes, offset + 1, 2);
        width = 3;
        break;
      case 221:
        if (offset + 5 > size) return "truncated";
        children = uintAt(bytes, offset + 1, 4);
        width = 5;
        break;
      case 222:
        if (offset + 3 > size) return "truncated";
        children = uintAt(bytes, offset + 1, 2) * 2;
        width = 3;
        break;
      default:
        if (offset + 5 > size) return "truncated";
        children = uintAt(bytes, offset + 1, 4) * 2;
        width = 5;
        break;
    }
    offset += width;
    if (offset > size) return "truncated";
    if (extensionAt >= 0 && !readableExtensions.includes(bytes[extensionAt])) return "extension";
    if (children > 0) {
      counts[depth] = children;
      depth += 1;
      if (depth > maxDepth) return "depth";
    } else {
      while (depth > 0 && (counts[depth - 1] -= 1) === 0) depth -= 1;
      if (depth === 0) return offset === size ? "" : "trailing";
    }
  }
}

// src/src/index.vel
function __velarExternExport(namespace, name, source) {
  const value = namespace[name];
  if (value === void 0 && !(name in namespace)) {
    throw new TypeError(name === "default" ? `Extern module '${source}' declares 'default', but the JavaScript module has no default export; declare the module's real named exports instead` : `Extern module '${source}' declares '${name}', but the JavaScript module has no such export; prototype methods and instance members belong on a declared class or singleton const, not module exports`);
  }
  return value;
}
__velarExternExport(__velarExternModule157, "pack", "msgpackr");
__velarExternExport(__velarExternModule157, "unpack", "msgpackr");
var maximumNesting = 512;
function checkedValue(value) {
  const tag = unsupportedTag(__velarHostRaw(value ?? null), __velarHostRaw(maximumNesting));
  if (!(tag !== "map")) {
    throw new __VelarAssertionError("MessagePack cannot encode a Map; convert it to a record or to a List of entries");
  }
  if (!(tag !== "set")) {
    throw new __VelarAssertionError("MessagePack cannot encode a Set; convert it to a List");
  }
  if (!(tag !== "proto")) {
    throw new __VelarAssertionError("MessagePack cannot encode a record key named __proto__");
  }
  if (!(tag !== "depth")) {
    throw new __VelarAssertionError(`MessagePack values cannot nest deeper than ${maximumNesting} levels`);
  }
  return value ?? null;
}
function checkedNesting(value) {
  const tag = nestingTag(__velarHostRaw(value), __velarHostRaw(maximumNesting));
  if (!(tag !== "depth")) {
    throw new __VelarAssertionError(`MessagePack input cannot nest deeper than ${maximumNesting} levels`);
  }
  if (!(tag !== "truncated")) {
    throw new __VelarAssertionError("MessagePack input ends inside a value");
  }
  if (!(tag !== "trailing")) {
    throw new __VelarAssertionError("MessagePack input carries bytes after the document");
  }
  if (!(tag !== "reserved")) {
    throw new __VelarAssertionError("MessagePack input uses the reserved type byte 0xC1");
  }
  if (!(tag !== "extension")) {
    throw new __VelarAssertionError("MessagePack input uses an extension type the adapter does not decode");
  }
  return value;
}
function encode(value) {
  const output = Bytes.parse(pack(__velarHostRaw(checkedValue(value ?? null) ?? null)) ?? null);
  if (!(Bytes.__velarSize(output) <= 64 * 1024 * 1024)) {
    throw new __VelarAssertionError("MessagePack output cannot exceed 64 MiB");
  }
  return output;
}
function decode(value) {
  if (!(Bytes.__velarSize(value) <= 64 * 1024 * 1024)) {
    throw new __VelarAssertionError("MessagePack input cannot exceed 64 MiB");
  }
  return unpack(__velarHostRaw(checkedNesting(value))) ?? null;
}
function parse(value, target) {
  return target.parse(decode(value) ?? null);
}
export {
  decode,
  encode,
  parse
};
