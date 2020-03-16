'use strict';

const REST = {
  development: {
    url: 'http://localhost',
    port: 60001
  },
  production: {
    url: 'http://120.77.17.197',
    port: 60001
  }
}

const Config = {
  stockRest: function(){
    const env = REST[process.env.NODE_ENV];
    return `${env.url}:${env.port}/data`
  },
  retrieveInterval: function(){return 3000;},
  financeLink: function(code){return `http://finance.sina.com.cn/realstock/company/${code}/nc.shtml`}
}
export default Config;
