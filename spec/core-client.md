# Core Client
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