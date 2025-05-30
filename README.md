# E-commerce Application

Une application e-commerce complète avec un panneau d'administration, construite avec React, Node.js, Express et MongoDB.

## 🚀 Fonctionnalités

### Pour les utilisateurs
- Authentification (inscription/connexion)
- Parcourir les produits
- Ajouter des produits au panier
- Passer des commandes
- Consulter l'historique des commandes

### Pour les administrateurs
- Tableau de bord administrateur
- Gestion des utilisateurs (CRUD)
- Gestion des produits (CRUD)
- Gestion des commandes
- Statistiques et rapports

## 🛠️ Technologies utilisées

### Frontend
- React.js
- React Router pour la navigation
- Tailwind CSS pour le style
- Axios pour les requêtes HTTP
- Context API pour la gestion d'état

### Backend
- Node.js
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Bcrypt pour le hachage des mots de passe

## 📦 Installation

1. Clonez le repository
```bash
git clone [URL_DU_REPO]
```

2. Installez les dépendances du backend
```bash
cd backend
npm install
```

3. Installez les dépendances du frontend
```bash
cd frontend
npm install
```

4. Configurez les variables d'environnement
Créez un fichier `.env` dans le dossier backend avec les variables suivantes :
```
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

5. Démarrez le serveur backend
```bash
cd backend
npm run dev
```

6. Démarrez le serveur frontend
```bash
cd frontend
npm run dev
```

## 🌱 Seeders

Pour créer un compte administrateur initial, utilisez le seeder :

1. Dans le dossier backend, exécutez :
```bash
npm run seed
```

Cela créera un compte administrateur avec les identifiants suivants :
- Email: admin@example.com
- Mot de passe: admin123

⚠️ Important : Changez ces identifiants après la première connexion pour des raisons de sécurité.

## 🔒 Sécurité

- Authentification JWT
- Protection des routes avec middleware
- Validation des données
- Hachage des mots de passe
- Protection CSRF
- Headers de sécurité

## 📁 Structure du projet

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## 🔄 Workflow de développement

1. Créez une nouvelle branche pour chaque fonctionnalité
```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

2. Développez votre fonctionnalité
3. Committez vos changements avec des messages clairs
4. Créez une pull request
5. Faites revoir votre code
6. Mergez dans la branche principale

## 📝 Conventions de code

- Utilisation de ESLint et Prettier
- Nommage explicite des variables et fonctions
- Commentaires pour le code complexe
- Structure de composants React cohérente
- Gestion des erreurs appropriée

## 🔍 Tests

- Tests unitaires pour les composants React
- Tests d'intégration pour les API
- Tests end-to-end pour les flux principaux

## 📈 Déploiement

L'application peut être déployée sur :
- Frontend : Vercel, Netlify
- Backend : Heroku, DigitalOcean
- Base de données : MongoDB Atlas

## 👥 Rôles et permissions

### Utilisateur standard
- Parcourir les produits
- Gérer son panier
- Passer des commandes
- Voir son historique

### Administrateur
- Toutes les fonctionnalités utilisateur
- Gestion des utilisateurs
- Gestion des produits
- Gestion des commandes
- Accès au tableau de bord

## 🔄 Mises à jour futures

- Système de recherche avancé
- Filtres de produits
- Système de notation et avis
- Intégration de paiement
- Notifications en temps réel
- Mode hors ligne
- Application mobile

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 
