const {proxyGenerator} = require('./proxy');
const proxy_check = require('proxy-check');

const checkProxy = async (proxy) => {
    try {
        let c = await proxy_check(proxy);
        return c;
    }
    catch (error) {
        return false;
    }
};

const provider = async () => {
    const proxies = await proxyGenerator();
    let res = await Promise.all(
        proxies.map(async proxy => {
            let c = await checkProxy(proxy);
            if(c){
                return proxy
            }
        })
    );

    return res.filter(el => el != undefined)
}

module.exports = {
    provider
}