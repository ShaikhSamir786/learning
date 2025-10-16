import express from 'express';
import emailQueue from './email-queue.js';

const router = express.Router();


router.post('/send', async (req, res) => {
  const { email, subject, message, html } = req.body;

  // Validate required fields
  if (!email || !subject || (!message && !html)) {
    return res.status(400).json({ error: 'Missing required fields: email, subject, message/html' });
  }

  try {
    await emailQueue.add('email-queue', { to: email, subject, text: message, html });
    console.log(`[Queue] Job added for ${email}`);
    return res.status(200).json({ status: 'queued', email });
  } catch (error) {
    console.error(`[Queue] Failed to enqueue job for ${email}:`, error);
    return res.status(500).json({ error: 'Failed to enqueue email' });
  }
});

export default router;
