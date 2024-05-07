"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
// Set the port dynamically based on the environment variable provided by Heroku
const PORT = process.env.PORT || 3000;
// Use the Heroku app URL as the target URL for the proxy
const targetUrl = `https://fathomless-escarpment-90191-26819c0d1f62.herokuapp.com`;
// Proxy configuration
const proxyMiddleware = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/': '/', // Optional rewrite, can be customized
    },
    //@ts-ignore
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Unable to contact the target server.');
    }
});
// Apply proxy middleware
app.use('/', proxyMiddleware); // Catch all routes and proxy them
exports.default = app;
