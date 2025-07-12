// middleware/checkDb.js
const mongoose = require('mongoose');

const checkDb = (req, res, next) => {
  const status = mongoose.connection.readyState;

  // 1 = connected
  if (status === 1) {
    return next();
  }

  const statusMap = {
    0: 'disconnected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return res.status(503).json({
    error: 'Service Unavailable',
    message: `MongoDB is currently ${statusMap[status] || 'in an unknown state'}. Try again later.`,
  });
};

module.exports = checkDb;
