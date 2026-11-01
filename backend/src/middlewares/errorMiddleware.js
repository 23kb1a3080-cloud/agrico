export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: [${req.method}] ${req.originalUrl}`
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack || err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

