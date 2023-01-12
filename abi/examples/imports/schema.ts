import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
  imports: [
    {
      namespace: "ExternalA",
      uri: "wrap://ens/externalA.eth",
      id: "1",
      imports: [
        {
          namespace: "Lorem",
          uri: "wrap://ens/lorem.eth",
          id: "7",
          objects: [
            {
              kind: "Object",
              name: "AnotherFoo",
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
            }
          ]
        }
      ],
      objects: [
        {
          kind: "Object",
          name: "YetFoo",
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
        }
      ]
    },
  ],
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
      name: "Baz",
      props: [
        {
          kind: "Property",
          name: "propA",
          required: true,
          type: {
            kind: "ImportRef",
            ref_kind: "Object",
            ref_name: "AnotherFoo",
            import_id: "1.7"
          }
        },
        {
          kind: "Property",
          name: "propB",
          required: true,
          type: {
            kind: "ImportRef",
            ref_kind: "Object",
            ref_name: "YetFoo",
            import_id: "1"
          }
        },
        {
          kind: "Property",
          name: "propC",
          required: true,
          type: {
            kind: "Ref",
            ref_kind: "Object",
            ref_name: "TypeBar",
          }
        }
      ]
    }
  ]
}