# Proxidoor

[![N|Solid](https://cdn.discordapp.com/attachments/797496852642922539/1076843094256918629/Screenshot_20230219_132544_Brave.jpg)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Proxidoor helps you make HTTP requests through a rotating proxy, you can use it for services such as web scraping, web crawling and more.

Proxidoor workflows :
- Search for instant proxies from the internet and scrape it.
- Filter the valid proxies and pass them to the http client.
- ✨Magic ✨   that's it , you just make a http request throw rotating proxy for free.

## Features

- Free and Easy to use, just one line of code.
- Provide the html code as result.
- Flexible for changing the http request headings.

## Proxidoor uses different technologies to achieve its purpose :

Proxidoor uses a number of open source projects to work properly:

- cheerio
- https-proxy-agent
- node-fetch
- proxy-check

## Installation

Proxidoor requires [Node.js](https://nodejs.org/) v16+ to run.

```sh
npm i proxidoor
```

How to code using proxidoor :

```sh
const {call} = require('proxidoor');

call('https://www.iplocation.net/find-ip-address')
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
```

The output is an JSON object :

```sh
{
  proxy: { protocol: 'elite proxy', host: '5.189.184.6', port: '80' },
  success: true,
  status: 200,
  html: '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '    <head>\n' +
    '        <title>What is my IP address?</title>\n'... 30892 more characters
}
```

## Headings

Simple Post
```sh
const {call} = require('proxidoor');

call('https://www.iplocation.net/find-ip-address',{
        method: 'POST',
        body: 'a=1'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
```

Post with JSON
```sh
const {call} = require('proxidoor');

const body = {a: 1};
call('https://www.iplocation.net/find-ip-address',{
        method: 'POST',
        body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    })
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
```

Post with form parameters
> Note: The Content-Type header is only set automatically to x-www-form-urlencoded when an instance of URLSearchParams is given as such.

```sh
const {call} = require('proxidoor');

const params = new URLSearchParams();
params.append('a', 1);
call('https://www.iplocation.net/find-ip-address',{
        method: 'POST',
        body: params
    })
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
```
Thank you for reaching to this point, please feel free to contact me throw an email ghaith.arfaoui34@gmail.com if you want me to add some features to proxidoor.
