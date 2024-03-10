import { handler, port } from "$/handler.ts"

Deno.serve({ port }, handler)