import { Queue } from 'bullmq';
import config  from './config.js';


    const emailQueueName = 'emailQueue';

 const emailQueue = new Queue(emailQueueName, { connection : config.redis});

 export default emailQueue
