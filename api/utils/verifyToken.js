const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ error: 'Unauthorized' });
        }
        req.user = decoded; 
        next();
    });
};


module.exports = { verifyToken };
