/// ABIs

export interface AbiDefs {
  aliases?: AliasDef[];
  templates?: CustomTemplateDef[];
  functions?: FunctionDef[];
  objects?: ObjectDef[];
  enums?: EnumDef[];
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

export type UniqueDefKind =
  | "Function"
  | "Object"
  | "Enum"

export type DefKind =
  | UniqueDefKind
  | "Alias"
  | "CustomTemplate"
  | "Argument"
  | "Result"
  | "Property";

export interface Def {
  kind: DefKind;
}

export interface NamedDef extends Def {
  name: string;
}

export interface InlinedTypeDef extends Def, OptionalType { }

export interface NamedTypeDef extends NamedDef, InlinedTypeDef { }

export interface FunctionDef extends NamedDef {
  kind: "Function";
  args: ArgumentDef[];
  result: ResultDef;
}

export interface ArgumentDef extends NamedTypeDef {
  kind: "Argument";
}

export interface ResultDef extends InlinedTypeDef {
  kind: "Result";
}

export interface ObjectDef extends NamedDef {
  kind: "Object";
  props: PropertyDef[];
}

export interface PropertyDef extends NamedTypeDef {
  kind: "Property";
}

export interface EnumDef extends NamedDef {
  kind: "Enum";
  constants: string[];
}

export interface AliasDef extends NamedDef {
  kind: "Alias";
  name: string;
  types: (BaseUnion | ScalarType)[]
}

export interface CustomTemplateDef extends NamedDef {
  kind: "CustomTemplate"
  id: string;
  name: string;
  types: (BaseUnion | CompoundUnion | AliasRef | ScalarType)[];
}

/// Types (built-ins)

export type AnyType =
  | ScalarType
  | ArrayType
  | CustomType
  | RefType
  | ImportRefType;

export type TypeKind =
  | "AliasRef"
  | "Scalar"
  | "Array"
  | "Custom"
  | "Ref"
  | "ImportRef";

export interface Type {
  kind: TypeKind;
}

export interface CustomTypeMember extends OptionalType {
  type: CustomTypeMemberTypes
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

export interface CustomType extends Type {
  kind: "Custom"
  template_id: string;
  types: CustomTypeMember[]
}

export interface RefType<T extends UniqueDefKind = UniqueDefKind> extends Type {
  kind: "Ref";
  ref_kind: T;
  ref_name: string;
}

export interface ImportRefType extends Type {
  kind: "ImportRef";
  import_id: string;
  ref_kind: UniqueDefKind;
  ref_name: string;
}

export interface AliasRef extends Type {
  kind: "AliasRef";
  name: string;
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
};
export type ScalarTypeSet = typeof scalarTypeSet;
export type ScalarTypeName = keyof ScalarTypeSet;

export const anyTypeSet = {
  ...scalarTypeSet,
  Array: "Array<Any>",
  Enum: "Enum",
  Object: "Object",
};

export type AnyTypeSet = typeof anyTypeSet;
export type AnyTypeName = keyof AnyTypeSet;

type CustomTypeMemberTypes = ArrayType | RefType<"Enum"> | RefType<"Object"> | ScalarType;

export interface TypeUnion {
  kind: "BaseUnion" | "CompoundUnion" | "Alias";
}

export interface BaseUnion extends TypeUnion {
  kind: "BaseUnion";
  members: (BaseUnion | ScalarType | AliasRef)[];
}

export interface CompoundUnion extends TypeUnion {
  kind: "CompoundUnion";
  members: (Exclude<CustomTypeMemberTypes, "ScalarType"> | BaseUnion | AliasRef | CompoundUnion)[] | (CustomTypeMemberTypes | AliasRef)[];
}