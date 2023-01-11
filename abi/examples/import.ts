/*
Interface
  -> WrapperA
    -> WrapperB
*/


import { Abi } from "../abi-0.2";

/*
type Foo {
  prop: UInt8!
}
*/
const layer_0: Abi = {
  version: "0.2",
  objects: [
    {
      kind: "Object",
      name: "Foo",
      props: [
        {
          kind: "Property",
          name: "prop",
          required: true,
          type: {
            kind: "Scalar",
            scalar: "UInt8"
          }
        }
      ]
    }
  ]
}

/*
#import { Foo } into Interface from "uri"

type Bar {
  foo: Interface_Foo!
}
*/
const layer_1: Abi = {
  version: "0.2",
  imports: [
    {
      id: "0",
      uri: "interface",
      namespace: "Interface",
      objects: [
        {
          kind: "Object",
          name: "Foo",
          props: [
            {
              kind: "Property",
              name: "prop",
              required: true,
              type: {
                kind: "Scalar",
                scalar: "UInt8"
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
      name: "Bar",
      props: [
        {
          kind: "Property",
          name: "foo",
          required: true,
          type: {
             kind: "ImportRef",
             import_id: "0",
             ref_kind: "Object",
             ref_name: "Foo"
          }
        }
      ]
    }
  ]
};

/*
#import { Bar, Interface_Foo } into Wrapper from "wrapper"

type MyObject {
  bar: Wrapper_Bar!
  foo: Wrapper_Interface_Foo!
}
*/
/*
0. import an external ABI
1. extract all imports of that ABI, append a namespace to them
2. extract all abi defs, set as namespace
*/
const final: Abi = {
  version: "0.2",
  imports: [
    {
      id: "0",
      uri: "uri",
      namespace: "Wrapper",
      objects: [
        {
          kind: "Object",
          name: "Bar",
          props: [
            {
              kind: "Property",
              name: "foo",
              required: true,
              type: {
                 kind: "ImportRef",
                 import_id: "0",
                 ref_kind: "Object",
                 ref_name: "Foo"
              }
            }
          ]
        }
      ],
      imports: [
        {
          id: "0",
          uri: "interface",
          namespace: "Interface",
          objects: [
            {
              kind: "Object",
              name: "Foo",
              props: [
                {
                  kind: "Property",
                  name: "prop",
                  required: true,
                  type: {
                    kind: "Scalar",
                    scalar: "UInt8"
                  }
                }
              ]
            }
          ]
        }
      ],
    }
  ],
  objects: [
    {
      kind: "Object",
      name: "MyObject",
      props: [
        {
          kind: "Property",
          name: "bar",
          required: true,
          type: {
            kind: "ImportRef",
            import_id: "0",
            ref_kind: "Object",
            ref_name: "Bar"
          }
        },
        {
          kind: "Property",
          name: "foo",
          required: true,
          type: {
            kind: "ImportRef",
            import_id: "0.0",
            ref_kind: "Object",
            ref_name: "Foo"
          }
        }
      ]
    }
  ]
}
