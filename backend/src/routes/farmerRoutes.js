import express from 'express';
import { submitVerification, getVerificationStatus, getDashboardStats } from '../controllers/farmerController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRoles } from '../middlewares/roleMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(authMiddleware);
router.use(requireRoles(ROLES.FARMER, ROLES.ADMIN));

router.post(
  '/verification',
  upload.fields([
    { name: 'aadhaarDoc', maxCount: 1 },
    { name: 'landDoc', maxCount: 1 }
  ]),
  submitVerification
);

router.get('/verification/status', getVerificationStatus);
router.get('/dashboard-stats', getDashboardStats);

export default router;
