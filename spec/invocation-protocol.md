# Invocation protocol
- Serves for invoking (named) methods on the host (from the wrapper) and the wrapper (from the host)
- A buffer is passed with the invocation
- The result of the invocation is also a Buffer
- Schema: `invoke(methodName: string, buffer: Buffer): Buffer`
- Example: `invoke("EthereumProvider.getSigner", buffer: Buffer): Buffer`