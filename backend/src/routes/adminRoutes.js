import express from 'express';
import { getPendingVerifications, reviewVerification, getAllUsers, toggleUserStatus } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRoles } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(authMiddleware);
router.use(requireRoles(ROLES.ADMIN));

router.get('/verifications', getPendingVerifications);
router.patch('/verifications/:id', reviewVerification);
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle', toggleUserStatus);

export default router;
