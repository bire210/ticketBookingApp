const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    if (err) {
      res.json({
        message: err.message,
      });
    }
  };
  
  module.exports = { notFound, errorHandler };
  