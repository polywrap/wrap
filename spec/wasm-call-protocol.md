### Wasm call protocol
The wasm call protocol is used for simplifying data passing between the host and wasm module.
Data is passed as buffers.
- Handles panics

host (input buffer) => wasm 
wasm allocates input buffer
wasm calls `__dt_fill_input_buffer`
host fills that input buffer

wasm executes code (invocation)

wasm (result buffer) => host 
- Exports
    - `_wasm_call: (bufferLen: u32) => u32`
      - sends the length of input buffer to wasm module
      - wasm module will allocate the input buffer of the size of input buffer length.
      - wasm module calls `__dt_fill_input_buffer` import
      - wasm module calls a user defined handler (defined in Wasm) with input buffer and gets the output buffer as the result
      - wasm module constructs the response buffer
      - Encoded result buffer = result buffer length + result buffer 
      - wasm module returns the ptr to the encoded result buffer

Note: when constructing the result buffer, we could create the response buffer instead where the first 4 bytes are the length of the result buffer
> _dt_receive is `wasm_call`
> _dt_send is `host_call`

- Imports
    - `__dt_fill_input_buffer: async (bufferPtr: u32) => void` (This is called after `_dt_receive` with the ptr to the input buffer allocated in wasm)
    - `__host_call: async (bufferPtr: u32, bufferLen: u32) => u32` (Allows sending any encoded buffer from the wasm to the host. Returns the length of the result buffer)
    - `__dt_fill_send_result: async (bufferPtr: u32) => void`
    - `__dt_abort: (msgPtr: u32, msgLen: u32, filePtr: u32, fileLen: u32, line: u32, column: u32) => void`


> `__dt_fill_input_buffer` and `__dt_fill_send_result` can be combined into `__dt_fill_buffer`