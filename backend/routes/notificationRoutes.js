import express from 'express';
import { getNotifications, markAsRead, markAllAsRead, getUnreadCount } from '../controllers/notificationController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All notification routes require authentication
router.get('/', auth, getNotifications);
router.get('/unread-count', auth, getUnreadCount);
router.put('/:notificationId/read', auth, markAsRead);
router.put('/mark-all-read', auth, markAllAsRead);

export default router;
