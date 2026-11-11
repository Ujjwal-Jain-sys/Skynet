---
name: Plugin RPC
description: Expose typed methods and events from a plugin's server part to other parts and clients
---

# Plugin RPC

The `./rpc` export is a typed contract. The server part implements it; the TUI, GUI,
and external clients import it without loading the implementation.

## When to use

- The web app (`web/`) needs to call plugin logic over a typed boundary.
- TUI/GUI parts need the same methods the server exposes.
- You want one source of truth for method names and payloads.

## Shape

```ts title="src/rpc.ts"
// Define the contract here. The server part implements it; other parts consume it.
```

```json title="package.json"
{ "exports": { "./rpc": "./src/rpc.ts" } }
```

## Rules

- Keep the contract free of implementation details.
- Version breaking changes; clients import the contract, not the implementation.
- Document each method's inputs and outputs.
- See https://opencode.ai/docs/build/plugins/rpc for the exact API before coding.
