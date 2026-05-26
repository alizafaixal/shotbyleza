---
name: Express 5 wildcard routes
description: How to write wildcard route params in Express 5 (path-to-regexp v8)
---

Express 5 uses path-to-regexp v8. The old `:param(*)` syntax throws a `PathError: Unexpected (`.

**Rule:** Use `*name` instead of `:param(*)` for wildcard path segments.

```typescript
// WRONG (Express 4 style, throws in Express 5)
router.patch("/portfolio/images/:imagePath(*)", ...)

// CORRECT (Express 5 / path-to-regexp v8)
router.patch("/portfolio/images/*imagePath", ...)
// Access via: req.params.imagePath
```

**Why:** path-to-regexp v8 broke backward compat with Express 4 named wildcard syntax. Express 5 ships with v8.

**How to apply:** Any time you write a route that needs to capture a multi-segment path (e.g. file paths with slashes), use `*name` syntax.
