# WRAP ABI (v0.2)
## Goals
- **Optimized:** The size and performance of the ABI should be optimized.
- **Functional:** The composition & usage of this ABI should be highly functional. It should not require expensive parsing / transformation.
- **Stable:** The ABI should be resistent to potential future changes, helping it remain stable and easily upgradeable.

## Improvements Upon 0.1
- **Smaller:** 0.2 is much smaller than 0.1, as we have removed a significant amount of redundant information from the ABI.
- **Easier To Parse:** 0.2's structured layout is easier to parse than 0.1, as well as it includes a few properties that help solve ambiguity, which required reparsing to solve.
- **Clearer Semantics:** In 0.2 we're proposing clearer semantic naming conventions, to help bring more structure to the ABI's ontology.

## Decisions Made
1. **ABI Sub-Types:** The different sub-types contained within an ABI have been better defined:
  * **"Definition"** = user-defined type (`MyObject`, `MyEnum`, etc).
  * **"Type"** = built-in type (`UInt#`, `Int#`, `String`, etc).
  * **"Reference"** = reference to a "Definition"
2. **Functions Not Methods:** In 0.1 we called the static functions exported by the module "methods", but since we have plans to introduce stateful objects w/ callable methods, we should rename this in 0.2. So, in 0.2 we will call them "module functions", and later will introduce "object methods".
3. **Imports Are Namespaced ABIs:** Instead of creating multiple properties on the `Abi` interface for each import type (ex: `importedObjects: ObjectDefinition[]`), we instead treat all imports as namespaced ABIs. This allows us to add a single property to the root ABI which contains all imports, `imports: ImportedAbi[]`, where `ImportedAbi` is a derived interface from `Abi` which adds `namespace` and `uri` properties.
4. **Heterogeneous < Homogenous Collections:** Currently the `Abi` interface stores each definition kind within a homogenous array (ex: `objects: ObjectDef[]`). It has been discussed that it may be better to make the `Abi` a heterogeneous collection of all possible definitions (ex: `type Abi = AnyDef[]`). This is also know as a "polymorphic array". After some consideration of 0.2's primary goals, we have decided that we prefer the homogenous collections approach because it is easier to parse, because you know ahead of time what the type of each element in the array is.
5. **Remove Comments:** In order to help optimize the ABI, we've removed all `comment` properties. Comments can instead be found on the original source file written by the user that was used to produce the ABI.
6. **Keyword `implements` no longer implies inheritance**: Currently, users use `implements` as `extends`. If they implement an interface, the interface's properties get automatically copied over to the implementation type. While this allows users to type less, it incorrectly behaves as inheritance; so we're removing that behavior. Now if `A implements B`, we will just validate that `A` contains the properties of `B`.
7. **Remove Interfaces and Capabilities:** All wrappers have implicit interface definitions (by having a schema) but only some have implementations. Therefore, there's no reason to restrict implementation wrappers types to be used as interfaces (with the `implements` keyword); or to only enable `getImplementations` capabilities in interface wrappers. So we're removing the concept of `interfaces` in favor of just using types, and enabling `getImplementation` capabilities for all modules.
8. **Import an imported ABI's imports**: Currently, it isn't possible to use a type that was imported in an import without manually re-exporting it, as referenced here: https://github.com/polywrap/toolchain/issues/1448. This will now be possible by importing it in its namespaced form. See the [example](abi/examples/imports/user.ts)
9. **Introduced `ImportRef` (references to an import)**: references to an imported definition are now defined as `ImportRef`s. All imported ABIs contain an `id` propertyand imported ABIs can also have nested imported ABIs inside of them. Therefore, types defined in nested imports can be referenced through a "route" of their IDs. For example, route `1.2.3` would point to an imported ABI with ID `3`, nested inside an imported ABI with ID `2`, nested inside an imported ABI with ID `1`. `ImportRef`s contain an `import_id` property that point to the referenced types's import route.

## Future Plans

- Research merkle-root hashes for root-definitions (function, object, enum, etc?) to help with validation execution time.
- Introduce the concept of "Runtime ABI", which would be a compressed hyper optimized ABI for small storage & download, and fast runtime traversal & introspection (hashes, etc). This ABI would be separate from the ABI that the CLI uses to generate code. This differentiation would help to avoid constraining ourselves too much with optimizations, in the ABI that we manipulate in the CLI and focus on "ease of work"; while also not holding back on optimizations for the "Runtime ABI" because it'd be harder to work with
