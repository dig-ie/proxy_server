const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://www.altogiro.com.br", // Substitua pelo site que deseja acessar
    changeOrigin: true,
    pathRewrite: {
      "^/proxy": "", // Remove '/proxy' da URL
    },
    onProxyReq: (proxyReq, req, res) => {
      // Remova os cabeçalhos que causam bloqueio de iframe
      proxyReq.removeHeader("X-Frame-Options");
      proxyReq.removeHeader("Content-Security-Policy");
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
