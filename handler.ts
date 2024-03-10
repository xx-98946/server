import { ctx, Router } from "$/lib/index.ts";
import { apiRouter } from "./api/index.ts";

export const port = 3000;

const router = new Router();

router
    /**
     * 后端api接口
     */
    .route("/api", apiRouter)
    /**
     * 通用组件注册
     */
    .get("/comps/:comp", (req) => {
        const { pathname } = new URL(req.url)
        return ctx.sendFile(`.${pathname}.js`)
    })
    /**
     * 静态文件
     */
    .get("/static/(.*)", (req) => {
        const { pathname } = new URL(req.url);
        return ctx.sendFile("." + pathname);
    })
    /**
     * 页面独立组件注册
     */
    .get("/:page/:comp", (req) => {
        const { pathname } = new URL(req.url)
        return ctx.sendFile(`./pages/${pathname}.js`)
    })
    /**
     * 多页应用注册，
     */
    .get("/:page?", (req) => {
        let { pathname } = new URL(req.url)
        if(pathname === "/"){
            pathname = "/home";
        }
        return ctx.sendLitPage(`./pages${pathname}/index.js`)
    })
    

/**
 * 中间件： 日志
 * @param req 
 */
function logger(req: Request) {
    console.log("url:", req.url)
}

export const handler = async (req: Request) => {
    try{
        logger(req);
        const route = await router.matched(req)
        return route;
    }catch(error){
        console.error(error);
        return ()=>new Response("出错了")
    }
};