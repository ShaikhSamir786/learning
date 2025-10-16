import IORedis from 'ioredis';

import  config  from './config.js';


const connection = new IORedis({
  host: config.redis.host,
  port: config.redis.port
});

export default connection;