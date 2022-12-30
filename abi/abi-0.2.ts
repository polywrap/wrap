/// ABIs

export interface Abi extends AbiDefs {
  version: "0.2";
  imports?: ImportedAbi[];
}

interface ImportedAbi extends AbiDefs {
  namespace: string;
  uri: string;
}

interface AbiDefs {
  methods?: MethodDef[];
  objects?: ObjectDef[];
  enums?: EnumDef[];
  env?: EnvDef;
}

/// Definitions (user-defined)

type AnyDef =
  | MethodDef
  | ArgumentDef
  | ResultDef
  | ObjectDef
  | PropertyDef
  | EnumDef
  | EnvDef;

type DefKind =
  | "Method"
  | "Argument"
  | "Result"
  | "Object"
  | "Property"
  | "Enum"
  | "Env";

interface Def {
  kind: DefKind;
}

interface NamedDef extends Def {
  name: string;
  comment?: string;
}

interface TypeDef extends Def {
  required: boolean;
  type: AnyType;
}

interface NamedTypeDef extends NamedDef, TypeDef { }

interface MethodDef extends NamedDef {
  kind: "Method";
  args: ArgumentDef[];
  result: ResultDef;
}

interface ArgumentDef extends NamedTypeDef {
  kind: "Argument";
}

interface ResultDef extends TypeDef {
  kind: "Result";
}

interface ObjectDef extends NamedDef {
  kind: "Object";
  props: PropertyDef[];
}

interface PropertyDef extends NamedTypeDef {
  kind: "Property";
}

interface EnumDef extends NamedDef {
  kind: "Enum";
  constants: string[];
}

interface EnvDef extends NamedDef {
  kind: "Env";
  name: "Env";
  props: PropertyDef[];
}

/// Types (built-ins)

type AnyType =
  | ScalarType
  | ArrayType
  | MapType
  | RefType;

type TypeKind =
  | "Scalar"
  | "Array"
  | "Map"
  | "Ref";

interface Type {
  kind: TypeKind;
}

interface ScalarType<
  TScalarTypeName extends ScalarTypeName = ScalarTypeName
> extends Type {
  kind: "Scalar";
  scalar: TScalarTypeName;
}

interface ArrayType extends Type {
  kind: "Array";
  item: AnyType;
}

interface MapType extends Type {
  kind: "Map";
  key: ScalarType<MapKeyTypeName>;
  value: AnyType;
}

interface RefType extends Type {
  kind: "Ref";
  ref: string;
}

/// Constants

const scalarTypeSet = {
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
type ScalarTypeSet = typeof scalarTypeSet;

type ScalarTypeName = keyof ScalarTypeSet;

const mapKeyTypeSet = {
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
type MapKeyTypeSet = typeof mapKeyTypeSet;

type MapKeyTypeName = keyof MapKeyTypeSet;
