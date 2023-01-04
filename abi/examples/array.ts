import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  objects: [
    {
      kind: "Object",
      name: "CustomType",
      props: [
        {
          kind: "Property",
          required: true,
          name: "uArray",
          type: {
            kind: "Array",
            required: true,
            item: {
              kind: "Scalar",
              scalar: "UInt"
            }
          }
        },
        {
          kind: "Property",
          required: false,
          name: "uOptArray",
          type: {
            kind: "Array",
            required: true,
            item: {
              kind: "Scalar",
              scalar: "UInt"
            }
          }
        },
        {
          kind: "Property",
          required: true,
          name: "uArray",
          type: {
            kind: "Array",
            required: true,
            item: {
              kind: "Scalar",
              scalar: "UInt"
            }
          }
        },
        {
          kind: "Property",
          required: true,
          name: "uOptArrayOptArray",
          type: {
            kind: "Array",
            required: false,
            item: {
              kind: "Array",
              required: false,
              item: {
                kind: "Scalar",
                scalar: "UInt32"
              }
            }
          }
        },
        {
          kind: "Property",
          required: true,
          name: "uArrayOptArrayArray",
          type: {
            kind: "Array",
            required: false,
            item: {
              kind: "Array",
              required: true,
              item: {
                kind: "Array",
                required: true,
                item: {
                  kind: "Scalar",
                  scalar: "UInt32"
                }
              }
            }
          }
        },
        {
          kind: "Property",
          required: false,
          name: "crazyArray",
          type: {
            kind: "Array",
            required: false,
            item: {
              kind: "Array",
              required: true,
              item: {
                kind: "Array",
                required: false,
                item: {
                  kind: "Array",
                  required: true,
                  item: {
                    kind: "Scalar",
                    scalar: "UInt32"
                  }
                }
              }
            }
          }
        }
      ]
    }
  ]
};
