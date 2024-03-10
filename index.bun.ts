import { handler, port } from "$/handler.ts";

Bun.serve({
    port: 3000,
    fetch: handler
});

console.log(`listening on http://localhost:${port}`)




