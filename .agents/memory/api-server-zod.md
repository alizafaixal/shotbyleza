---
name: API server zod imports
description: Why zod cannot be imported directly in the api-server package
---

The api-server package does NOT have `zod` as a direct dependency. Attempting to `import { z } from "zod"` or `import { z } from "zod/v4"` causes esbuild to fail with "Could not resolve zod".

**Rule:** Do not import zod directly in api-server routes. Use one of these alternatives:
1. Write manual type guards instead of Zod validation
2. Use inline runtime checks (`if (!body.name) ...`)
3. Import from `@workspace/db` which re-exports drizzle-zod schemas

**Why:** pnpm workspace hoisting means zod is available at runtime (via @workspace/db) but esbuild can't resolve it as a first-class dep during build unless it's in api-server's own package.json.

**How to apply:** If you add validation to api-server routes, either add zod to api-server/package.json explicitly or use manual validation.
