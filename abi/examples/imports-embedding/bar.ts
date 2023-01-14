import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
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
      name: "Obj1",
      props: [
        {
          kind: "Property",
          name: "data",
          required: true,
          type: {
            kind: "Ref",
            ref_kind: "Object",
            ref_name: "DataType"
          }
        }
      ]
    },
  ]
}