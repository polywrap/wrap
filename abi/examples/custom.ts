const abi = {
  aliases: [{
    name: "Numeric",
    types: [{
      kind: "scalar",
      name: "UInt",
    }, {
      kind: "scalar",
      name: "Int",
    }]
  }],
  customs: [
    {
      name: "MapOfArrays",
      id: 1,
      types: [{
        kind: "alias",
        name: "Numeric",
      }, {
        kind: "union",
        types: [{
          kind: "BaseUnion",
          members: [{
            kind: "scalar",
            name: "String",
          }, {
            kind: "scalar",
            name: "Boolean",
          }]
        },
        {
          kind: "array",
          item: {
            kind: "scalar",
            name: "string"
          }
        }]
      }]
    }
  ]
}