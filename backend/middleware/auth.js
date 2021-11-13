const jwt = require('jsonwebtoken');
const tokenMasque = process.env.TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, tokenMasque);
        const userId = decodedToken.userId;
        console.log(userId);
        if (req.params.userId && req.params.userId != userId) {
            res.status(401).json({ message: "Vous n\'avez pas les droits requis pour accéder à ce contenu" });
        } else {
            
            next();
        }
    } catch {
        res.status(401).json({ message: "erreur d'authentification" });
    }
}; 