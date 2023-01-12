import { Abi } from "../../abi-0.2";

const abi: Abi = {
  version: "0.2",
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
      name: "SomeFoo",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: true,
          type: {
            kind: "ImportRef",
            import_id: "7",
            ref_kind: "Object",
            ref_name: "AnotherFoo"
          }
        }
      ]
    },
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
}