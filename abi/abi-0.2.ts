/// ABIs

export interface AbiDefs {
  functions?: Map<string, FunctionDef>;
  objects?: Map<string, ObjectDef>;
  enums?: Map<string, EnumDef>;
  env?: EnvDef;
}

export interface Abi extends AbiDefs {
  version: "0.2";
  imports?: ImportedAbi[];
}

export type ImportAbiType =
  | "wasm"
  | "interface";

export interface ImportedAbi extends AbiDefs {
  id: string;
  uri: string;
  type: ImportAbiType;
  namespace: string;
  imports?: ImportedAbi[];
}

/// Definitions (user-defined)

export type AnyDef =
  | FunctionDef
  | ArgumentDef
  | ResultDef
  | ObjectDef
  | PropertyDef
  | EnumDef
  | EnvDef;

export type UniqueDefKind =
  | "Function"
  | "Object"
  | "Enum"
  | "Env";

export type DefKind =
  | UniqueDefKind
  | "Argument"
  | "Result"
  | "Property";

export interface Def {
  kind: DefKind;
}

export interface NamedDef extends Def {
  name: string;
}

export interface TypeDef extends Def, OptionalType { }

export interface FunctionDef extends Def {
  kind: "Function";
  args: Map<string, ArgumentDef>;
  result: ResultDef;
}

export interface ArgumentDef extends TypeDef {
  kind: "Argument";
}

export interface ResultDef extends TypeDef {
  kind: "Result";
}

export interface ObjectDef extends Def {
  kind: "Object";
  props: Map<string, PropertyDef>;
}

export interface PropertyDef extends TypeDef {
  kind: "Property";
}

export interface EnumDef extends Def {
  kind: "Enum";
  constants: string[];
}

export interface EnvDef extends Def {
  kind: "Env";
  props: Map<string, PropertyDef>;
}

/// Types (built-ins)

export type AnyType =
  | ScalarType
  | ArrayType
  | MapType
  | RefType
  | ImportRefType;

export type TypeKind =
  | "Scalar"
  | "Array"
  | "Map"
  | "Ref"
  | "ImportRef";

export interface Type {
  kind: TypeKind;
}

export interface ScalarType<
  TScalarTypeName extends ScalarTypeName = ScalarTypeName
> extends Type {
  kind: "Scalar";
  scalar: TScalarTypeName;
}

export interface ArrayType extends Type {
  kind: "Array";
  item: OptionalType;
}

export interface MapType extends Type {
  kind: "Map";
  key: ScalarType<MapKeyTypeName>;
  value: OptionalType;
}

export interface RefType extends Type {
  kind: "Ref";
  ref_kind: UniqueDefKind;
  ref_name: string;
}

export interface ImportRefType extends Type {
  kind: "ImportRef";
  import_id: string;
  ref_kind: UniqueDefKind;
  ref_name: string;
}

export interface OptionalType {
  required: boolean;
  type: AnyType;
}

/// Constants

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
  // TODO: remove complex types
  BigInt: "BigInt",
  BigNumber: "BigNumber",
  JSON: "JSON",
};
export type ScalarTypeSet = typeof scalarTypeSet;

export type ScalarTypeName = keyof ScalarTypeSet;

export const mapKeyTypeSet = {
  UInt: "UInt",
  UInt8: "UInt8",
  UInt16: "UInt16",
  UInt32: "UInt32",
  Int: "Int",
  Int8: "Int8",
  Int16: "Int16",
  Int32: "Int32",
  String: "String",
};
export type MapKeyTypeSet = typeof mapKeyTypeSet;

export type MapKeyTypeName = keyof MapKeyTypeSet;
