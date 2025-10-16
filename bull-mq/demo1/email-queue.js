import { Queue } from 'bullmq';
import connection from "./redis-client.js"

 const emailQueue = new Queue('email-queue', { connection : connection});

 export default emailQueue
