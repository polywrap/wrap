import { Abi } from "../abi-0.2";

// Map values are always required

const abi: Abi = {
  version: "0.2",
  functions: [
    {
      kind: "Function",
      name: "mapMethod",
      args: [
        {
          kind: "Argument",
          name: "map",
          type: {
            kind: "Map",
            key: {
              kind: "Scalar",
              scalar: "String"
            },
            required: true,
            value: {
              kind: "Scalar",
              scalar: "Int",
            }
          },
          required: false,
        }
      ],
      result: {
        kind: "Result",
        type: {
          kind: "Map",
          key: {
            kind: "Scalar",
            scalar: "String"
          },
          required: true,
          value: {
            kind: "Scalar",
            scalar: "Int",
          }
        },
        required: false,
      }
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "CustomType",
      props: [
        {
          kind: "Property",
          required: true,
          name: "map",
          type: {
            kind: "Map",
            key: {
              kind: "Scalar",
              scalar: "String",
            },
            required: false,
            value: {  
              kind: "Scalar",
              scalar: "Int",
            }
          }
        },
        {
          kind: "Property",
          required: true,
          name: "mapOfArr",
          type: {
            kind: "Map",
            key: {
              kind: "Scalar",
              scalar: "String",
            },
            required: true,
            value: {
              kind: "Array",
              required: true,
              item: {
                kind: "Scalar",
                scalar: "Int"
              },
            }
          }
        },
        {
          kind: "Property",
          required: true,
          name: "mapOfObj",
          type: {
            kind: "Map",
            key: {
              kind: "Scalar",
              scalar: "String",
            },
            required: true,
            value: {
              kind: "Ref",
              ref_kind: "Object",
              ref_name: "AnotherType"
            }
          }
        },
        {
          kind: "Property",
          required: true,
          name: "mapOfArrOfObj",
          type: {
            kind: "Map",
            key: {
              kind: "Scalar",
              scalar: "String",
            },
            required: true,
            value: {
              kind: "Array",
              required: true,
              item: {
                kind: "Ref",
                ref_kind: "Object",
                ref_name: "AnotherType"
              }
            }
          }
        }
      ]
    },
    {
      kind: "Object",
      name: "AnotherType",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: false,
          type: {
            kind: "Scalar",
            scalar: "String"
          }
        }
      ]
    }
  ]
};
