import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
  aliases: [
    {
      kind: "Alias",
      name: "Numeric",
      types: [
        {
          kind: "Scalar",
          scalar: "UInt",
        },
        {
          kind: "Scalar",
          scalar: "Int",
        }
      ]
    }
  ],
  templates: [
    {
      kind: "CustomTemplate",
      id: "1",
      name: "Counter",
      types: [
        {
          kind: "AliasRef",
          name: "Numeric",
        },
        {
          kind: "AliasRef",
          name: "Numeric",
        }
      ]
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "DataType",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "UInt32"
          }
        }
      ]
    },
    {
      kind: "Object",
      name: "SecondType",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "String"
          }
        }
      ]
    },
  ]
}