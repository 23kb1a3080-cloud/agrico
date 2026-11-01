import { memoryDb } from '../utils/memoryDb.js';
import { VERIFICATION_STATUS } from '../config/constants.js';

export const submitVerification = (req, res, next) => {
  try {
    const { aadhaarNumber, farmSize, farmName } = req.body;
    const user = req.user;

    const userRecord = memoryDb.users.find(u => u.id === user.id);
    if (!userRecord) {
      return res.status(404).json({ success: false, message: 'Farmer record not found.' });
    }

    userRecord.aadhaarNumber = aadhaarNumber || userRecord.aadhaarNumber;
    userRecord.farmSize = farmSize ? `${farmSize} Acres` : userRecord.farmSize;
    userRecord.farmName = farmName || userRecord.farmName;
    userRecord.verificationStatus = VERIFICATION_STATUS.PENDING;
    userRecord.aadhaarDoc = req.files?.aadhaarDoc ? req.files.aadhaarDoc[0].filename : (userRecord.aadhaarDoc || 'aadhaar_scan.pdf');
    userRecord.landDoc = req.files?.landDoc ? req.files.landDoc[0].filename : (userRecord.landDoc || '1b_extract.pdf');
    userRecord.submittedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Form 1-B Land records and Aadhaar submitted successfully to administrative verification queue.',
      verificationStatus: userRecord.verificationStatus
    });
  } catch (error) {
    next(error);
  }
};

export const getVerificationStatus = (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    verificationStatus: user.verificationStatus,
    remarks: user.verificationRemarks || 'Awaiting administrative verification.',
    submittedAt: user.submittedAt || user.createdAt
  });
};

export const getDashboardStats = (req, res) => {
  const user = req.user;
  const myProducts = memoryDb.products.filter(p => p.farmerId === user.id);
  const myOrders = memoryDb.orders.filter(o => o.farmerId === user.id);

  const totalRevenue = myOrders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);
  const activeOrders = myOrders.filter(o => o.status === 'PLACED' || o.status === 'CONFIRMED');

  res.json({
    success: true,
    stats: {
      totalProducts: myProducts.length,
      activeOrders: activeOrders.length,
      totalOrders: myOrders.length,
      totalRevenue,
      verificationStatus: user.verificationStatus
    }
  });
};

