const jwt = require('jsonwebtoken');
const User = require('../models/User');

const roleMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Vérifier si le token existe
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Accès non autorisé - Token manquant' });
            }

            // Vérifier et décoder le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Récupérer l'utilisateur
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            // Vérifier si l'utilisateur a le rôle requis
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Accès refusé - Rôle insuffisant' });
            }

            // Ajouter l'utilisateur à la requête
            req.user = user;
            next();
        } catch (error) {
            console.error('Erreur dans le middleware de rôle:', error);
            return res.status(401).json({ message: 'Token invalide ou expiré' });
        }
    };
};

module.exports = roleMiddleware; 