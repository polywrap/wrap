import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
  objects: [
    {
      kind: "Object",
      name: "TypeBar",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: false,
          type: {
            kind: "Scalar",
            scalar: "Int"
          }
        }
      ]
    },
    {
      kind: "Object",
      name: "SomeBar",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: true,
          type: {
            kind: "Ref",
            ref_kind: "Object",
            ref_name: "TypeBar"
          }
        }
      ]
    }
  ]
}