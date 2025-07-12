import express from 'express';
import { postAnswer, updateVote, acceptAnswer } from '../controllers/answerController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Protected route for posting an answer
router.post('/create', auth, postAnswer);
router.put('/:answerId/vote',auth, updateVote);
router.post('/:answerId/vote', auth, updateVote);
router.put('/:answerId/accept', auth, acceptAnswer);

export default router;
