import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
  imports: [
    {
      id: "0",
      namespace: "Bar",
      uri: "bar",
      imports: [
        {
          uri: "lib1",
          id: "0",
          namespace: "Lib1",
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
          name: "Baz",
          props: [
            {
              kind: "Property",
              name: "data2",
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
          name: "Obj1",
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
        }]
    },
    {
      id: "1",
      namespace: "Foo",
      uri: "foo",
      imports: [
        {
          uri: "lib2",
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
      objects: [{
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
      }]
    },
  ],
  objects: [
    {
      kind: "Object",
      name: "UserObj",
      props: [
        {
          kind: "Property",
          name: "obj1",
          required: true,
          type: {
            import_id: "0",
            kind: "ImportRef",
            ref_kind: "Object",
            ref_name: "Obj1"
          }
        },
        {
          kind: "Property",
          name: "obj2",
          required: true,
          type: {
            import_id: "1",
            kind: "ImportRef",
            ref_kind: "Object",
            ref_name: "Obj2"
          }
        }
      ]
    },
  ]
}