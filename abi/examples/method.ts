import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  methods: [
    {
      kind: "Method",
      name: "method",
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
        kind: "Scalar",
        scalar: "String"
      }
    }
  ]
};
