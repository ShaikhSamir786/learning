import express from 'express';

import addtoqueue from './controller.js';

const router = express.Router();


router.post('/send', addtoqueue );

export default router;
