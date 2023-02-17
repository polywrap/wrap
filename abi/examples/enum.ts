import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  enums: [
    {
      kind: "Enum",
      name: "Foo",
      constants: ["BAR", "BAZ"]
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "SomeObject",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: true,
          type: {
            kind: "Ref",
            ref_kind: "Enum",
            ref_name: "Foo"
          }
        }
      ]
    }
  ]
}