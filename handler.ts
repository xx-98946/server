import { ctx, Router } from "$/lib/index.ts";
import { apiRouter } from "./api/index.ts";
import { compsRouter } from "./comps/index.ts"

export const port = 3000;

const router = new Router();

router
    /**
     * 后端api接口
     */
    .route("/api", apiRouter)
    /**
     * 组件列表
     */
    .route("/comps", compsRouter)
    /**
     * 首页
     */
    .get("/", () => {
        return ctx.sendLitPage("./pages/home.js")
    })
    .get("/test", () => {
        return ctx.sendLitPage("./pages/test.js")
    })
    /**
     * 静态文件
     */
    .get("/static/(.*)", (req) => {
        const { pathname } = new URL(req.url);
        return ctx.sendFile("." + pathname);
    })

/**
 * 中间件： 日志
 * @param req 
 */
function logger(req: Request) {
    console.log("url:", req.url)
}

export const handler = async (req: Request) => {
    logger(req);
    const res = await router.matched(req)
    return res;
};