const { provider } = require("./proxiesProvider");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const HttpsProxyAgent = require('https-proxy-agent');

const request = async (proxy,url,headers) => {
    const proxyAgent = new HttpsProxyAgent(`http://${proxy.host}:${proxy.port}`);
    const response = await fetch(url, {
        agent: proxyAgent,
        ...headers
    });
    return response;
}
const call = async (url,headers={}) => {
    const proxies = await provider();

    let response;
    for(let proxy of proxies){
        response = { proxy, success: false, status: 404, text: null };
        let res = await request(proxy, url, headers).catch(err => null);
        let r = await res;
        if(r != null && r.ok == true) {
            response = {proxy, success: r.ok, status: r.status, html: await res.text()};
            break;
        }
    }

    return response;
}

module.exports = {
    call
}