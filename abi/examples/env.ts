import { Abi } from "../abi-0.2";

const abi: Abi = {
  version: "0.2",
  env: {
    kind: "Env",
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
}