import { Router, ctx } from "$/lib/index.ts";
import { linkListRouter } from "./linkList/index.ts";
// import { litRouter } from "../comps/index.ts";

export const apiRouter = new Router();

apiRouter
    .route("/linkList", linkListRouter)
    // .use("/lit", litRouter)