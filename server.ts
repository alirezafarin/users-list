import fs from "node:fs/promises";
import express, { Request, Response, Express } from "express";
import compression from "compression";
import { ViteDevServer } from "vite";

// --- 0. TYPE DEFINITIONS ---

// Define the exact shape of your render function from entry-server.tsx
type TRenderFunction = (url: string) => Promise<{
  html: string;
  dehydratedState: unknown; // using unknown is safer than any for external data
}>;

// --- 1. CONFIGURATION ---
const CONFIG = {
  isProduction: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT || 5173),
  base: process.env.BASE || "/",
  paths: {
    templateDev: "./index.html",
    templateProd: "./dist/client/index.html",
    clientDist: "./dist/client",
    serverEntryDev: "/src/entry-server.tsx",
    serverEntryProd: "./dist/server/entry-server.js",
  },
};

let prodTemplateCache = "";
if (CONFIG.isProduction) {
  try {
    prodTemplateCache = await fs.readFile(CONFIG.paths.templateProd, "utf-8");
  } catch (error) {
    console.warn("⚠️ Could not load production template on startup.", error);
  }
}

// --- 2. HELPERS ---

function buildFinalHtml(
  template: string,
  appHtml: string,
  state: unknown
): string {
  const htmlWithApp = template.replace(
    /<div id="root">(.*?)<\/div>/s,
    `<div id="root">${appHtml}</div>`
  );

  const stateScript = `
    <script>
      window.__REACT_QUERY_STATE__ = ${JSON.stringify(state).replace(
        /</g,
        "\\u003c"
      )};
    </script>
  `;

  return htmlWithApp.replace("</body>", `${stateScript}</body>`);
}

async function loadSsrResources(vite: ViteDevServer | undefined, url: string) {
  let template: string;
  let render: TRenderFunction; // ✅ Strictly typed now

  if (!CONFIG.isProduction && vite) {
    template = await fs.readFile(CONFIG.paths.templateDev, "utf-8");
    template = await vite.transformIndexHtml(url, template);

    // Explicitly cast the module export to our expected type
    const module = await vite.ssrLoadModule(CONFIG.paths.serverEntryDev);
    render = module.render as TRenderFunction;
  } else {
    template = prodTemplateCache;
    const module = await import(CONFIG.paths.serverEntryProd);
    render = module.render as TRenderFunction;
  }

  return { template, render };
}

// --- 3. MIDDLEWARE SETUP ---

async function setupViteMiddleware(app: Express) {
  if (!CONFIG.isProduction) {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      base: CONFIG.base,
    });
    app.use(vite.middlewares);
    return vite;
  } else {
    const sirv = (await import("sirv")).default;
    app.use(CONFIG.base, sirv(CONFIG.paths.clientDist, { extensions: [] }));
    return undefined;
  }
}

// --- 4. REQUEST HANDLER ---

async function handleSsrRequest(
  req: Request,
  res: Response,
  vite?: ViteDevServer
) {
  try {
    const url = req.originalUrl;

    // Destructure strictly typed render function
    const { template, render } = await loadSsrResources(vite, url);

    const { html: appHtml, dehydratedState } = await render(url);

    const finalHtml = buildFinalHtml(template, appHtml, dehydratedState);

    res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
  } catch (e) {
    const error = e as Error;
    vite?.ssrFixStacktrace(error);
    console.error(error.stack);
    res.status(500).end(error.stack);
  }
}

// --- 5. SERVER BOOTSTRAP ---

async function startServer() {
  const app = express();
  app.use(compression());

  const vite = await setupViteMiddleware(app);

  app.use(/(.*)/, (req, res) => handleSsrRequest(req, res, vite));

  app.listen(CONFIG.port, () => {
    console.log(
      `🚀 Server started at http://localhost:${CONFIG.port} [${
        CONFIG.isProduction ? "Production" : "Development"
      }]`
    );
  });
}

startServer();
