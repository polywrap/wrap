# WRAP ABI 0.2 Principles
- **Optimized:** In 0.1 we have redundant information that can be removed, helping optimize the size of the ABI.
- **Functional:** The composition & usage of this ABI should be highly functional. It should not require expensive parsing / transformation.
- **Clear Semantics:** In 0.2 we're proposing clearer symantic naming conventions.
  - **"Type"** = built-in type (`UInt#`, `Int#`, `String`, etc)
  - **"Definition"** = user-defined type (`MyObject`, `MyEnum`, etc)
  - **"Reference"** = reference to a "definition"
- **Functions Not Methods:** In 0.1 we called the static functions exported by the module "methods", but since we have plans to introduce stateful objects w/ callable methods, we should rename this in 0.2. So, in 0.2 we will call them "module functions", and later will introduce "object methods".
