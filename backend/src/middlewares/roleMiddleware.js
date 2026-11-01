import { ROLES, VERIFICATION_STATUS } from '../config/constants.js';

export const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to [${allowedRoles.join(', ')}] roles.`
      });
    }
    next();
  };
};

export const requireApprovedFarmer = (req, res, next) => {
  if (req.user.role === ROLES.ADMIN) {
    return next();
  }

  if (req.user.role !== ROLES.FARMER) {
    return res.status(403).json({
      success: false,
      message: 'Access restricted to registered farmers.'
    });
  }

  if (req.user.verificationStatus !== VERIFICATION_STATUS.APPROVED) {
    return res.status(403).json({
      success: false,
      message: 'Document Verification Required: Your Form 1-B land record must be verified by an administrator before listing agricultural produce.'
    });
  }

  next();
};

