type ScalarUnion = ScalarTypeName[]
type MapKeyUnion = [
  "UInt",
  "UInt8",
  "UInt16",
  "UInt32",
  "Int",
  "Int8",
  "Int16",
  "Int32",
  "String"
]
type CustomArray<T extends AnyUnion = AnyUnion> = {
  items: RecursiveArrayUnion<T>
}
type CustomMap<TKey extends MapKeyUnion = MapKeyUnion, TValue extends AnyUnion = AnyUnion> = {
  key: RecursiveArrayUnion<TKey>,
  value: RecursiveArrayUnion<TValue>
}

type AnyUnion = (CustomArray | CustomMap | ScalarUnion)[] | ScalarUnion;
type Union<T> = T[keyof T];
type RecursiveArrayUnion<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
  ? UnionOfArray<U>
  : T[K];
}

type UnionOfArray<T> = T extends any
  ? T extends Array<infer U>
  ? Union<U>
  : T
  : never;

// Example

type CustomType<T extends AnyUnion> = 
{
  types: RecursiveArrayUnion<T>
}

type Counter = CustomType<[
  [
    "UInt",
    "UInt8",
    "UInt16",
    "UInt32",
  ],
  CustomArray<[["UInt", "Int"]]>,
]>

interface ParticularCounter extends Counter {
  types: ["UInt32", { items: ["Int"] }]
}

export const scalarTypeSet = {
  UInt: "UInt",
  UInt8: "UInt8",
  UInt16: "UInt16",
  UInt32: "UInt32",
  Int: "Int",
  Int8: "Int8",
  Int16: "Int16",
  Int32: "Int32",
  String: "String",
  Boolean: "Boolean",
  Bytes: "Bytes",
  BigInt: "BigInt",
  BigNumber: "BigNumber",
  JSON: "JSON",
};

export type ScalarTypeName = keyof typeof scalarTypeSet;
