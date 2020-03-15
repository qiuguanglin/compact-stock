const express = require('express');
const axios = require('axios');
const iconv = require('iconv-lite');

const URL = 'http://hq.sinajs.cn/list=';
const ENCODING = 'GB18030';

const App = express();
App.use(express.static('dist'));
App.get('/*', (req, res, next)=>{
  res.set({'Access-Control-Allow-Origin': '*'});
  next();
}).get('/data', (req, res)=>{
  const {code} = req.query;
  axios({
    url: `${URL}${code}`,
    responseType: 'stream'
  })
  .then(resp => {
    let chunks = [];
    resp.data.on('data', chunk => chunks.push(chunk));
    resp.data.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const text = iconv.decode(buffer, ENCODING);
      if(!/(\d\.\d)+/.test(text))return res.sendStatus(404);
      res.send(text);
    });
  });
}).listen(60001);
