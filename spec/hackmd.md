# Wrap 0.2 Spec

## Motivation

the current Wrap standard (0.1) has a lots of unnecessary imports that is making standard bulky and increases the potential attack vectors that can be avoided by refactoring standard to remove some of these imports and moving the responsibilites of the current imports to the client.

Here's the list of all the imports and exports that these standard will be removing/modifying:

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

Before jumping into why are we removing this and how it will be replaced, let's talk about what is the purpose of these imports in the current standard

1) `__wrap_subinvokeImplementation` and `__wrap_getImplementations`:

This 2 imports are related to the interface-implementations functionality we provide via client.

Currently, a Wrap developer can create any interface and other developers can implement this interface. This allows creating extensible softwares like defiwrapper. For this client provides config to register the list of interfaces and its implementations

We allow executing this implementation inside the wrapper in 2 different ways: 1) wrapper can get implementations registered with the client for the given interface and execute any/all of these implementations. 2) wrapper can dynamically execute any implementation wrapper if it knows its uri

`__wrap_subinvokeImplementation` import work similarly to the `__wrap_subinvoke` but instead of just taking the uri of the wrapper we want to subinvoke, it will also take the uri of interface wrapper. The interface uri isn't being used for anything currently and this import works in exactly the same way as the `__wrap_subinvoke` works. The idea behind this import was to evantually support only allowing the valid interface-implementations to be executed but currently it doesn't serve any purpose.

`__wrap_getImplementations` on the other hand just allows us to get implementations of an interface that is registered using client. It isn't needed at all if you are subinvoking dynamic implementations.

`__wrap_debug_log` was just a devx import that we introduced to log the message to console while developing the wrapper but it's a potential security issue and breaks the sandboxed guarantees of the runtime.

`wrap_load_env` is used for loading environmnet variables set by client to the wasm wrapper.



## Requirements

Since we are now aware of the problems with the current Wrap standard and have some ideas about what we wanted to achieve with the current Wrap standard, let's rethink about the requirements from the ground up for all the use-cases we want to support with the next Wrap standard.

Let's first divide the wrappers into 3 different types according to the subinvocations it performs:
1) Pure Wrapper - no subinvocations
2) Deterministic Wrapper - only subinvoke the wrappers declared in the wrap manifest (imported into the schema) or registered implementation through client
3) Dynamic Wrapper - subinvoke any wrapper

We would also want to have subinvocation aware of the context of the subinvoker wrapper (Ex: Currently, the plugin instance is shared between every wrappers, we may want more fine grained control over when to share the plugin and when to create new one according to the subinvoker context)

We also want to allow wrapper to subinvoke itself easily. 

> Note : this categories are from the end-user requirements, from the Wrap standard perspective every subinvoke is basically dynamic subinvoke.

We can allow supporting any of the above usecase for the subinvocation by putting these constraints on the client rather than the Wrap standard.

We also want to not only support the static interface-implementations registry that we can conigure directly from the client but also want to have dynamic regsitries using which client and wrapper can get implementations for an interface dynamically.

We have added `__wrap_debug_log` so that we can log any message to console easily during the development but we don't want this function to be part of Wrap standard.

`__wrap_load_env` is used for loading env from the host to the wasm wrapper but we can instead use a simple plugin to expose the env functionality to the Wasm wrappers. We don't need this to be part of the Wrap standard.

With the above contexts, we can create these 3 user requirements:

1) Every subinvocations should have access to the subinvoker context.
    -  Allow wrapper to subinvoke itself
2) Add support for subinvoke validations with the client
3) Add support for configuring dynamic implementations registries through the client
4) Add support for allowing wrapper to log message to console during development
5) Add support for loading envs from the host inside the wrapper.

## Implementation

### 1. Every subinvocations should have access to the subinvoker context.

Let's first start by defining the context for a wrapper and for that we can introduce the concept of wrapper id.

> Note: wrapper uri is analogous to the class while wrapper id will be analogous to the object instance.

Client holds the instance of every wrapper in the form of Wrapper class. We can simply add an id to uniquely represent the wrapper instance.


```typescript=
export interface Wrapper {
    /**
     * Unique id of the wrapper created while instantiating the wrapper (for both WasmWrapper and PluginWrapper)
     */
    private id: string;
    /**
     * Invoke the Wrapper based on the provided [[InvokeOptions]]
     */
    invoke(options: InvokeOptions<Uri>, invoker: Invoker): Promise<InvocableResult<unknown>>;
    /**
     * Get a file from the Wrapper package.
     */
    getFile(options: GetFileOptions): Promise<Result<Uint8Array | string, Error>>;
    /**
     * Get a manifest from the Wrapper package.
     */
    getManifest(): WrapManifest;
}
```

This wrapper id will allow us to uniquely represent a wrapper instance in the client. 

We can now pass the invokerStack as InvokeOptions in client. This is basically a subinvoke stack for any wrapper invocation. With this subinvoked wrapper can now get the context for the current invocation and perform the subinvocation according to the context

```typescript=
export interface InvokeOptions {
    /** The Wrapper's URI */
    uri: Uri;
    /** Method to be executed. */
    method: string;
    /**
     * Arguments for the method, structured as a map,
     * removing the chance of incorrectly ordering arguments.
     */
    args?: Record<string, unknown> | Uint8Array;
    /**
     * Env variables for the wrapper invocation.
     */
    env?: Record<string, unknown>;
    resolutionContext?: IUriResolutionContext;
    invokerStack?: string[]; //array of wrapper ids
}
```

Since currently, only plugins have the state, they can be configured to keep the state isolated or shared according to the context.

We can also use this id to subinvoke the wasm wrapper itself by exposing the id of the wasm wrapper using a uriResolutionContext plugin.

```
type Module {
  originUri: Sting!
  finalUri: String!
  uriResolutionHistory: [String!]! # actual type TBD but it will be stack of uris
}
```

This plugin will always return the origin and final uri of the wrapper itself based on the subinvoke context.

Wrapper can use this uri to subinvoke into itself.

:::warning
### Deprecated
To support this we can introduce a new parameter to the existing `__wrap_invoke_args` function:

```typescript=
function __wrap_invoke_args: (idPtr: u32, methodPtr: u32, argsPtr: u32): void {}
```

We also need a way to actually subinvoke the wrapper itself and for that we can introduce a new uri authority `id`, with this info we can easily subinvoke any wrapper if we know its runtime id and since we expose the id of the wrapper itself during the invocation it can easily subinvoke itself.

Ex: Uri = `wrap://id/xyz1234`

This id to wrapper map will live entirely in-memory during the client runtime. `PackagetoWrapperCacheResolver` can keep track of this id to wrapper map.
:::

> Note: plugin wrappers can easily subinvoke itself. so this is less of a problem there.

### 2. Add support for subinvoke validations with the client

Since we doesn't want a wrapper to subinvoke into any arbitrary wrapper, we need a mechanism to prevent this on client side.

We can add a configuration option called `subinvokeValidator` which can take some architectural references from the `uriResolver` 

This `subinvokeValidator` can be an interface with following methods:

```typescript=
interface ISubinvokeValidator {
  // uri is the uri of the wrapper being subinvoked
  // invokerStack is the stack of id of subinvokers
  isValidSubinvoke(uri: Uri, invokerStack: string[]): bool;
}
```

For example we can implement a `SubinvokeManifestValidator` that validates whether uri we are subinvoking is mentioned in the manifest of the direct invoker. In this case we can pop the `invokerStack` get the ide of the last invoker, check the manifest of the invoker wrapper and verify if the wrapper we are subinvoking mentioned inside the manfiest

Similarly we can have any other kind of validators.

```
interface CoreClientConfig {
  readonly interfaces?: Readonly<InterfaceImplementations<TUri>[]>;
  readonly envs?: Readonly<Env<TUri>[]>;
  readonly resolver: Readonly<IUriResolver<unknown>>;
  readonly subinvokeValidator: Readonly<ISubinvokeValidator>;
}
```

By default, CoreClient wouldn't allow any subinvocations. We can change this behavior for the PolywrapClient though for better devx.

> Note: undefined subinvokeValidator means no subinvocations are allowed



### 3. Add support for configuring dynamic implementations registries through the client

Currently, we only support registering interface-implementations statically with the client. To achieve this we need to remove support for the current way of configuring interface-implementation from the client in favour of dynamic registries. 

These registries can be implemented using a common registry interface and must implement `getImplementations` function.

Wrapper relying on a registry can directly import it like any other wrapper but to actually enable the subinvocation, registry must implement the `isValidSubinvoke` function to check whether wrapper we are subinvoking a valid wrapper registered with the current registry. We can easily get the manifest of the invoker wrapper which must mention the current regsitry as its dependency and wrapper it wants to subinvoke must be part of the registry.

The graphql schema for such regsitry would look like following:

```graphql=
type Module {
  getImplementations(uri: String!): [String!]!
  isValidSubinvoke(uri: String!, invokerStack: [String!]!): Boolean!
}
```

The `isValidSubinvoke` function of the registry can be used directly by the `SubinvokeValidator`

:::info
An alternative way to implement this would be to have registry with just `isValidUri` method which checks if the uri is valid for the given regsitry

```graphql=
type Module {
  getImplementations(uri: String!): [String!]!
  isValidUri(uri: String!): Boolean!
}
```

Then it would be the job of RegistrySubinvokeValidator to contain the logic for validating whether the wrapper trying to subinvoke the given wrapper has mentioned the given registry as its dependency in its manifest.
:::

### 4. Add support for allowing wrapper to log message to console during development

This can be easily implemented by adding the logger aggregator wrapper by default in the client-config.

We can then provide a `--develop` or `--enableLog` option in the `polywrap codegen` which would generates bindings for `wrap_debug_log` function which subinvoke into the logger aggregator wrapper.

### Jure's thoughts

// Invoker
cache.doSomething()
new Cache().doSomething()

Cache (subinvoke_stack)

map id => cache,

`__wrap_invoke` no need to add id.

type Module {
    cache(someWrapper: Wrapper_Module)
}

someWrapper.doSomething()

// The following can be a plugin
self.originUri
self.finalUri

self.uriResolutionHistory
self.uriResolutionStack

//Wrapper

self.uri
//ens/ethereum.eth
//ens/ethereum2.eth
//ipfs/Qmdasdas


uri => Wrapper
uri1 => uri2++


:::info
TODO:
- remove id uri authority
- remove idPtr from __wrap_invoke_args
- create a UriResolutionContext plugin that can provide originUri, finalUri and uriResolutionHistory of the calling wrapper
    - wrapper class in client can also keep resolutionContext that can be used by UriResolutionContext plugin
- remove SubinvokeValidator from the CoreClient and move it to the PolywrapClient
- Should we keep track of invokerStack or just origin and sender id is enough? @zbs1CidlRU6NAc7CvPR28w can provide a better reasoning for keeping the invokerStack
- Should we directly provide `--develop` option for `polywrap codegen` or can use something like pwr cli to generate that for us. Ex: `polywrap codegen && pwr log-bindgen`?
- Remove concept of env
  - We can have env plugin that can keep track of map of uri -> env variable and can be configured using the plugin config. (It can have getEnv method)
- std library will be a collection of default plugin and wasm wrappers that's needed for the client runtime.
- Should every plugin be aware of invokerStack or only std plugin can be aware of invokerStack? (maybe doesn't matter since plugin has direct access to client)
- Should'nt plugin just have access to Invoker trait?
- What if plugin wants access to the full client (not needed for your day-to-day plugins but for special plugin like client-plugin used by the pwr app)? (can std plugin help here?)
:::

## WRAP standard
- Invocation protocol
- Wrapper protocol
- Client protocol

## WRAP Components
- WRAP standard
- DT protocol (wasm wrappers)
- Wasm wrapper runtime + wasm runtime
- Plugin runtime 
- Wrapper and plugin bindings
- Client standard libraries

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

### Invocation protocol
- Serves for invoking (named) methods on the host (from the wrapper) and the wrapper (from the host)
- A buffer is passed with the invocation
- The result of the invocation is also a Buffer
- Schema: `invoke(methodName: string, buffer: Buffer): Buffer`
- Example: `invoke("EthereumProvider.getSigner", buffer: Buffer): Buffer`

### Wrapper protocol
- Wrappers have defined stringly named methods (UTF-8)
- Hosts have defined stringly named methods (UTF-8)
- When calling a method the arguments are passed as an object
- Argument types are msgpack base types or msgpack polywrap extension types
- The result is a msgpack base type or msgpack polywrap extension types


### Hierarchy

wasm wrapper bindings
wasm wrapper protocol
wrapper protocol
invocation 
dt

plugin wrapper bindings
wrapper protocol
invocation 

### wrap core client types 
- Used to invoke functions on wrappers
- Used to resolve wrappers from a WRAP URI

```typescript
getManifest<TUri extends Uri | string>(
  uri: TUri
): Promise<Result<WrapManifest, Error>>;
getFile<TUri extends Uri | string>(
  uri: TUri,
  options: GetFileOptions
): Promise<Result<string | Uint8Array, Error>>;
invokeWrapper<
  TData = unknown,
  TUri extends Uri | string = string
>(
  options: InvokerOptions<TUri> & { wrapper: Wrapper }
): Promise<InvokeResult<TData>>;
invoke<TData = unknown, TUri extends Uri | string = string>(
  options: InvokerOptions<TUri>
): Promise<InvokeResult<TData>>;
tryResolveUri<TUri extends Uri | string>(
  options: TryResolveUriOptions<TUri>
): Promise<Result<UriPackageOrWrapper, unknown>>;
loadWrapper(
  uri: Uri,
  resolutionContext?: IUriResolutionContext,
  options?: DeserializeManifestOptions
): Promise<Result<Wrapper, Error>>;
validate<TUri extends Uri | string>(
  uri: TUri,
  options: ValidateOptions
): Promise<Result<true, Error>>;
```
```typescript
interface Wrapper {
    invoke: (method: string, args: ISerializible)
}
interface Plugin {
    invoke: (method: string, args: ISerializible)
}

interface CoreClient {
    invoke: (uri: string, method: string, args: ISerializable): ISerializable
}

interface ISerializable<T> {
    serialize(): Buffer,
    deserialize(): T
}

interface SomeArgs implements ISerializable<SomeArgs> {
    prop: String,
    deserialize(): SomeArgs {
        return this;
  }
}

class WrapBuffer<T> implements ISerializable<T> {
    serialize(): Buffer {
        return this.buffer;
    }
    desarialize(): T {
        return msgPackDeserialize(this);
    }
    buffer: Buffer,
}

client.invoke(pluginUri, "test()")

plugin.test()


wrapper.invoke(uri, method)

const { wrapper } = loadWrapper();
wrapper.invoke()
```


### Wasm wrapper runtime
- Depends on wrap core types
- Connects/Exposes the WASM module to the client and client to the wasm module
- Implements the wrapper protocol.
- Implements the `Wrapper` interface to be used inside of a Client
- Implements the `IWrapPackage` interface
- 
### Plugin runtime
- Connects/Exposes the plugin to the client and client to the plugin
- Implements the WRAP standard (invocation protocol)
- Implements the `Wrapper` interface to be used inside of a Client
- Implements the `IWrapPackage` interface

### Wasm and plugin wrapper bindings
- Implement the wrapper protocol and improves the wrapper development experience

### Client standard libraries
- From point of view of a wrapper/plugin it is just another wrapper dependency
- Required for features that need to be hardcoded client-side
- Could be used by Client implementations to group plugins
    - Instead of saying "Gelato client has these plugins: fs.eth, http.polywrap.eth, etc" they can just define a Gelato CSL (gelato.eth) with the following schema:
```typescript=
namespace gelato {
    class http {
        function get()
        function post()
    }
    class fs {
        function readText()
    }
}
```
- Gelato CSL could redirect fs to fs.eth and http to http.polywrap.eth
- e.g Polywrap Client Standard Library (PCSL) 
    - (env, self.uri) part of PolywrapClient
- Client standard libraries = PCSL (env, self.uri) part of PolywrapClient
- CidtClient (self.callerUri, env, self.uri) = CCSL
- CidtClient (self.callerUri, PCSL) = CCSL
- CidtClient ((self.callerUri) = CCSL) + PCSL

### PolywrapClient


### WIP
core lib
    Wrapper interface
    Core Client interface
    
core client impl
    - core lib
    
wasm wrapper runtime 1
    - core lib

wasm wrapper runtime 2
    - core lib

host app
    - core client impl
    - wasm wrapper runtime 1
    - wasm wrapper runtime 2