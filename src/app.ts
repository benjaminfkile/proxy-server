import express, { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const targetUrl = `http://localhost:${PORT}`;

// Proxy configuration
const proxyMiddleware = createProxyMiddleware({
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

export default app;