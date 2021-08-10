const jwt = require('jsonwebtoken');
const tokenMasque = process.env.TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, tokenMasque);
        const userId = decodedToken.userId;
        if (req.params.id && req.params.id !== userId) {
            res.end();
            console.log(req.params.id);
            throw 'Invalid user ID';
            
        } else {
            
            next();
        }
    } catch {
        res.status(401).json({ message: "Vous n\'avez pas les droits requis pour accéder à ce contenu" });
    }
}; 