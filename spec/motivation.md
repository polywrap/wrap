# WRAP 0.2 Motivation
The current WRAP standard (0.1) has lots of unnecessary imports that are making the standard bulky, increasing the potential attack vectors and breaking changes that can be avoided by refactoring the standard to remove most of these imports and moving the responsibilites of the current imports to the higher layer abstractions (e.g. plugins, client, etc).

Here is the list of all the imports and exports that this standard will be replacing:

1) `_wrap_invoke` family of imports and exports:
    a. `_wrap_invoke`
    b. `__wrap_invoke_args`
    c. `__wrap_invoke_result`
    d. `__wrap_invoke_error`
    
2) `__wrap_subinvoke` family of imports and exports:
    a. `__wrap_subinvoke`
    b. `__wrap_subinvoke_result_len`
    c. `__wrap_subinvoke_result`
    d. `__wrap_subinvoke_error_len`
    e. `__wrap_subinvoke_error`
    
This standard will replace imports and exports necessary for invocation and subinvocation with following list of imports and exports:

- The `_invoke` export function can be used by the Host to call functions defined in the Wasm module.
- The `__subinvoke` import function can be used by the Wasm to call functions defined in the Host.
- The `__fill_buffer` import is a helper function that copies a prepared buffer, of the data host needs to send to the Wasm module, to the provided pointer in shared memory.

Here is the list of all the imports and exports that this standard will be removing:

1) `__wrap_subinvokeImplementation` family of imports:
    a. `__wrap_subinvokeImplementation`
    b. `__wrap_subinvokeImplementation_result_len`
    c. `__wrap_subinvokeImplementation_result`
    d. `__wrap_subinvokeImplementation_error_len`
    e. `__wrap_subinvokeImplementation_error`
2) `__wrap_getImplementations` family of imports:
    a. `__wrap_getImplementations`
    b. `__wrap_getImplementations_result_len`
    c. `__wrap_getImplementations_result`
3) `__wrap_debug_log` import
4) `__wrap_load_env` import
5) `__wrap_abort` import

Before jumping into why are we removing this and how it will be replaced, let's talk about what is the purpose of these imports in the current standard

1) `__wrap_subinvokeImplementation` and `__wrap_getImplementations`:

These 2 imports are related to the interface-implementations functionality we provide via the client.

Currently, a WRAP developer can create any interface and other developers can implement this interface. This allows creating extensible software like the defiwrapper. To achieve this, the client provides a config to register the list of interfaces and its implementations.

We allow executing these implementations inside the wrapper in 2 different ways: 1) wrapper can get implementations registered with the client for the given interface and execute any/all of these implementations. 2) wrapper can dynamically execute any implementation wrapper if it knows its URI.

`__wrap_subinvokeImplementation` import works similarly to the `__wrap_subinvoke` but instead of just taking the URI of the wrapper we want to subinvoke, it will also take the URI of interface wrapper. The interface uri isn't being used for anything currently and this import works in exactly the same way as the `__wrap_subinvoke` works. The idea behind this import was to evantually support only allowing the valid interface-implementations to be executed but currently it doesn't serve any purpose.

`__wrap_getImplementations` allows us to get implementations of an interface that is registered using client. Responsibility of this function can be moved to higher layers of abstraction.

`__wrap_debug_log` is a dev experience import that we introduced to log the message to console while developing the wrapper but it's a potential security issue and breaks the sandboxed guarantees of the runtime.

`wrap_load_env` is used for loading environment variables set by client to the wasm wrapper. Responsibility of this function can be moved to higher layers of abstraction.

`wrap_abort` is used for aborting execution of Wasm module when there is any exception. Responsibility of this function can be moved to higher layers of abstraction.
