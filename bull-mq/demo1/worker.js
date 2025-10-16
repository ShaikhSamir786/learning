import worker from './mail.js'; // your emailWorker.js file

// Event: job completed
worker.on('completed', (job) => {
  console.log(`[Worker] ✅ Job ${job.id} completed successfully`);
});

// Event: job failed
worker.on('failed', (job, err) => {
  console.error(`[Worker] ❌ Job ${job.id} failed: ${err.message}`);
});

// Optional: job error (worker-level errors)
worker.on('error', (err) => {
  console.error(`[Worker] ❌ Worker error: ${err.message}`);
});
