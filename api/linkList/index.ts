import { Router, ctx } from "$/lib/index.ts";
import fs from "node:fs/promises";

export const linkListRouter = new Router();

linkListRouter.get("/", () => {
    const { pathname } = new URL("./data.json", import.meta.url)
    return ctx.sendFile(pathname)
})
    .post("/", async () => {
        const { pathname } = new URL("./data.json", import.meta.url);
        const content = await fs.readFile(pathname, "utf-8")
        const object = JSON.parse(content);
        object.push({
            "a": Math.random()
        })
        fs.writeFile(pathname, JSON.stringify(object));
        return ctx.sendJSON(object);
    })
