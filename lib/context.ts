import fs from "node:fs/promises";

/**
 * 根据文件后缀获取文件类型
 * @param ext 后缀
 * @returns 
 */
function toContentType(ext: string) {
    const map = new Map(Object.entries(
        {
            "txt": "text/plain;charset=utf-8",
            "json": "application/json;charset=utf-8",
            "html": "text/html;charset=utf-8",
            "js": "application/javascript;charset=utf-8",
            "stream": 'application/octet-stream',
            "jpeg": "application/octet-stream"
        }
    ))
    if (map.has(ext)) {
        return map.get(ext)!;
    } else {
        return map.get("stream")!;
    }
}

export class Context {
    constructor() { }

    sendText(text: string) {
        return new Response(text, {
            headers: {
                "content-type": toContentType("txt")
            }
        })
    }

    /**
     * 会对参数进行stringify处理
     * @param json 
     * @returns 
     */
    sendJSON(origin: unknown) {
        let body = JSON.stringify(origin);
        return new Response(body, {
            headers: {
                "content-type": toContentType("json")
            }
        })
    }

    sendHTML(text: string) {
        return new Response(text, {
            headers: {
                "content-type": toContentType("html")
            }
        })
    }

    /**
     * 读取文件并作为响应返回，
     * 未传递文件类型时会从文件后缀读取
     * @param path 绝对路径
     * @param type 文件类型
     * @returns 
     */
    async sendFile(path: string, type?: string) {
        const body = await fs.readFile(path);
        if (!type) {
            const splitArr = path.split(".");
            const ext = splitArr.at(-1)!;
            type = ext;
        }
        return new Response(body, {
            headers: {
                "content-type": toContentType(type)
            }
        })
    }

    sendJS(content: string) {
        return new Response(content, {
            headers: {
                "content-type": toContentType("js")
            }
        })
    }

    /**
     * 将文件作为Lit Html页面
     * @param path 
     */
    async sendLitPage(path: string) {
        const fileContent = await fs.readFile(path);
        const htmlTemplate = `
<!DOCTYPE html>
<html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>网址导航</title>
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="/static/normalize.css">
        <script type="importmap">
            {
                "imports": {
                    "$/": "/"
                }
            }
            </script>
        <script type="module">
            ${fileContent}
        </script>
    </head>
    <body>
        <lit-page></lit-page>
    </body>
</html>`;
        return this.sendHTML(htmlTemplate)
    }

}