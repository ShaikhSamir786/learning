const { Queue, Worker, QueueScheduler, Job } = require('bullmq');
const config = require('./config');
const connection = require('./redis-client');
const { sendEmail } = require('./mail');

const emailQueueName = 'emailQueue';

// Scheduler needed for delayed/retry jobs
new QueueScheduler(emailQueueName, { connection: connection  });

// Create the queue
const emailQueue = new Queue(emailQueueName, { connection:  });

// Function: Add jobs to queue
async function addToQueue(emailData) {
  return emailQueue.add('sendEmail', emailData, {
    attempts: config.queue.attempts,
    backoff: { type: 'fixed', delay: config.queue.backoff }
  });
}

// Processor function
const worker = new Worker(emailQueueName, async (job) => {
  try {
    const { to, subject, text, html } = job.data;
    if (!to || !subject || (!text && !html)) {
      throw new Error('Missing email fields');
    }

    await sendEmail(to, subject, text, html);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed job ${job.id}: ${err.message}`);
    throw err; // BullMQ will handle retries
  }
}, { connection: config.redis });

// Optional: Event listeners for logging
worker.on('completed', job => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.log(`Job ${job.id} failed: ${err.message}`));

module.exports = { addToQueue, emailQueue };
