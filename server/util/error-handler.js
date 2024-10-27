const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
  
    
  
    res.status(statusCode).json({
      success: false,
      message,
      
    });
  };
  
  module.exports = errorHandler;