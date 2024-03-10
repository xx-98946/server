import { Router, ctx } from "$/lib/index.ts";

export const linkListRouter = new Router();

linkListRouter.get("/", () => {
    const { pathname } = new URL("./data.json", import.meta.url)
    return ctx.sendFile(pathname)
    // return ctx.sendFile(new URL("./data.json", import.meta.url))
})
