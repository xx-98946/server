import { Router, ctx } from "$/lib/index.ts";

export const compsRouter = new Router();

compsRouter
    .get("/simple-greeting", () => {
        const { pathname } = new URL("./simple-greeting.js", import.meta.url);
        return ctx.sendFile(pathname)
    })
    .get("/full-component", () => {
        const { pathname } = new URL("./full-component.js", import.meta.url);
        return ctx.sendFile(pathname)
    })
    .get("/properties-basic", () => {
        const { pathname } = new URL("./properties-basic.js", import.meta.url);
        return ctx.sendFile(pathname)
    })
    .get("/parent-nest", () => {
        const { pathname } = new URL("./parent-nest.js", import.meta.url);
        return ctx.sendFile(pathname)
    })

