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