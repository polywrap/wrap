# WRAP Specification

WRAP defines a set of standards for creating extensible packages that can run on any platform.
The core principles of WRAP are:
- Portability
- Extensibility
- Composability
- Security

## WRAP package
WRAP package is a collection that contains a WRAP manifest, a Wasm module and optional resource files.

### WRAP manifest 
The WRAP manifest is a MessagePack encoded binary file that contains metadata about a WRAP package.
The metadata consists of the following:
- Version of the WRAP specification
- Name of the WRAP package
- Application Binary Interface (ABI)

### WRAP module
The WRAP module is a Wasm module that allows for bi-directional communication between the Host and itself by defining the processes of invocation and subinvocation. 

It makes use of Host allocated shared memory to pass encoded buffers between the Host and the Wasm module.

The Wasm module must define the following imports and exports:

#### Exports
- `_invoke: (optBufLen: u32) => u32`
    - Used for invoking functions defined in the Wasm module. 
    - *Params:*
        - `optBufLen(u32)` is the length of the encoded invocation options buffer 
    - *Returns(u32):* the 8 byte long response buffer which contains length of the result buffer + pointer to the result buffer

#### Imports
- `__subinvoke: (optBufPtr: u32, optBufLen: u32) => u32`
    - Used for subinvoking functions defined in the Host. 
    - *Params:*
        - `optBufPtr(u32)` is the pointer to the encoded subinvocation options buffer
        - `optBufLen(u32)` is the length of the encoded subinvocation options buffer 
    - *Returns(u32):* the length of the subinvocation result buffer
- `__fill_buffer: (bufferPtr: u32) => void` 
    - A helper function that copies a prepared buffer, of the data host needs to send to the Wasm module, to the provided pointer (`bufferPtr`) in shared memory.
    - *Params:*
        - `bufferPtr(u32)` is pointer to the empty allocated buffer in shared memory. 

#### Invocation

Invocation is a process of calling any functions defined in the Wasm module directly from the Host.

To perform an invocation, one must provide Invocation options which consists of the function name and arguments. Before passing these options to the Wasm module, host must encode it into an invocation options buffer. The function arguments are serialized into a buffer using MsgPack. Then the invoking function name is UTF-8 encoded and concatenated with the encoded function name length and the arguments buffer into an invocation options buffer.

The host can call the `_invoke` export with the length of the invocation options buffer.

**Invocation options buffer:**

| funcNameLen | funcName | argsBuffer |
| -------- | -------- | -------- |

The Wasm module can use the`__fill_buffer` import to fill an allocated invocation options buffer.

Once the invocation completes, the Wasm module returns the response buffer pointer.

The response buffer is a helper buffer used to encode the pointer and length of the invocation result buffer.

**Response buffer:**

| resultBufferLength | resultBufferPointer |
| -------- | -------- |

The result buffer contains the Msgpack encoded return value of the invoked Wasm function.

#### Subinvocation
Subinvocation is a process of calling any functions defined in the Host from the Wasm module.

Similar to an invocation, to perform a subinvocation, one must provide Invocation options which consists of function name and arguments. The Wasm module must encode it into an invocation options buffer. The function arguments are serialized into a buffer using MsgPack. Then the invoking function name is UTF-8 encoded and concatenated with the encoded function name length and the arguments buffer into an invocation options buffer.

The Wasm module can then call the `__subinvoke` import with the pointer and length of that buffer.

Once the subinvocation completes, the host returns the length of the result buffer.

The result buffer contains the Msgpack encoded return value of the subinvoked host function.


#### Invocation sequence diagram
[![](https://mermaid.ink/img/pako:eNqFlVFvmzAQx7_KyU-JSqxBkpXykIdpmlZp2qb2YS9IkQOmtQY2MyZSVfW776gJ2EC2PKBg_j_f3f8O80oylXOSkIb_abnM-GfBnjSrUgn4Y5lRGu7lWf3m2i7VTBuRiZpJA19VY-arv1hTgV3uyc3hcNNpEwgpCHn-URuhZGM13QMU2OcRBUwCM1pZ2Ro2h5741BYecNPFSWBL4Sjew6wG3Tcu11bbaVBrpTsKrCxVxgxHUcG1TyyE6vE--T2GOhaiLI-nCf7T6PVCNR8pZKp-GXUBXEOQ2dgsFxK_pZBzxxXEnWwtoHlmQD-dVuFdGEAUbfGy3_chvivDQZ25BrthTOHRYMtsr4pWZl1DIEN7LKBqA6KApj1Zb-3qLLGYhkPDUHs_9my4G7yc-xnTqHN0CLJyIfQn8HYZmzrzOabbwSEX8TMZ4dGOC797_7fkxEKw_aTmB944kfDOq3nS3pjiVLhKrOuqu7eziZ2Q_4g79TqeTq-LjdO4UO9dP8YuEMB_8OlAL83Oh0nX7GZ-TZbmMl-eZMzti5Cieb46ygPqRe9ijyfNpYPCt9EnwgnhvIUPTe1DXfX9iRfRUYE-LRwT4dZ9v63S2XmJ2HnEpQfBWIBzoA0mDn3pj2XcZ097BQlIxXXFRI7fgtdOnxLzzCueEuwgyXnB2tKkJJVvKGWtUY8vMiOJ0S0PSFvnOKL9p4MkBSsb_vYXcHIEnw?type=png)](https://mermaid.live/edit#pako:eNqFlVFvmzAQx7_KyU-JSqxBkpXykIdpmlZp2qb2YS9IkQOmtQY2MyZSVfW776gJ2EC2PKBg_j_f3f8O80oylXOSkIb_abnM-GfBnjSrUgn4Y5lRGu7lWf3m2i7VTBuRiZpJA19VY-arv1hTgV3uyc3hcNNpEwgpCHn-URuhZGM13QMU2OcRBUwCM1pZ2Ro2h5741BYecNPFSWBL4Sjew6wG3Tcu11bbaVBrpTsKrCxVxgxHUcG1TyyE6vE--T2GOhaiLI-nCf7T6PVCNR8pZKp-GXUBXEOQ2dgsFxK_pZBzxxXEnWwtoHlmQD-dVuFdGEAUbfGy3_chvivDQZ25BrthTOHRYMtsr4pWZl1DIEN7LKBqA6KApj1Zb-3qLLGYhkPDUHs_9my4G7yc-xnTqHN0CLJyIfQn8HYZmzrzOabbwSEX8TMZ4dGOC797_7fkxEKw_aTmB944kfDOq3nS3pjiVLhKrOuqu7eziZ2Q_4g79TqeTq-LjdO4UO9dP8YuEMB_8OlAL83Oh0nX7GZ-TZbmMl-eZMzti5Cieb46ygPqRe9ijyfNpYPCt9EnwgnhvIUPTe1DXfX9iRfRUYE-LRwT4dZ9v63S2XmJ2HnEpQfBWIBzoA0mDn3pj2XcZ097BQlIxXXFRI7fgtdOnxLzzCueEuwgyXnB2tKkJJVvKGWtUY8vMiOJ0S0PSFvnOKL9p4MkBSsb_vYXcHIEnw)

#### Glossary
- `invOpt`: Invocation options passed by Invoker which are the function name of the invoked Wasm function and its arguments.
- `invOptBuf`: Encoded invocation options buffer
- `invOptBufLen`: Length of the invocation options buffer
- `invOptBufPtr`: Reference pointer to the invocation options buffer allocated in the Wasm shared memory
- `subInvOpt`: Subinvocation options needed to subinvoke a Host function. They are the function name of the invoked Host function and its arguments.
- `subInvOptBuf`: Encoded subinvocation options buffer
- `subInvOptBufPtr`: Reference pointer to the Subinvocation options buffer allocated in the Wasm shared memory
- `subInvOptBufLen`: Length of the subinvocation options buffer
- `subInvResBufLen`: Length of the subinvocation result buffer
- `invRes`: Result of the invoked Wasm function.
- `invResBuf`: Encoded invocation result
- `invResBufPtr`: Reference pointer to the invocation result buffer allocated in the Wasm shared memory
- `invResBufLen`: Length of the invocation result buffer
- `invRspBuf`: Invocation response buffer which contains the pointer and length of the result buffer.
- `invRspBufPtr`: Reference pointer to the invocation response buffer
- `invRspBufLen`: Length of the invocation response buffer

#### Summary

1. Invoker calls the host with invocation options(`invOpt`) which consists of the name of a Wasm module function and its arguments.
2. The host encodes invocation options (`invOpt`) into an invocation options buffer(`invOptBuf`). 
3. The host calls the `_invoke` Wasm export with the length of the invocation options buffer(`invOptBufLen`)
4. The Wasm module allocates a new invocation options buffer(`invOptBuf`) in the shared memory. This will be used to store the original invocation options buffer(`invOptbuf`), that exists inside the host, for use in the Wasm module.
5. The Wasm module calls `__fill_buffer` with the pointer to the newly allocated invocation options buffer(`invOptBufPtr`). 
6. The host copies the invocation options buffer(`invOptBuf`) to the given pointer in the shared Wasm memory.
7. After the call to `__fill_buffer`, the Wasm module reads and decodes the invocation options buffer (`invOptBuf`).
8. The Wasm module calls the requested Wasm module function with the given arguments.
    - If the invoked Wasm module function needs to subinvoke a function defined in the host, It performs the subinvocation with following steps
        1. The Wasm module encodes the subinvocation options (`subInvOpt`) into a subinvocation options buffer (`subInvOptBuf`).
        2. The Wasm module calls the imported `__subinvoke` function with the pointer and length to this buffer.
        3. The host reads and decodes the subinvocation options buffer(`subInvOptBuf`) from shared memory.
        4. The host calls the requested host function with the given arguments from the decoded subinvocation options(`subInvOpt`)
        5. Host will get the result of the subinvoked function(`subInvRes`) and encode it into a buffer(`subInvResBuf`)
        6. Host returns the length of the subinvocation result buffer(`subInvResBufLen`) as a result of the `__subinvoke` function.
        7. The Wasm module allocates a new subinvocation result buffer(`subInvResBuf`) in the shared memory with the given length(`subInvResBuflen`). This will be used to store the original subinvocation result buffer(`subInvResBuf`), that exists inside the host, for use in the Wasm module.
        8. The Wasm module calls the `__fill_buffer` with the pointer to the newly allocated subinvocation result buffer(`subInvResBuf`)
        9. The host copies the subinvocation result buffer(`subInvResBuf`) to the given pointer in shared memory.
        10. After the call to `__fill_buffer`, the Wasm module reads and decodes the subinvocation result buffer(`subInvResBuf`) from shared memory and can use it wherever needed. 
9. After the Wasm module finish execution of the invoked Wasm function, it receives the invocation result(`invRes`) as return value of the invoked function.
10. The Wasm module encodes the invocation result(`invRes`) into an invocation result buffer(`invResBuf`)
11. The Wasm module then allocates a new invocation response buffer(`invRspBuf`) and stores the pointer(`invResPtr`) and length(`invResLen`) of the invocation result buffer inside.
12. The Wasm module returns the pointer of the invocation response buffer(`invRspPtr`) to the Host.
13. The host reads(from shared memory) and decodes the invocation response buffer.
14. The host uses the pointer and length of the invocation result buffer from the response buffer to read and decode the invocation result buffer into the invocation result.
15. The host returns the invocation result to the invoker.
