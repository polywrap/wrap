(module

  (;;; Invoke ;;;)

  ;; __wrap_subinvoke (export):
  ;;   Subinvoke a wrap's method at the specified URI.
  ;; params:
  ;;   $method_len (u32): Length of the method name string being invoked (utf-8 string).
  ;;   $args_len (u32): Length of the arguments bytearray being passed into the method (msgpack bytearray).
  ;;   $env_len (u32): Length of the environment bytearray being passed into the wrap (msgpack bytearray).
  ;; result:
  ;;   Success boolean (0 or 1, false or true).
  ;;   If true, __wrap_invoke_result will have been called prior.
  ;;   If false, __wrap_invoke_error will have been called prior.
  (export "_wrap_invoke"
    (func
      (param $method_size (;u32;) i32)
      (param $args_size (;u32;) i32)
      (param $env_size (;u32;) i32)
      (result (;bool;) i32)
    )
  )
  ;; wrap::__wrap_invoke_args (import):
  ;;   Retrieves the method name and arguments bytearray for the current invocation.
  ;; params:
  ;;   $method_ptr (u32): Pointer to a pre-allocated buffer to store the method name in (utf-8 string).
  ;;   $args_ptr (u32): Pointer to a pre-allocated buffer to store the arguments in (msgpack bytearray).
  (import "wrap" "__wrap_invoke_args"
    (func
      (param $method_ptr (;u32;) i32)
      (param $args_ptr (;u32;) i32)
    )
  )
  ;; wrap::__wrap_invoke_result (import):
  ;;   Sets the result of the current invocation.
  ;; params:
  ;;   $ptr (u32): Pointer to the result bytearray (msgpack bytearray).
  ;;   $len (u32): Length of the result bytearray.
  (import "wrap" "__wrap_invoke_result"
    (func
      (param $ptr (;u32;) i32)
      (param $len (;u32;) i32)
    )
  )
  ;; wrap::__wrap_invoke_error (import):
  ;;   Sets the error message of the current invocation.
  ;; params:
  ;;   $ptr (u32): Pointer to the error message (utf-8 string pointer).
  ;;   $len (u32): Length of the error message.
  (import "wrap" "__wrap_invoke_error"
    (func
      (param $ptr (;u32;) i32)
      (param $len (;u32;) i32)
    )
  )

  (;;; Env ;;;)

  ;; wrap::__wrap_load_env (import):
  ;;   Retrieves the environment bytearray being passed into the wrap.
  ;; params:
  ;;   $enviroment_ptr (u32): Pointer to a pre-allocated buffer to store the environment bytearray in (msgpack bytearray).
  (import "wrap" "__wrap_load_env"
    (func
      (param $enviroment_ptr (;u32;) i32)
    )
  )

  (;;; Subinvoke ;;;)

  ;; wrap::__wrap_subinvoke (import):
  ;;   Subinvoke a wrap's method at the specified URI.
  ;; params:
  ;;   $uri_ptr (u32): URI of the wrap being subinvoked (utf-8 string pointer).
  ;;   $uri_len (u32): Length of the URI string.
  ;;   $method_ptr (u32): Name of the method being subinvoked (utf-8 string pointer).
  ;;   $method_len (u32): Length of the method name string.
  ;;   $args_ptr (u32): Arguments to be passed into the method (msgpack bytearray).
  ;;   $args_len (u32): Length of the arguments bytearray.
  ;; result:
  ;;   Success boolean (0 or 1, false or true).
  ;;   If true, call __wrap_subinvoke_result_len & __wrap_subinvoke_result.
  ;;   If false, call __wrap_subinvoke_error_len & __wrap_subinvoke_error.
  (import "wrap" "__wrap_subinvoke"
    (func
      (param $uri_ptr (;u32;) i32)
      (param $uri_len (;u32;) i32)
      (param $method_ptr (;u32;) i32)
      (param $method_len (;u32;) i32)
      (param $args_ptr (;u32;) i32)
      (param $args_len (;u32;) i32)
      (result (;bool;) i32)
    )
  )
  ;; wrap::__wrap_subinvoke_result_len (import):
  ;;   Returns the length of the result of a successful subinvoke.
  ;; result:
  ;;   Length of the result (u32).
  (import "wrap" "__wrap_subinvoke_result_len"
    (func
      (result (;u32;) i32)
    )
  )
  ;; wrap::__wrap_subinvoke_result (import):
  ;;   Retrieves the result of a successful subinvoke.
  ;; params:
  ;;   $ptr (u32): Pointer to a pre-allocated buffer to store the result in (msgpack bytearray).
  (import "wrap" "__wrap_subinvoke_result"
    (func
      (param $ptr (;u32;) i32)
    )
  )
  ;; wrap::__wrap_subinvoke_error_len (import):
  ;;   Returns the length of the error message from a failed subinvoke.
  ;; result:
  ;;   Length of the error message (u32).
  (import "wrap" "__wrap_subinvoke_error_len"
    (func
      (result (;u32;) i32)
    )
  )
  ;; wrap::__wrap_subinvoke_error (import):
  ;;   Retrieves the error message from a failed subinvoke.
  ;; params:
  ;;   $ptr (u32): Pointer to a pre-allocated buffer to store the error message in (utf-8 string).
  (import "wrap" "__wrap_subinvoke_error"
    (func
      (param $ptr (;u32;) i32)
    )
  )

  (;;; Debug ;;;)

  ;; wrap::__wrap_debug_log (import):
  ;;   Logs a debug message.
  ;; params:
  ;;   $ptr (u32): Pointer to the message (utf-8 string pointer).
  ;;   $len (u32): Length of the message.
  (import "wrap" "__wrap_debug_log"
    (func
      (param $ptr (;u32;) i32)
      (param $len (;u32;) i32)
    )
  )

  (;;; Abort ;;;)

  ;; wrap::__wrap_abort (import):
  ;;   Aborts execution of the wrap.
  ;; params:
  ;;   $msg_ptr (u32): Pointer to the abort message (utf-8 string pointer).
  ;;   $msg_len (u32): Length of the abort message.
  ;;   $file_ptr (u32): Pointer to the source file name (utf-8 string pointer).
  ;;   $file_len (u32): Length of the source file name.
  ;;   $line (u32): Line number in the source file.
  ;;   $column (u32): Column number in the source file.
  (import "wrap" "__wrap_abort"
    (func
      (param $msg_ptr (;u32;) i32)
      (param $msg_len (;u32;) i32)
      (param $file_ptr (;u32;) i32)
      (param $file_len (;u32;) i32)
      (param $line (;u32;) i32)
      (param $column (;u32;) i32)
    )
  )

  (;;; Get Interface Implementations ;;;)

  ;; wrap::__wrap_getImplementations (import):
  ;;   Get all wrap interface implementations at the specified URI.
  ;; params:
  ;;   $uri_ptr (u32): URI of the wrap interface (utf-8 string pointer).
  ;;   $uri_len (u32): Length of the URI string.
  ;; result:
  ;;   Success boolean (0 or 1, false or true).
  ;;   If true, call __wrap_getImplementations_result_len & __wrap_getImplementations_result.
  ;;   If false, no implementations found.
  (import "wrap" "__wrap_getImplementations"
    (func
      (param $uri_ptr (;u32;) i32)
      (param $uri_len (;u32;) i32)
      (result (;bool;) i32)
    )
  )
  ;; wrap::__wrap_getImplementations_result_len (import):
  ;;  Returns the length of the result buffer created by __wrap_getImplementations.
  ;; result:
  ;;   Length of the __wrap_getImplementations result bytearray (u32).
  (import "wrap" "__wrap_getImplementations_result_len"
    (func
      (result (;u32;) i32)
    )
  )
  ;; wrap::__wrap_getImplementations_result (import):
  ;;   Retrieves the result of the __wrap_getImplementations function.
  ;; params:
  ;;   $ptr (u32): Pointer to a pre-allocated buffer to store the result in (string[] as a msgpack bytearray).
  (import "wrap" "__wrap_getImplementations_result"
    (func
      (param $ptr (;u32;) i32)
    )
  )

  (;;; Subinvoke Interface Implementation ;;;)

  ;; wrap::__wrap_subinvokeImplementation (import):
  ;;   Subinvoke a wrap interface implementation at the specified URI.
  ;; params:
  ;;   $interface_uri_ptr (u32): URI of the interface (utf-8 string pointer).
  ;;   $interface_uri_len (u32): Length of the interface URI string.
  ;;   $impl_uri_ptr (u32): URI of the implementation being subinvoked (utf-8 string pointer).
  ;;   $impl_uri_len (u32): Length of the implementation URI string.
  ;;   $method_ptr (u32): Name of the method being subinvoked (utf-8 string pointer).
  ;;   $method_len (u32): Length of the method name string.
  ;;   $args_ptr (u32): Arguments to be passed into the method (msgpack bytearray).
  ;;   $args_len (u32): Length of the arguments bytearray.
  ;; result:
  ;;   Success boolean (0 or 1, false or true).
  ;;   If true, call __wrap_subinvokeImplementation_result_len & __wrap_subinvokeImplementation_result.
  ;;   If false, call __wrap_subinvokeImplementation_error_len & __wrap_subinvokeImplementation_error.
  (import "wrap" "__wrap_subinvokeImplementation"
    (func
      (param $interface_uri_ptr (;u32;) i32)
      (param $interface_uri_len (;u32;) i32)
      (param $impl_uri_ptr (;u32;) i32)
      (param $impl_uri_len (;u32;) i32)
      (param $method_ptr (;u32;) i32)
      (param $method_len (;u32;) i32)
      (param $args_ptr (;u32;) i32)
      (param $args_len (;u32;) i32)
      (result (;bool;) i32)
    )
  )
  ;; wrap::__wrap_subinvokeImplementation_result_len (import):
  ;;   Returns the length of the result of a successful implementation subinvoke.
  ;; result:
  ;;   Length of the result (u32).
  (import "wrap" "__wrap_subinvokeImplementation_result_len"
    (func
      (result (;u32;) i32)
    )
  )
  ;; wrap::__wrap_subinvokeImplementation_result (import):
  ;;   Retrieves the result of a successful implementation subinvoke.
  ;; params:
  ;;   $ptr (u32): Pointer to a pre-allocated buffer to store the result in (msgpack bytearray).
  (import "wrap" "__wrap_subinvokeImplementation_result"
    (func
      (param $ptr (;u32;) i32)
    )
  )
  ;; wrap::__wrap_subinvokeImplementation_error_len (import):
  ;;   Returns the length of the error message from a failed implementation subinvoke.
  ;; result:
  ;;   Length of the error message (u32).
  (import "wrap" "__wrap_subinvokeImplementation_error_len"
    (func
      (result (;u32;) i32)
    )
  )
  ;; wrap::__wrap_subinvokeImplementation_error (import):
  ;;   Retrieves the error message from a failed implementation subinvoke.
  ;; params:
  ;;   $ptr (u32): Pointer to a pre-allocated buffer to store the error message in (utf-8 string).
  (import "wrap" "__wrap_subinvokeImplementation_error"
    (func
      (param $ptr (;u32;) i32)
    )
  )

  (;;; Asyncify ;;;)

  ;; asyncify::start_unwind (import):
  ;;   Starts the process of unwinding the call stack.
  ;; params:
  ;;   $data_ptr (u32): Pointer to the data structure storing the call stack and local state information.
  (import "asyncify" "start_unwind"
    (func
      (param $data_ptr (;u32;) i32)
    )
  )
  ;; asyncify::stop_unwind (import):
  ;;   Stops the process of unwinding the call stack.
  (import "asyncify" "stop_unwind"
    (func)
  )
  ;; asyncify::start_rewind (import):
  ;;   Starts the process of rewinding the call stack.
  ;; params:
  ;;   $data_ptr (u32): Pointer to the data structure used during the unwinding process.
  (import "asyncify" "start_rewind"
    (func
      (param $data_ptr i32)
    )
  )
  ;; asyncify::stop_rewind (import):
  ;;   Stops the process of rewinding the call stack.
  (import "asyncify" "stop_rewind"
    (func)
  )
  ;; asyncify::get_state (import):
  ;;   Gets the current state of the Asyncify process.
  ;; result:
  ;;   u32 representing the current state (0=none, 1=unwinding,2=rewinding).
  (import "asyncify" "get_state"
    (func
      (result (;u32;) i32)
    )
  )

  (;;; Memory ;;;)

  ;; env::memory (import):
  ;;   Import the wasm module's memory instance from the host.
  (import "env" "memory"
    (memory (;0;) 1)
  )
)
