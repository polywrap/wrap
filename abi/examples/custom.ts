import { AbiDefs } from "../abi-0.2";

const abi: AbiDefs = {
  aliases: [{
    kind: "Alias",
    name: "Numeric",
    types: [{
      kind: "Scalar",
      scalar: "UInt",
    }, {
      kind: "Scalar",
      scalar: "Int",
    }]
  }, {
    kind: "Alias",
    name: "MapKey",
    types: [{
      kind: "Scalar",
      scalar: "UInt",
    }, {
      kind: "Scalar",
      scalar: "UInt8",
    }, {
      kind: "Scalar",
      scalar: "UInt16",
    }, {
      kind: "Scalar",
      scalar: "UInt32",
    }, {
      kind: "Scalar",
      scalar: "Int",
    }, {
      kind: "Scalar",
      scalar: "Int8",
    }, {
      kind: "Scalar",
      scalar: "Int16",
    }, {
      kind: "Scalar",
      scalar: "Int32",
    }, {
      kind: "Scalar",
      scalar: "String",
    }]
  }],
  templates: [{
    kind: "CustomTemplate",
    id: "1",
    name: "MapOfArrays",
    types: [{
      kind: "AliasRef",
      name: "Numeric",
    }, {
      kind: "CompoundUnion",
      members: [{
        kind: "BaseUnion",
        members: [{
          kind: "Scalar",
          scalar: "String",
        }, {
          kind: "Scalar",
          scalar: "Boolean",
        }]
      },
      {
        kind: "Array",
        item: {
          required: false,
          type: {
            kind: "Scalar",
            scalar: "String",
          }
        }
      }]
    }]
  }, {
    kind: "CustomTemplate",
    id: "2",
    name: "Map",
    types: [{
      kind: "BaseUnion",
      members: [{
        kind: "AliasRef",
        name: "MapKey",
      }, {
        kind: "AliasRef",
        name: "Any",
      }]
    }]
  }, {
    kind: "CustomTemplate",
    id: "3",
    name: "BigInt",
    types: [{
      kind: "Scalar",
      scalar: "String",
    }]
  }, {
    kind: "CustomTemplate",
    id: "4",
    name: "BigNumber",
    types: [{
      kind: "Scalar",
      scalar: "String",
    }]
  }, {
    kind: "CustomTemplate",
    id: "5",
    name: "JSON",
    types: [{
      kind: "Scalar",
      scalar: "String",
    }]
  }],
  objects: [{
    kind: "Object",
    name: "SomeObject",
    props: [{
      kind: "Property",
      name: "baz",
      required: true,
      type: {
        kind: "Scalar",
        scalar: "String",
      }
    }]
  }],
  functions: [
    {
      kind: "Function",
      name: "foo",
      args: [{
        kind: "Argument",
        name: "s",
        required: true,
        type: {
          kind: "Scalar",
          scalar: "String",
        },
      }],
      result: {
        kind: "Result",
        required: true,
        type: {
          kind: "Custom",
          template_id: "1",
          types: [{
            required: false,
            type: {
              kind: "Scalar",
              scalar: "String",
            }
          }, {
            required: false,
            type: {
              kind: "Scalar",
              scalar: "String",
            }
          }]
        }
      }
    },
    {
      kind: "Function",
      name: "bar",
      args: [{
        kind: "Argument",
        name: "s",
        required: true,
        type: {
          kind: "Scalar",
          scalar: "String",
        },
      }],
      result: {
        kind: "Result",
        required: true,
        type: {
          kind: "Custom",
          template_id: "2",
          types: [{
            required: true,
            type: {
              kind: "Scalar",
              scalar: "String",
            }
          }, {
            required: true,
            type: {
              kind: "Ref",
              ref_kind: "Object",
              ref_name: "SomeObject",
            }
          }]
        }
      }
    }, {
      kind: "Function",
      name: "fez",
      args: [{
        kind: "Argument",
        name: "s",
        required: true,
        type: {
          kind: "Scalar",
          scalar: "String",
        },
      }],
      result: {
        kind: "Result",
        required: true,
        type: {
          kind: "Custom",
          template_id: "5",
          types: [{
            required: true,
            type: {
              kind: "Scalar",
              scalar: "String",
            }
          }]
        }
      }
    }
  ]
}