import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  functions: [
    {
      kind: "Function",
      name: "fooFunc",
      args: [
        {
          kind: "Argument",
          name: "arg",
          type: {
            kind: "Scalar",
            scalar: "String"
          },
          required: true,
        }
      ],
      result: {
        kind: "Result",
        type: {
          kind: "Scalar",
          scalar: "String"
        },
        required: true
      }
    }
  ]
};
