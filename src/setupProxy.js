const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000/api/",
            changeOrigin: true,
            secure: false,
            logLevel: "debug",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
};
