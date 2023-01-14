import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
  imports: [
    {
      id: "foo",
      namespace: "foo",
      uri: "foo",
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
              scalar: "UInt32"
            }
          }
        ]
      }]
    },
    {
      id: "bar",
      namespace: "bar",
      uri: "bar",
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
              scalar: "UInt32"
            }
          }
        ]
      }]
    }
  ],
  objects: [
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
    {
      kind: "Object",
      name: "UserObj",
      props: [
        {
          kind: "Property",
          name: "obj1",
          required: true,
          type: {
            kind: "Ref",
            ref_kind: "Object",
            ref_name: "Obj1"
          }
        },
        {
          kind: "Property",
          name: "obj2",
          required: true,
          type: {
            kind: "Ref",
            ref_kind: "Object",
            ref_name: "Obj2"
          }
        }
      ]
    },
  ]
}