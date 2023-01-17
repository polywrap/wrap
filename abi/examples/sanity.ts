import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  functions: {
    func1: {
      kind: "Function",
      args: {
        arg: {
          kind: "Argument",
          type: {
            kind: "Scalar",
            scalar: "Bytes"
          },
          required: true
        }
      },
      result: {
        kind: "Result",
        type: {
          kind: "Scalar",
          scalar: "UInt32",
        },
        required: true
      }
    },
    func2: {
      kind: "Function",
      args: {
        "custom": {
          kind: "Argument",
          type: {
            kind: "Ref",
            ref_name: "Custom",
            ref_kind: "Object"
          },
          required: true
        }
      },
      result: {
        kind: "Result",
        type: {
          kind: "Scalar",
          scalar: "Int32"
        },
        required: false
      }
    }
  },
  objects: {
    Custom: {
      kind: "Object",
      props: {
        prop1: {
          kind: "Property",
          type: {
            kind: "Scalar",
            scalar: "String"
          },
          required: true
        },
        nested: {
          kind: "Property",
          type: {
            kind: "Ref",
            ref_name: "Nested",
            ref_kind: "Object"
          },
          required: false
        }
      }
    },
    Nested: {
      kind: "Object",
      props: {
        prop: {
          kind: "Property",
          type: {
            kind: "Scalar",
            scalar: "UInt8"
          },
          required: false
        },
        importedObj: {
          kind: "Property",
          type: {
            kind: "Ref",
            ref_kind: "Object",
            ref_name: "Namespace_Object"
          },
          required: true
        }
      }
    }
  }
};
