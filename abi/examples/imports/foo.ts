import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
  imports: [
    {
      uri: "lib2",
      type: "wasm",
      id: "0",
      namespace: "Lib2",
      objects: [{
        kind: "Object",
        name: "DataType",
        props: [
          {
            kind: "Property",
            name: "prop",
            required: true,
            type: {
              kind: "Scalar",
              scalar: "Bytes"
            }
          }
        ]
      }]
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "Obj2",
      props: [
        {
          kind: "Property",
          name: "data",
          required: true,
          type: {
            kind: "ImportRef",
            import_id: "0",
            ref_kind: "Object",
            ref_name: "DataType"
          }
        }
      ]
    },
  ]
}