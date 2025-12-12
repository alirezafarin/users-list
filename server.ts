import fs from "node:fs/promises";
import express from "express";
import compression from "compression";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

const app = express();
app.use(compression());

let vite: any;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const sirv = (await import("sirv")).default;
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.use(/(.*)/, async (req, res) => {
  try {
    const url = req.originalUrl;
    let template;
    let render;

    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      // 1. Apply Vite transforms (which might strip comments!)
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const { html: appHtml, dehydratedState } = await render(url);

    // 2. Inject App HTML: Replace <div id="root"></div> with <div id="root">APP_HTML</div>
    // We use a regex to handle potential whitespace like <div id="root">  </div>
    const htmlWithApp = template.replace(
      /<div id="root">(.*?)<\/div>/s,
      `<div id="root">${appHtml}</div>`
    );

    // 3. Inject State: Put script before the closing body tag
    const finalHtml = htmlWithApp.replace(
      "</body>",
      `<script>
         window.__REACT_QUERY_STATE__ = ${JSON.stringify(
           dehydratedState
         ).replace(/</g, "\\u003c")};
       </script>
       </body>`
    );

    res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
  } catch (e) {
    vite?.ssrFixStacktrace(e as Error);
    console.log((e as Error).stack);
    res.status(500).end((e as Error).stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
