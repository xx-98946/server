import { pathToRegexp } from "path-to-regexp";

type IMethod = "GET" | "POST" | "DELETE" | "PUT"
type IHandler = (req: Request) => Response | Promise<Response>
interface IRoute {
    methods: IMethod[],
    handler: IHandler,
    path: string
}

export class Router {
    routes: IRoute[] = [];

    to_Reg(path: string) {
        try {
            /**
             * 去除末尾的/
             * 因为末尾是否包含/是两个不同的api
             */
            path = path.replace(/\/*$/, "");
            return pathToRegexp(path)
        } catch (err) {
            console.error(err);
            throw new Error("不能正确转换为正则表达式")
        }
    }

    generate(path: string, handler: IHandler, methods: IMethod[]) {
        this.routes.push({
            path,
            methods,
            handler,
        })
        return this;
    }

    get(path: string, handler: IHandler) {
        return this.generate(path, handler, ["GET"])
    }

    post(path: string, handler: IHandler) {
        return this.generate(path, handler, ["POST"])
    }

    put(path: string, handler: IHandler) {
        return this.generate(path, handler, ["PUT"])
    }

    delete(path: string, handler: IHandler) {
        return this.generate(path, handler, ["DELETE"])
    }


    all(path: string, handler: IHandler) {
        return this.generate(path, handler, ["GET", "POST", "DELETE", "PUT"])
    }


    matched(req: Request) {
        const { pathname } = new URL(req.url)
        const { method } = req;
        // console.log(this.routes)
        const matchedRoute = this.routes.find(route => {
            return route.methods.includes(method as IMethod)
                &&
                this.to_Reg(route.path).exec(pathname)
        })
        if (matchedRoute) {
            // console.log(matchedRoute.path)
            return matchedRoute.handler(req)
        } else {
            return new Response("未定义的API")
        }
    }

    
    route(path: string, router: Router) {
        /**
         * 拼接父路由
         */
        router.routes.forEach(route => {
            route.path = path + route.path;
        })
        this.routes = this.routes.concat
            (router.routes);
        return this;
    }

}