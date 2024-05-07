// proxy-server.ts

import express from 'express';
import http from 'http';
import https from 'https';
import * as url from 'url';
import dotenv from "dotenv";
dotenv.config();


const app = express();

// Proxy route
app.all('*', (req, res) => {
    const parsedUrl = url.parse(req.url);
    const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
        path: parsedUrl.path,
        method: req.method,
        headers: req.headers,
    };

    const proxyReq = (parsedUrl.protocol === 'https:' ? https : http).request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode!, proxyRes.headers);
        proxyRes.pipe(res, {
            end: true
        });
    });

    req.pipe(proxyReq, {
        end: true
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy request error:', err);
        res.status(500).send('Proxy request error');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
