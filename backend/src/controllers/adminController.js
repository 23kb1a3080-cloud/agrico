import { memoryDb } from '../utils/memoryDb.js';
import { ROLES, VERIFICATION_STATUS } from '../config/constants.js';

export const getPendingVerifications = (req, res) => {
  const pendingFarmers = memoryDb.users.filter(u => u.role === ROLES.FARMER && u.verificationStatus === VERIFICATION_STATUS.PENDING);
  res.json({
    success: true,
    count: pendingFarmers.length,
    verifications: pendingFarmers
  });
};

export const reviewVerification = (req, res) => {
  const { status, remarks } = req.body;
  const farmer = memoryDb.users.find(u => u.id === Number(req.params.id) && u.role === ROLES.FARMER);

  if (!farmer) {
    return res.status(404).json({ success: false, message: 'Farmer record not found.' });
  }

  farmer.verificationStatus = status;
  farmer.verificationRemarks = remarks || (status === VERIFICATION_STATUS.APPROVED ? 'Approved by revenue officer' : 'Rejected');
  farmer.verifiedAt = status === VERIFICATION_STATUS.APPROVED ? new Date().toISOString() : null;

  res.json({
    success: true,
    message: `Farmer 1-B verification marked as ${status}.`,
    farmer: {
      id: farmer.id,
      fullName: farmer.fullName,
      verificationStatus: farmer.verificationStatus,
      verificationRemarks: farmer.verificationRemarks
    }
  });
};

export const getAllUsers = (req, res) => {
  const safeUsers = memoryDb.users.map(({ passwordHash: _, ...u }) => u);
  res.json({
    success: true,
    users: safeUsers
  });
};

export const toggleUserStatus = (req, res) => {
  const user = memoryDb.users.find(u => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: 'User record not found.' });
  }

  user.isActive = !user.isActive;

  res.json({
    success: true,
    message: `User account is now ${user.isActive ? 'Active' : 'Suspended'}.`,
    isActive: user.isActive
  });
};
