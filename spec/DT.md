# Data transfer protocol (DT)
The data transfer protocol is used for simplifying data passing between the host and wasm module.
Data is passed as buffers.
- Specifies wasm imports and exports
- Handles panics
- Exports
    - `_dt_receive: (bufferLen: u32) => u32`
- Imports
    - `__dt_fill_input_buffer: async (bufferPtr: u32) => void`
    - `__dt_send: async (bufferPtr: u32, bufferLen: u32) => u32`
    - `__dt_fill_send_result: async (bufferPtr: u32) => void`
    - `__dt_abort: (msgPtr: u32, msgLen: u32, filePtr: u32, fileLen: u32, line: u32, column: u32) => void`