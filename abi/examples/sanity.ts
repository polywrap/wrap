import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  functions: [
    {
      kind: "Function",
      name: "func1",
      args: [
        {
          kind: "Argument",
          name: "arg",
          type: {
            kind: "Scalar",
            scalar: "Bytes"
          },
          required: true
        }
      ],
      result: {
        kind: "Result",
        type: {
          kind: "Scalar",
          scalar: "UInt32",
        },
        required: true
      }
    },
    {
      kind: "Function",
      name: "func2",
      args: [
        {
          kind: "Argument",
          name: "custom",
          type: {
            kind: "Ref",
            ref_name: "Custom",
            ref_kind: "Object"
          },
          required: true
        }
      ],
      result: {
        kind: "Result",
        type: {
          kind: "Scalar",
          scalar: "Int32"
        },
        required: false
      }
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "Custom",
      props: [
        {
          kind: "Property",
          name: "prop1",
          type: {
            kind: "Scalar",
            scalar: "String"
          },
          required: true
        },
        {
          kind: "Property",
          name: "nested",
          type: {
            kind: "Ref",
            ref_name: "Nested",
            ref_kind: "Object"
          },
          required: false
        }
      ]
    },
    {
      kind: "Object",
      name: "Nested",
      props: [
        {
          kind: "Property",
          name: "prop",
          type: {
            kind: "Scalar",
            scalar: "UInt8"
          },
          required: false
        },
      ]
    }
  ]
};
