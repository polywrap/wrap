import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  imports: [
    {
      namespace: "External",
      uri: "wrap://ens/external.eth",
      type: "wasm",
      id: "1",
      functions: [
        {
          kind: "Function",
          name: "func",
          args: [
            {
              kind: "Argument",
              name: "arg",
              required: true,
              type: {
                kind: "Scalar",
                scalar: "Int"
              }
            }
          ],
          result: {
            kind: "Result",
            required: true,
            type: {
              kind: "Scalar",
              scalar: "Int"
            }
          }
        }
      ],
      objects: [
        {
          kind: "Object",
          name: "Foo",
          props: [
            {
              kind: "Property",
              name: "propA",
              required: true,
              type: {
                kind: "Scalar",
                scalar: "Int"
              }
            }
          ]
        }
      ]
    }
  ],
  functions: [
    {
      kind: "Function",
      name: "func",
      args: [
        {
          kind: "Argument",
          name: "arg",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "Int"
          }
        }
      ],
      result: {
        kind: "Result",
        required: true,
        type: {
          kind: "Scalar",
          scalar: "Int"
        }
      }
    },
    {
      kind: "Function",
      name: "exec",
      args: [
        {
          kind: "Argument",
          name: "arg",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "String"
          }
        }
      ],
      result: {
        kind: "Result",
        required: true,
        type: {
          kind: "Scalar",
          scalar: "String"
        }
      }
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "Bar",
      props: [
        {
          kind: "Property",
          name: "propA",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "Int"
          }
        },
        {
          kind: "Property",
          name: "propB",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "String"
          }
        }
      ]
    },
    {
      kind: "Object",
      name: "Baz",
      props: [
        {
          kind: "Property",
          name: "propA",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "Int"
          }
        },
        {
          kind: "Property",
          name: "propB",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "String"
          }
        },
        {
          kind: "Property",
          name: "propC",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "String"
          }
        }
      ]
    }
  ]
}