const axios = require("axios");
const cheerio = require("cheerio");

const proxyGenerator = async () => {

    let ip_addresses = [];
    const res = await axios("https://www.sslproxies.org/");
    if (res.status == 200) {
        const $ = cheerio.load(res.data);

        $("td:nth-child(5)").each(function (index, value) {
            ip_addresses[index] = {protocol: $(this).text()};
        });


        $("td:nth-child(1)").each(function (index, value) {
            ip_addresses[index] = {...ip_addresses[index], host: $(this).text()};
        });

        $("td:nth-child(2)").each(function (index, value) {
            ip_addresses[index] = {...ip_addresses[index], port: $(this).text()};
        });
    }

    return ip_addresses

}

module.exports = {
    proxyGenerator
}