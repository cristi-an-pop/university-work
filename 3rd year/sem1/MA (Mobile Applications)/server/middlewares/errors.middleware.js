const errorHandler = (err, req, res, next) => {
    console.error(`Error occurred during ${req.method} ${req.path}:`, err);
    
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors.map(e => e.message)
        });
    }
    
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            message: 'A memory with these details already exists'
        });
    }

    res.status(500).json({
        message: 'An unexpected error occurred'
    });
};

module.exports = errorHandler;