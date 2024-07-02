const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://www.altogiro.com.br",
    changeOrigin: true,
    pathRewrite: {
      "^/proxy": "",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.removeHeader("X-Frame-Options");
      proxyReq.removeHeader("Content-Security-Policy");
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
