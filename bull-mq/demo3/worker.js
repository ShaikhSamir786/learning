import BullMQ from 'bullmq';
const { Worker, QueueScheduler } = BullMQ; // destructure from default export

import config from './config.js';
import { sendEmail } from './mail.js';

const emailQueueName = 'emailQueue';

// Scheduler is required for delayed jobs and retries
// new QueueScheduler(emailQueueName, { connection: config.redis });

// Worker to process jobs
const worker = new Worker(
  emailQueueName,
  async (job) => {
    try {
      const { to, subject, text, html } = job.data;

      if (!to || !subject || (!text && !html)) {
        throw new Error('Missing required email fields');
      }

      await sendEmail(to, subject, text, html);
      console.log(`✅ Email sent to ${to}`);
    } catch (err) {
      console.error(`❌ Job ${job.id} failed: ${err.message}`);
      throw err; // BullMQ will handle retries automatically
    }
  },
  { connection: config.redis }
);

// Optional logging events
worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.log(`Job ${job.id} failed: ${err.message}`));

export { worker };
