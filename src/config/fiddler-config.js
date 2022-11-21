const url = require("url");

const fiddlerProxy = {
    protocol: "http:",
    hostname: "127.0.0.1",
    port: 8888,
};

const setFiddlerProxy = () => {
    var proxyUrl = url.format(fiddlerProxy);
    process.env.http_proxy = proxyUrl;
    process.env.https_proxy = proxyUrl;
    // Use this only for debugging purposes as it introduces a security issue
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
};

module.exports = {
    setFiddlerProxy
}