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
    let res0 = await fetch(url, {
        ...headers
    }).catch(async er => {
        const proxies = await provider();
        const responses = (await Promise.all(
            proxies.map(async proxy => {
                const res = await request(proxy, url, headers).catch(er => {
                    return null
                });
                return {data: await res.text(), status: 200, url};
            })
        ));

        if(responses.filter(res => res != null).length > 0){
            let res = responses[0];
            return {data: await res.text(), status: 200, url};
        }
        return {data: "", status: 404, url}
    });

    return { data: await res0.text(), status: res0.status, url }
}

module.exports = {
    call
}